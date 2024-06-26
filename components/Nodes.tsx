'use client'
import React, { useState, useEffect } from 'react';

interface Node {
  name: string;
}

const Nodes: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_NODES_BASE_URL || '');
        const data = await response.json();
        setNodes(data.nodes || []);
      } catch (error) {
        console.error('Error fetching nodes:', error);
        setNodes([]);
      }
    };

    fetchNodes();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Nodes</h2>
      {nodes.length > 0 ? (
        <ul className="list-disc list-inside">
          {nodes.map((node, index) => (
            <li key={index} className="text-lg">{node.name}</li>
          ))}
        </ul>
      ) : (
        <p className="text-lg text-gray-500">No nodes found</p>
      )}
    </div>
  );
};

export default Nodes;
