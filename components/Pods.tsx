'use client'
import React, { useState, useEffect } from 'react';

interface Pods {
  name: string;
}

interface PodsProps {
  namespace: string;
}

const Pods: React.FC<PodsProps> = ({ namespace }) => {
  const [Pods, setPods] = useState<Pods[]>([]);

  useEffect(() => {
    const fetchPods = async () => {
      try {
        if (!namespace) {
          setPods([]);
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_PODS_BASE_URL}/${namespace}`);
        const data = await response.json();
        
        if (data.pods && Array.isArray(data.pods)) {
          setPods(data.pods);
        } else {
          setPods([]);
        }
      } catch (error) {
        console.error('Error fetching pods:', error);
        setPods([]);
      }
    };

    fetchPods();
  }, [namespace]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Pods:</h2>
      {Pods.length > 0 ? (
        <ul className="list-disc list-inside">
          {Pods.map((replicaSet, index) => (
            <li key={index} className="text-lg">{replicaSet.name}</li>
          ))}
        </ul>
      ) : (
        <p className="text-lg text-gray-500">No Pods</p>
      )}
    </div>
  );
};

export default Pods;
