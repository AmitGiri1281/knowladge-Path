import React, { useState } from 'react';
import { FaExternalLinkAlt, FaBookOpen, FaUniversity, FaFlask, FaSearch, FaFilter } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Journals = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const journals = [
    {
      title: "Google Scholar",
      description: "Search across many disciplines and sources: articles, theses, books, abstracts and court opinions",
      url: "https://scholar.google.com",
      category: "Multidisciplinary",
      features: ["All disciplines", "Citation tracking", "Free access"]
    },
    {
      title: "JSTOR",
      description: "Digital library for scholars, researchers, and students with access to thousands of academic journals",
      url: "https://www.jstor.org",
      category: "Multidisciplinary",
      features: ["2,000+ journals", "Primary sources", "Limited free access"]
    },
    {
      title: "PubMed Central",
      description: "Free full-text archive of biomedical and life sciences literature",
      url: "https://www.ncbi.nlm.nih.gov/pmc/",
      category: "Medical",
      features: ["7M+ articles", "Biomedical focus", "Free access"]
    },
    {
      title: "arXiv.org",
      description: "Open access to e-prints in Physics, Mathematics, Computer Science, Quantitative Biology, Finance and Statistics",
      url: "https://arxiv.org",
      category: "Science",
      features: ["2M+ papers", "Pre-prints", "Open access"]
    },
    {
      title: "Directory of Open Access Journals",
      description: "Community-curated online directory that indexes and provides access to high quality open access journals",
      url: "https://doaj.org",
      category: "Multidisciplinary",
      features: ["17,000+ journals", "Peer-reviewed", "Open access"]
    },
    {
      title: "IEEE Xplore",
      description: "Technical literature in electrical engineering, computer science, and electronics",
      url: "https://ieeexplore.ieee.org",
      category: "Technology",
      features: ["5M+ documents", "Technical focus", "Some free content"]
    },
    {
      title: "ScienceDirect",
      description: "Peer-reviewed journals, articles, book chapters and open access content",
      url: "https://www.sciencedirect.com",
      category: "Multidisciplinary",
      features: ["18M+ articles", "Elsevier journals", "Open access options"]
    },
    {
      title: "SpringerOpen",
      description: "Springer's portfolio of fully open access journals across all disciplines",
      url: "https://www.springeropen.com",
      category: "Multidisciplinary",
      features: ["200+ journals", "Peer-reviewed", "Fully open"]
    },
    {
      title: "Wiley Open Access",
      description: "Open access journals covering broad range of disciplines",
      url: "https://authorservices.wiley.com/open-research/open-access/index.html",
      category: "Multidisciplinary",
      features: ["Peer-reviewed", "High quality", "Open access"]
    },
    {
      title: "Taylor & Francis Open",
      description: "Open access journals from Taylor & Francis, Routledge, and Cogent OA",
      url: "https://www.tandfonline.com/openaccess",
      category: "Multidisciplinary",
      features: ["Peer-reviewed", "Open access", "All disciplines"]
    },
    {
      title: "SAGE Open",
      description: "Peer-reviewed, open access journal covering all disciplines",
      url: "https://journals.sagepub.com/home/sgo",
      category: "Multidisciplinary",
      features: ["Open access", "Peer-reviewed", "All subjects"]
    },
    {
      title: "Oxford Academic Journals",
      description: "Oxford University Press journals with open access options",
      url: "https://academic.oup.com/journals",
      category: "Multidisciplinary",
      features: ["300+ journals", "Oxford quality", "Open access"]
    },
    {
      title: "Cambridge Core",
      description: "Cambridge University Press journals with open access content",
      url: "https://www.cambridge.org/core",
      category: "Multidisciplinary",
      features: ["400+ journals", "Cambridge quality", "Open access"]
    },
    {
      title: "PLOS ONE",
      description: "Peer-reviewed open access scientific journal published by the Public Library of Science",
      url: "https://journals.plos.org/plosone/",
      category: "Science",
      features: ["200,000+ articles", "Peer-reviewed", "Fully open"]
    },
    {
      title: "Frontiers",
      description: "Open access publisher of peer-reviewed scientific journals",
      url: "https://www.frontiersin.org",
      category: "Science",
      features: ["60+ journals", "Peer-reviewed", "Open access"]
    }
  ];

  // Get unique categories
  const categories = ['All', ...new Set(journals.map(journal => journal.category))];

  // Filter journals based on selected category and search term
  const filteredJournals = journals.filter(journal => {
    const matchesCategory = selectedCategory === 'All' || journal.category === selectedCategory;
    const matchesSearch = journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         journal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         journal.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         journal.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Get count for each category
  const getCategoryCount = (category) => {
    if (category === 'All') return journals.length;
    return journals.filter(journal => journal.category === category).length;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Academic Journals
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl">
            Free access to academic journals, research papers, and scholarly articles. All resources are free or provide free access options.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="text-3xl font-bold text-green-600">50,000+</div>
            <div className="text-gray-600">Journals Available</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="text-3xl font-bold text-green-600">20M+</div>
            <div className="text-gray-600">Articles Accessible</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="text-3xl font-bold text-green-600">Free</div>
            <div className="text-gray-600">Open Access Options</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search journals by title, description, or features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Categories Filter */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <FaFilter className="text-gray-600 mr-2" />
            <span className="text-gray-700 font-medium">Filter by Category:</span>
            {selectedCategory !== 'All' && (
              <button
                onClick={() => setSelectedCategory('All')}
                className="ml-3 text-sm text-green-600 hover:text-green-700"
              >
                Clear Filter
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white shadow-md scale-105'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category} ({getCategoryCount(category)})
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredJournals.length} of {journals.length} journals
        </div>

        {/* Journals Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategory + searchTerm}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredJournals.length > 0 ? (
              filteredJournals.map((journal, index) => (
                <motion.a
                  key={index}
                  href={journal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="block p-6 bg-white rounded-xl border border-gray-200 hover:shadow-xl transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition">
                      <FaBookOpen className="text-2xl text-green-600" />
                    </div>
                    <FaExternalLinkAlt className="text-gray-400 group-hover:text-green-600 transition" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{journal.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{journal.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {journal.features.map((feature, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <span className="inline-block px-3 py-1 bg-green-50 text-sm text-green-600 rounded-full">
                    {journal.category}
                  </span>
                </motion.a>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <p className="text-gray-500 text-lg">No journals found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchTerm('');
                  }}
                  className="mt-4 text-green-600 hover:text-green-700 font-medium"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Tips */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-blue-50 rounded-xl">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <FaUniversity className="mr-2 text-blue-600" /> Access Tips
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Many journals offer limited free articles per month</li>
              <li>• Check if your university provides institutional access</li>
              <li>• Look for "Open Access" filters when searching</li>
              <li>• Pre-prints are often freely available on arXiv</li>
            </ul>
          </div>
          <div className="p-6 bg-purple-50 rounded-xl">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <FaFlask className="mr-2 text-purple-600" /> Research Tools
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Use Google Scholar for broad searches</li>
              <li>• Set up email alerts for new publications</li>
              <li>• Export citations in multiple formats</li>
              <li>• Track citations of important papers</li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-700">
            <strong>Note:</strong> These are external links to academic resources. Some sites may require free registration 
            or have limits on free access per month.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Journals;