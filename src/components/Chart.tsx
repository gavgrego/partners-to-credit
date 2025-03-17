import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import {
  sankey,
  sankeyLinkHorizontal,
  SankeyGraph,
  SankeyNode,
  SankeyLink,
} from 'd3-sankey';
import { transferPartners } from '@/data/transferPartners';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  index?: number;
  x0?: number;
  x1?: number;
  y0?: number;
  y1?: number;
  category?: 'Airlines' | 'Banks' | 'Hotels';
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: number;
  target: number;
  value: number;
  width?: number;
}

// Define color schemes
const BRAND_COLORS: Record<string, string> = {
  'American Express': '#006FCF', // Amex Blue
  Chase: '#FFFFFF', // White
  'Capital One': '#C3002F', // Capital One Red
  Bilt: '#374151', // Dark grey (gray-700)
  Citi: '#FF6B1B', // Citi Orange
};

const BRAND_LOGOS: Record<string, string> = {
  'American Express': '/src/assets/logos/amex.svg',
  Chase: '/src/assets/logos/chase.png',
  'Capital One': '/src/assets/logos/cap1.png',
  Bilt: '/src/assets/logos/bilt.png',
  Citi: '/src/assets/logos/citi.svg',
};

const PARTNER_COLORS = [
  '#60A5FA', // blue-400
  '#A78BFA', // violet-400
  '#34D399', // emerald-400
  '#F472B6', // pink-400
  '#FBBF24', // amber-400
  '#FB923C', // orange-400
];

// Transform the data into the format required by D3 Sankey
const transformData = (): SankeyGraph<Node, Link> => {
  const nodes: Node[] = [];
  const links: Link[] = [];

  // First add all bank nodes, sorted alphabetically
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

  const sortedPartners = Array.from(partnerMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const midPoint = Math.ceil(sortedPartners.length / 2);

  // Add left side partners
  const leftPartners = sortedPartners.slice(0, midPoint).map((partner, i) => ({
    id: partner.name,
    index: bankNodes.length + i,
    category: partner.category,
  }));
  nodes.push(...leftPartners);

  // Add right side partners
  const rightPartners = sortedPartners.slice(midPoint).map((partner, i) => ({
    id: partner.name,
    index: bankNodes.length + leftPartners.length + i,
    category: partner.category,
  }));
  nodes.push(...rightPartners);

  // Create a map for quick node index lookup
  const nodeIndexMap = new Map(nodes.map((node) => [node.id, node.index]));

  // Create links between nodes
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

const TransferChart = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const margin = { top: 20, right: 300, bottom: 20, left: 300 };

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    // Create the Sankey generator
    const sankeyGenerator = sankey<Node, Link>()
      .nodeWidth(25)
      .nodePadding(15)
      .extent([
        [margin.left, margin.top],
        [width - margin.right, height - margin.bottom],
      ]);

    // Generate the Sankey data
    const data = transformData();
    const { nodes, links } = sankeyGenerator(data);

    const svg = d3.select(svgRef.current);

    // Create color scale for partners
    const partnerColorScale = d3
      .scaleOrdinal<string>()
      .domain(nodes.map((n) => n.id))
      .range(PARTNER_COLORS);

    // Add links
    const linkElements = svg
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
      .on('mouseover', function (event: MouseEvent, d: any) {
        const link = d3.select(this);
        const source = d.source as Node;
        const target = d.target as Node;

        // Highlight only this link
        linkElements.style('stroke-opacity', (l) => (l === d ? 0.8 : 0.15));
        link.style(
          'stroke',
          BRAND_COLORS[source.category === 'Banks' ? source.id : target.id]
        );

        // Highlight connected nodes
        nodeElements.style('opacity', (n) =>
          n.id === source.id || n.id === target.id ? 0.8 : 0.3
        );

        // Show transfer ratio tooltip
        const bankNode = source.category === 'Banks' ? source : target;
        const partner = transferPartners.find((p) => p.name === bankNode.id);
        const partnerNode = source.category === 'Banks' ? target : source;
        const ratio =
          partner?.partners.find((p) => p.name === partnerNode.id)
            ?.transferRatio || '1:1';

        const pathNode = this as SVGPathElement;
        const bbox = pathNode.getBBox();
        const tooltipX = bbox.x + bbox.width / 2;
        const tooltipY = bbox.y + bbox.height / 2;

        svg.selectAll('.link-tooltip').remove();

        const tooltipGroup = svg
          .append('g')
          .attr('class', 'link-tooltip')
          .attr('transform', `translate(${tooltipX}, ${tooltipY})`)
          .style('pointer-events', 'none');

        // Create temporary text to measure total width
        const tempGroup = tooltipGroup
          .append('g')
          .style('visibility', 'hidden');

        // Measure partner name
        const partnerText = tempGroup
          .append('text')
          .style('font-family', 'Geist Mono')
          .style('font-size', '12px')
          .text(partnerNode.id + ' ');
        const partnerWidth = partnerText.node()?.getComputedTextLength() ?? 0;

        // Measure ratio with bigger, bold font
        const ratioText = tempGroup
          .append('text')
          .style('font-family', 'Geist Mono')
          .style('font-size', '14px')
          .style('font-weight', 'bold')
          .text(ratio);
        const ratioWidth = ratioText.node()?.getComputedTextLength() ?? 0;

        // Measure bank name
        const bankText = tempGroup
          .append('text')
          .style('font-family', 'Geist Mono')
          .style('font-size', '12px')
          .text(' ' + bankNode.id);
        const bankWidth = bankText.node()?.getComputedTextLength() ?? 0;

        const totalWidth = partnerWidth + ratioWidth + bankWidth;
        tempGroup.remove();

        // Add background rectangle with calculated width
        tooltipGroup
          .append('rect')
          .attr('x', -(totalWidth / 2 + 10))
          .attr('y', -12)
          .attr('width', totalWidth + 20)
          .attr('height', 24)
          .attr('rx', 4)
          .attr('fill', '#1f2937')
          .attr('opacity', 0.9);

        // Add partner name
        tooltipGroup
          .append('text')
          .attr('text-anchor', 'end')
          .attr('x', -ratioWidth / 2 - 5)
          .attr('y', 0)
          .attr('dominant-baseline', 'middle')
          .style('fill', '#e5e7eb')
          .style('font-family', 'Geist Mono')
          .style('font-size', '12px')
          .text(partnerNode.id);

        // Add ratio with bigger, bold font
        tooltipGroup
          .append('text')
          .attr('text-anchor', 'middle')
          .attr('x', 0)
          .attr('y', 0)
          .attr('dominant-baseline', 'middle')
          .style('fill', '#e5e7eb')
          .style('font-family', 'Geist Mono')
          .style('font-size', '14px')
          .style('font-weight', 'bold')
          .text(ratio);

        // Add bank name
        tooltipGroup
          .append('text')
          .attr('text-anchor', 'start')
          .attr('x', ratioWidth / 2 + 5)
          .attr('y', 0)
          .attr('dominant-baseline', 'middle')
          .style('fill', '#e5e7eb')
          .style('font-family', 'Geist Mono')
          .style('font-size', '12px')
          .text(bankNode.id);
      })
      .on('mouseout', function () {
        // Reset all visual states
        nodeElements.style('opacity', 1);
        linkElements.style('stroke', '#aaa').style('stroke-opacity', 0.15);
        svg.selectAll('.link-tooltip').remove();
      });

    // Add nodes with hover functionality
    const nodeElements = svg
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
        const node = d3.select(this);
        node.style('opacity', 0.8);

        // Find all links connected to this node
        const connectedLinks = links.filter((l) => {
          const source = l.source as unknown as Node;
          const target = l.target as unknown as Node;
          return source.id === d.id || target.id === d.id;
        });

        // Highlight connected links
        linkElements
          .style('stroke', (l: any) => {
            const source = l.source as Node;
            const target = l.target as Node;
            if (source.id === d.id || target.id === d.id) {
              return BRAND_COLORS[d.id] || partnerColorScale(d.id);
            }
            return '#aaa';
          })
          .style('stroke-opacity', (l: any) => {
            const source = l.source as Node;
            const target = l.target as Node;
            return source.id === d.id || target.id === d.id ? 0.8 : 0.15;
          });

        // Highlight connected nodes
        nodeElements.style('opacity', (n: any) => {
          const isConnected = links.some((l) => {
            const source = l.source as unknown as Node;
            const target = l.target as unknown as Node;
            return (
              (source.id === d.id && target.id === n.id) ||
              (target.id === d.id && source.id === n.id)
            );
          });
          return isConnected || n.id === d.id ? 0.8 : 0.3;
        });
      })
      .on('mouseout', function () {
        // Reset all visual states
        nodeElements.style('opacity', 1);
        linkElements.style('stroke', '#aaa').style('stroke-opacity', 0.15);
      });

    // Add external labels with logos
    svg
      .append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .each(function (d) {
        const g = d3.select(this);
        const isBank = BRAND_COLORS.hasOwnProperty(d.id);
        const isLeftSide = !isBank && (d.x0 ?? 0) < width / 2;
        const x = isBank
          ? (d.x0 ?? 0) - 30
          : isLeftSide
            ? (d.x0 ?? 0) - 40
            : (d.x1 ?? 0) + 40;
        const y = (d.y0 ?? 0) + ((d.y1 ?? 0) - (d.y0 ?? 0)) / 2;

        // Add logos for banks
        if (BRAND_LOGOS[d.id]) {
          g.append('image')
            .attr('href', BRAND_LOGOS[d.id])
            .attr('x', x - 40)
            .attr('y', y - 20)
            .attr('width', 40)
            .attr('height', 40)
            .style('cursor', 'pointer')
            .on('mouseover', function (event) {
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
          // Add text for partners with category emoji
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
            .style('font-size', '14px')
            .each(function () {
              // Check if text is too long and adjust position if needed
              const textWidth = (
                this as SVGTextElement
              ).getComputedTextLength();
              if (isLeftSide && textWidth > margin.left - 40) {
                d3.select(this).attr('x', margin.left - 20);
              } else if (!isLeftSide && textWidth > margin.right - 40) {
                d3.select(this).attr('x', width - margin.right + 20);
              }
            });
        }
      });
  }, []);

  return (
    <div className="w-full h-[800px]">
      <svg ref={svgRef} width="100%" height="100%" />
    </div>
  );
};

export default TransferChart;
