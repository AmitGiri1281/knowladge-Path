import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FaSearch, FaBook, FaTimes } from 'react-icons/fa';
import api from '../services/api';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(query);
  const [error, setError] = useState('');

  useEffect(() => {
    if (query) {
      performSearch();
    } else {
      setLoading(false);
      setResults([]);
    }
  }, [query]);

  const performSearch = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get(`/content/search?q=${encodeURIComponent(query)}`);
      setResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
      setError('Failed to perform search. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchInput)}`;
    }
  };

  const clearSearch = () => {
    setSearchInput('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Search Knowledge Library</h1>
        <div className="flex shadow-lg rounded-full overflow-hidden border-2 border-blue-100 focus-within:border-blue-500 transition">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search any topic... (e.g., Algorithms, Plato, Quantum Physics)"
            className="flex-1 px-6 py-4 focus:outline-none"
          />
          {searchInput && (
            <button 
              type="button"
              onClick={clearSearch}
              className="px-3 text-gray-400 hover:text-gray-600"
            >
              <FaTimes />
            </button>
          )}
          <button 
            type="submit" 
            className="px-8 py-4 bg-blue-600 text-white hover:bg-blue-700 transition flex items-center"
            disabled={!searchInput.trim()}
          >
            <FaSearch className="mr-2" />
            Search
          </button>
        </div>
      </form>

      {/* Results */}
      <div className="max-w-4xl mx-auto">
        {query && (
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            {loading ? 'Searching...' : `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`}
          </h2>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {results.length > 0 ? (
              results.map((result) => (
                <Link key={result._id} to={`/content/${result._id}`}>
                  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition">
                      {result.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {result.theory?.replace(/[#*`]/g, '').substring(0, 200)}...
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaBook className="mr-2 text-blue-500" />
                      <span className="bg-blue-50 px-2 py-1 rounded">{result.sectionId?.name || 'General'}</span>
                      {result.sectionId?.categoryId && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="bg-purple-50 px-2 py-1 rounded">{result.sectionId.categoryId.name}</span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              query && (
                <div className="text-center py-16 bg-white rounded-lg shadow">
                  <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No results found</h3>
                  <p className="text-gray-500">Try different keywords or browse categories</p>
                  <Link to="/" className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Browse Categories
                  </Link>
                </div>
              )
            )}
            
            {!query && (
              <div className="text-center py-16 bg-white rounded-lg shadow">
                <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Search for anything</h3>
                <p className="text-gray-500">Type above to search through our knowledge base</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;