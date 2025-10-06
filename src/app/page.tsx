'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Visitor {
  id: string;
  name: string;
  purpose: string;
  entryTime: string;
  exitTime: string | null;
}

export default function Home() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [name, setName] = useState('');
  const [purpose, setPurpose] = useState('');
  
  useEffect(() => {
    const savedVisitors = localStorage.getItem('visitors');
    if (savedVisitors) {
      setVisitors(JSON.parse(savedVisitors));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('visitors', JSON.stringify(visitors));
  }, [visitors]);

  const handleEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !purpose) return;
    
    const newVisitor: Visitor = {
      id: Date.now().toString(),
      name,
      purpose,
      entryTime: new Date().toLocaleString(),
      exitTime: null
    };
    
    setVisitors([...visitors, newVisitor]);
    setName('');
    setPurpose('');
  };

  const handleExit = (id: string) => {
    const updatedVisitors = visitors.map(visitor => 
      visitor.id === id 
        ? { ...visitor, exitTime: new Date().toLocaleString() } 
        : visitor
    );
    setVisitors(updatedVisitors);
  };

  return (
    <div className="font-sans min-h-screen p-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Visitor Entry/Exit System</h1>
        <p className="text-gray-600 dark:text-gray-300">Track visitors entering and exiting your premises</p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Entry Form */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Register New Visitor</h2>
          <form onSubmit={handleEntry}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-1">Visitor Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                placeholder="Enter visitor name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="purpose" className="block text-sm font-medium mb-1">Purpose of Visit</label>
              <input
                type="text"
                id="purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                placeholder="Enter purpose of visit"
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Register Entry
            </button>
          </form>
        </div>

        {/* Visitor List */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Current Visitors</h2>
          {visitors.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">No visitors registered yet</p>
          ) : (
            <div className="overflow-auto max-h-[500px]">
              <table className="w-full border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Purpose</th>
                    <th className="p-2 text-left">Entry Time</th>
                    <th className="p-2 text-left">Exit Time</th>
                    <th className="p-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {visitors.map((visitor) => (
                    <tr key={visitor.id} className="border-b dark:border-gray-600">
                      <td className="p-2">{visitor.name}</td>
                      <td className="p-2">{visitor.purpose}</td>
                      <td className="p-2">{visitor.entryTime}</td>
                      <td className="p-2">{visitor.exitTime || '-'}</td>
                      <td className="p-2">
                        {!visitor.exitTime && (
                          <button
                            onClick={() => handleExit(visitor.id)}
                            className="bg-green-600 hover:bg-green-700 text-white text-sm py-1 px-2 rounded transition-colors"
                          >
                            Mark Exit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
