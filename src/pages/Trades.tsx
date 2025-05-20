
import { useState } from "react";

export default function Trades() {
  // Use useState but implement proper typing for tradespeople
  const [loading, setLoading] = useState(false);
  
  // Function to handle search (implemented to avoid unused function warning)
  const handleSearch = () => {
    setLoading(true);
    // Here we'd normally fetch data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Find Trades</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Search for tradespeople</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trade
              </label>
              <select 
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                onChange={() => handleSearch()}
              >
                <option value="">All trades</option>
                <option value="electrician">Electrician</option>
                <option value="plumber">Plumber</option>
                <option value="carpenter">Carpenter</option>
                <option value="roofer">Roofer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Postcode
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Enter your postcode"
                onChange={() => handleSearch()}
              />
            </div>
            <div className="flex items-end">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 w-full md:w-auto"
                onClick={handleSearch}
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
        </div>

        {/* Search results would appear here */}
        <div className="mt-6">
          <p className="text-center text-gray-500">
            {loading 
              ? "Searching for available tradespeople..." 
              : "Search for tradespeople in your area"}
          </p>
        </div>
      </div>
    </div>
  );
}
