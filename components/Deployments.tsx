'use client'
import React, { useState, useEffect } from 'react';

interface Deployment {
  name: string;
}

interface DeploymentsProps {
  namespace: string;
}

const Deployments: React.FC<DeploymentsProps> = ({ namespace }) => {
  const [deployments, setDeployments] = useState<Deployment[]>([]);

  useEffect(() => {
    const fetchDeployments = async () => {
      try {
        if (!namespace) {
          setDeployments([]); 
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_DEPLOYMENTS_BASE_URL}/${namespace}`);
        const data = await response.json();
        
        if (data.deployments && Array.isArray(data.deployments)) {
          setDeployments(data.deployments);
        } else {
          setDeployments([]);
        }
      } catch (error) {
        console.error('Error fetching deployments:', error);
        setDeployments([]);
      }
    };

    fetchDeployments();
  }, [namespace]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Deployments: </h2>
      {deployments.length > 0 ? (
        <ul className="list-disc list-inside">
          {deployments.map((deployment, index) => (            
            <li key={index} className="text-lg">{deployment.name}</li>
          ))}
        </ul>
      ) : (
        <p className="text-lg text-gray-500">No deployments found: {namespace}</p>
      )}
    </div>
  );
};

export default Deployments;
