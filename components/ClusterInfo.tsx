// components/ClusterInfo.tsx

import React, { useState, useEffect } from 'react';

interface ClusterInfoData {
  name: string;
  version: string;
}

const ClusterInfo: React.FC = () => {
  const [clusterInfo, setClusterInfo] = useState<ClusterInfoData | null>(null);

  useEffect(() => {
    const fetchClusterInfo = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CLUSTER_INFO_ENDPOINT}`);
        const data = await response.json();
        setClusterInfo(data);
      } catch (error) {
        console.error('Error fetching cluster info:', error);
        setClusterInfo(null);
      }
    };

    fetchClusterInfo();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Cluster Information</h2>
      {clusterInfo ? (
        <div className="bg-gray-200 p-4 rounded">
          <p className="text-lg">
            <span className="font-bold">Cluster Name:</span> {clusterInfo.name}
          </p>
          <p className="text-lg">
            <span className="font-bold">Cluster Version:</span> {clusterInfo.version}
          </p>
        </div>
      ) : (
        <p className="text-lg text-gray-500">No cluster information available.</p>
      )}
    </div>
  );
};

export default ClusterInfo;
