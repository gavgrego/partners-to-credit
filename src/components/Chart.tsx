import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import {
  createLabels,
  createLinks,
  createNodes,
  transformData,
  initializeSankey,
} from '@/utils';
import { PARTNER_COLORS } from '@/constants';
import { useTransferPartners } from '@/hooks/useTransferPartners';

const TransferChart = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const { data: transferPartners, isLoading } = useTransferPartners();

  useEffect(() => {
    if (!svgRef.current || !transferPartners) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const margin = { top: 0, right: 250, bottom: 0, left: 250 };

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Transform data and initialize sankey
    const { nodes, links } = transformData(transferPartners);
    const sankeyLayout = initializeSankey(width, height - margin.top, margin);
    const { nodes: sankeyNodes, links: sankeyLinks } = sankeyLayout({
      nodes: nodes.map((d) => ({ ...d })),
      links: links.map((d) => ({ ...d })),
    });

    // Create color scale for partners
    const partnerColorScale = d3
      .scaleOrdinal<string>()
      .domain(nodes.map((n) => n.id))
      .range(PARTNER_COLORS);

    // Add links with hover effects
    createLinks(svg, sankeyLinks, transferPartners);

    // Add nodes with hover effects
    createNodes(svg, sankeyNodes, partnerColorScale);

    // Add labels
    createLabels(svg, sankeyNodes, margin, width);

    // Adjust the SVG viewBox to prevent tooltip clipping
    svg.attr('viewBox', `0 -40 ${width} ${height + 80}`);
  }, [transferPartners]);

  if (isLoading) {
    return (
      <div className="w-full h-[900px] flex items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading chart...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-[900px] relative">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        style={{ overflow: 'visible' }}
      />
    </div>
  );
};

export default TransferChart;
