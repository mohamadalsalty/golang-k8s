'use client'
import React, { useState, useEffect } from 'react';

interface Namespace {
  name: string;
}

interface NavbarProps {
  selectedNamespace: string;
  onNamespaceChange: (newNamespace: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ selectedNamespace, onNamespaceChange }) => {
  const [namespaces, setNamespaces] = useState<Namespace[]>([]);

  useEffect(() => {
    const fetchNamespaces = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_NAMESPACES_ENDPOINT!);
        const data = await response.json();
        setNamespaces(data.namespaces);
        if (!namespaces.find(ns => ns.name === selectedNamespace)) {
          onNamespaceChange(data.namespaces.length > 0 ? data.namespaces[0].name : '');
        }
      } catch (error) {
        console.error('Error fetching namespaces:', error);
      }
    };

    fetchNamespaces();
  }, []);

  const handleNamespaceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newNamespace = e.target.value;
    onNamespaceChange(newNamespace);
  };

  return (
    <nav className="bg-gray-800 p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">k8s</div>
        <div>
          <select
            value={selectedNamespace}
            onChange={handleNamespaceChange}
            className="bg-gray-700 text-white p-2 rounded"
          >
            {namespaces.map((namespace) => (
              <option key={namespace.name} value={namespace.name}>
                {namespace.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
