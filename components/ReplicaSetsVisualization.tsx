import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface ReplicaSet {
  name: string;
}

interface ReplicaSetsVisualizationProps {
  replicaSets: ReplicaSet[];
}

const ReplicaSetsVisualization: React.FC<ReplicaSetsVisualizationProps> = ({ replicaSets }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!replicaSets || replicaSets.length === 0 || !svgRef.current) {
      return;
    }

    // Clear previous visualizations
    d3.select(svgRef.current).selectAll('*').remove();

    // Setup D3
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create visualization
    const node = svg
      .selectAll('.node')
      .data(replicaSets)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d, i) => `translate(0, ${i * 30})`);

    node
      .append('text')
      .text((d) => d.name)
      .attr('x', 10)
      .attr('y', 20)
      .style('font-size', '16px')
      .style('fill', 'black');

  }, [replicaSets]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Replica Sets Visualization</h2>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default ReplicaSetsVisualization;
