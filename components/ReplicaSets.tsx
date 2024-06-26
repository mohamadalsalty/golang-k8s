'use client'
import React, { useState, useEffect } from 'react';

interface ReplicaSet {
  name: string;
}

interface ReplicaSetsProps {
  namespace: string;
}

const ReplicaSets: React.FC<ReplicaSetsProps> = ({ namespace }) => {
  const [replicaSets, setReplicaSets] = useState<ReplicaSet[]>([]);

  useEffect(() => {
    const fetchReplicaSets = async () => {
      try {
        if (!namespace) {
          setReplicaSets([]);
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_REPLICA_SETS_BASE_URL}/${namespace}`);
        const data = await response.json();
        
        if (data.replicaSets && Array.isArray(data.replicaSets)) {
          setReplicaSets(data.replicaSets);
        } else {
          setReplicaSets([]);
        }
      } catch (error) {
        console.error('Error fetching replica sets:', error);
        setReplicaSets([]);
      }
    };

    fetchReplicaSets();
  }, [namespace]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Replica Sets: {namespace}</h2>
      {replicaSets.length > 0 ? (
        <ul className="list-disc list-inside">
          {replicaSets.map((replicaSet, index) => (
            <li key={index} className="text-lg">{replicaSet.name}</li>
          ))}
        </ul>
      ) : (
        <p className="text-lg text-gray-500">No replica sets: {namespace}</p>
      )}
    </div>
  );
};

export default ReplicaSets;
