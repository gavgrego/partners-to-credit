import * as d3 from 'd3';
import type { Node } from '@/types';

export const createTooltip = (
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  tooltipX: number,
  tooltipY: number,
  bankNode: Node,
  ratio: string,
  partnerNode: Node
) => {
  // Remove any existing tooltips
  svg.selectAll('.link-tooltip').remove();

  const tooltipGroup = svg
    .append('g')
    .attr('class', 'link-tooltip')
    .attr('transform', `translate(${tooltipX}, ${tooltipY})`)
    .style('pointer-events', 'none');

  // Create a hidden text element to measure width
  const tempText = tooltipGroup
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .style('visibility', 'hidden')
    .html(
      `${bankNode.id}    <tspan style="font-size: 14px; font-weight: bold">${ratio}</tspan>    ${partnerNode.id}`
    );

  // Get the actual rendered width
  const textWidth = tempText.node()?.getComputedTextLength() ?? 0;
  tempText.remove();

  // Add background rectangle first
  tooltipGroup
    .append('rect')
    .attr('x', -(textWidth / 2 + 10))
    .attr('y', -12)
    .attr('width', textWidth + 20)
    .attr('height', 24)
    .attr('rx', 4)
    .attr('fill', '#1f2937');

  // Add text on top of the background
  tooltipGroup
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .style('fill', '#e5e7eb')
    .style('font-family', 'Geist Mono')
    .style('font-size', '12px')
    .html(
      `${bankNode.id}    <tspan style="font-size: 14px; font-weight: bold">${ratio}</tspan>    ${partnerNode.id}`
    );

  return tooltipGroup;
};

export const removeTooltip = (
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>
) => {
  svg.selectAll('.link-tooltip').remove();
};
