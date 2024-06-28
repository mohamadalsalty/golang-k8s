'use client'
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Deployments from '../../components/Deployments';
import ClusterInfo from '../../components/ClusterInfo';
import ReplicaSets from '../../components/ReplicaSets';
import Nodes from '../../components/Nodes';
import Pods from '../../components/Pods';


const Home: React.FC = () => {
  const [selectedNamespace, setSelectedNamespace] = useState<string>('');

  const handleNamespaceChange = (newNamespace: string) => {
    setSelectedNamespace(newNamespace);
  };

  return (
    <div>
      <Navbar selectedNamespace={selectedNamespace} onNamespaceChange={handleNamespaceChange} />
      <main className="p-4">
        <ClusterInfo />
        <Nodes />
        <Deployments namespace={selectedNamespace} />
        <ReplicaSets namespace={selectedNamespace} />
        <Pods namespace={selectedNamespace} />

      </main>
    </div>
  );
};

export default Home;
