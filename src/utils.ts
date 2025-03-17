import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';
import { transferPartners } from '@/data/transferPartners';
import { BRAND_COLORS, PARTNER_COLORS, BRAND_LOGOS } from './constants';
import type { Node, Link } from './types';
import { createTooltip, removeTooltip } from '@/components/Tooltip';

export const transformData = () => {
  const nodes: Node[] = [];
  const links: Link[] = [];

  // Add bank nodes
  const bankNodes = transferPartners
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((program, i) => ({
      id: program.name,
      index: i,
      category: 'Banks' as const,
    }));
  nodes.push(...bankNodes);

  // Get all partners and sort them alphabetically
  const partnerMap = new Map<
    string,
    { name: string; category: 'Airlines' | 'Hotels' }
  >();
  transferPartners.forEach((program) => {
    program.partners.forEach((partner) => {
      partnerMap.set(partner.name, {
        name: partner.name,
        category: partner.category as 'Airlines' | 'Hotels',
      });
    });
  });

  // Sort all partners alphabetically
  const sortedPartners = Array.from(partnerMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const midPoint = Math.ceil(sortedPartners.length / 2);

  // Add left side partners
  const leftPartners = sortedPartners.slice(0, midPoint).map((partner, i) => ({
    id: partner.name,
    index: bankNodes.length + i,
    category: partner.category,
    // Force vertical position to maintain alphabetical order
    y: i * (1 / midPoint),
  }));
  nodes.push(...leftPartners);

  // Add right side partners
  const rightPartners = sortedPartners.slice(midPoint).map((partner, i) => ({
    id: partner.name,
    index: bankNodes.length + leftPartners.length + i,
    category: partner.category,
    // Force vertical position to maintain alphabetical order
    y: i * (1 / (sortedPartners.length - midPoint)),
  }));
  nodes.push(...rightPartners);

  // Create node index map
  const nodeIndexMap = new Map(nodes.map((node) => [node.id, node.index]));

  // Create links
  transferPartners.forEach((program) => {
    program.partners.forEach((partner) => {
      const [from, to] = partner.transferRatio?.split(':').map(Number) || [
        1, 1,
      ];
      const bankIndex = nodeIndexMap.get(program.name);
      const partnerIndex = nodeIndexMap.get(partner.name);

      if (bankIndex !== undefined && partnerIndex !== undefined) {
        const isLeftPartner =
          partnerIndex <= bankNodes.length + leftPartners.length - 1;
        links.push({
          source: isLeftPartner ? partnerIndex : bankIndex,
          target: isLeftPartner ? bankIndex : partnerIndex,
          value: to / from,
        });
      }
    });
  });

  return { nodes, links };
};

export const createLinks = (
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  links: Link[],
  nodes: Node[],
  partnerColorScale: d3.ScaleOrdinal<string, string>
) => {
  return svg
    .append('g')
    .selectAll('path')
    .data(links)
    .join('path')
    .attr('d', sankeyLinkHorizontal())
    .style('fill', 'none')
    .style('stroke', '#aaa')
    .style('stroke-width', (d) => Math.max(1, d.width ?? 0))
    .style('stroke-opacity', 0.15)
    .style('cursor', 'pointer')
    .style('pointer-events', 'all')
    .on('mouseover', function (event: MouseEvent, d: any) {
      const path = d3.select(this);
      path.style('stroke-opacity', 0.5).style('stroke', '#60a5fa');

      const sourceNode = d.source;
      const targetNode = d.target;

      // Find the actual transfer partner data
      const bankNode =
        sourceNode.category === 'Banks' ? sourceNode : targetNode;
      const partnerNode =
        sourceNode.category === 'Banks' ? targetNode : sourceNode;
      const bankData = transferPartners.find((p) => p.name === bankNode.id);
      const partnerData = bankData?.partners.find(
        (p) => p.name === partnerNode.id
      );

      const [x, y] = d3.pointer(event, svg.node());
      if (partnerData?.bonus) {
        const ratio = `<tspan style="text-decoration: line-through">${partnerData.transferRatio || '1:1'}</tspan> <tspan style="fill: #ef4444">${partnerData.bonus}</tspan>`;
        createTooltip(svg, x, y - 30, sourceNode, ratio, targetNode);
      } else {
        createTooltip(
          svg,
          x,
          y - 30,
          sourceNode,
          partnerData?.transferRatio || `${d.value}:1`,
          targetNode
        );
      }
    })
    .on('mouseout', function () {
      const path = d3.select(this);
      path.style('stroke-opacity', 0.15).style('stroke', '#aaa');
      removeTooltip(svg);
    });
};

export const createNodes = (
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  nodes: Node[],
  partnerColorScale: d3.ScaleOrdinal<string, string>
) => {
  return svg
    .append('g')
    .selectAll('rect')
    .data(nodes)
    .join('rect')
    .attr('x', (d) => d.x0 ?? 0)
    .attr('y', (d) => d.y0 ?? 0)
    .attr('height', (d) => (d.y1 ?? 0) - (d.y0 ?? 0))
    .attr('width', (d) => (d.x1 ?? 0) - (d.x0 ?? 0))
    .attr('fill', (d) => BRAND_COLORS[d.id] || partnerColorScale(d.id))
    .style('cursor', 'pointer')
    .on('mouseover', function (event: MouseEvent, d: Node) {
      const rect = d3.select(this);
      rect.style('opacity', 0.8);

      // Get the node's color
      const nodeColor = BRAND_COLORS[d.id] || partnerColorScale(d.id);

      // Highlight connected links
      svg
        .selectAll('path')
        .style('stroke-opacity', (p: any) => {
          const source = p.source.id || p.source;
          const target = p.target.id || p.target;
          if (source === d.id || target === d.id) {
            return 0.5;
          }
          return 0.15;
        })
        .style('stroke', (p: any) => {
          const source = p.source.id || p.source;
          const target = p.target.id || p.target;
          if (source === d.id || target === d.id) {
            return nodeColor;
          }
          return '#aaa';
        });
    })
    .on('mouseout', function () {
      const rect = d3.select(this);
      rect.style('opacity', 1);

      // Reset link styles
      svg
        .selectAll('path')
        .style('stroke-opacity', 0.15)
        .style('stroke', '#aaa');
    });
};

export const initializeSankey = (
  width: number,
  height: number,
  margin: { top: number; right: number; bottom: number; left: number }
) => {
  return sankey<Node, Link>()
    .nodeWidth(25)
    .nodePadding(15)
    .extent([
      [margin.left, margin.top],
      [width - margin.right, height - margin.bottom],
    ])
    .nodeSort((a, b) => 0); // Keep nodes in their original order
};

export const createLabels = (
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  nodes: Node[],
  margin: { top: number; right: number; bottom: number; left: number },
  width: number
) => {
  return svg
    .append('g')
    .selectAll('g')
    .data(nodes)
    .join('g')
    .each(function (d) {
      const g = d3.select(this);
      const isBank = BRAND_COLORS.hasOwnProperty(d.id);
      const isLeftSide = !isBank && (d.x0 ?? 0) < width / 2;

      // Fixed positions for consistent alignment
      const x = isBank
        ? (d.x0 ?? 0) - 30
        : isLeftSide
          ? margin.left - 20 // Fixed position for left partners
          : width - margin.right + 20; // Fixed position for right partners
      const y = (d.y0 ?? 0) + ((d.y1 ?? 0) - (d.y0 ?? 0)) / 2;

      if (BRAND_LOGOS[d.id]) {
        g.append('image')
          .attr('href', BRAND_LOGOS[d.id])
          .attr('x', x - 40)
          .attr('y', y - 20)
          .attr('width', 40)
          .attr('height', 40)
          .style('cursor', 'pointer')
          .on('mouseover', function () {
            const tooltip = svg.append('g').attr('class', 'tooltip');
            tooltip
              .append('text')
              .attr('x', x - 20)
              .attr('y', y - 40)
              .attr('text-anchor', 'middle')
              .attr('dominant-baseline', 'middle')
              .style('fill', '#e5e7eb')
              .style('font-family', 'Geist Mono')
              .style('font-size', '14px')
              .text(d.id);
          })
          .on('mouseout', function () {
            svg.selectAll('.tooltip').remove();
          });
      } else {
        const emoji = d.category === 'Airlines' ? '✈️' : '🏨';
        const label = isLeftSide ? `${d.id} ${emoji}` : `${emoji} ${d.id}`;

        g.append('text')
          .attr('x', x)
          .attr('y', y)
          .attr('dy', '0.35em')
          .attr('text-anchor', isLeftSide ? 'end' : 'start')
          .text(label)
          .style('fill', '#e5e7eb')
          .style('font-family', 'Geist Mono')
          .style('font-size', '14px');
      }
    });
};
