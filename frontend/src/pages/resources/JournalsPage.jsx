import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaBookOpen, 
  FaExternalLinkAlt,
  FaSearch,
  FaFilter,
  FaArrowLeft,
  FaStar,
  FaQuoteRight,
  FaChartLine,
  FaUniversity
} from 'react-icons/fa';

const JournalsPage = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [publisher, setPublisher] = useState('all');

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = () => {
    // Sample journal data based on your provided links
    const sampleJournals = [
      // Taylor & Francis Journals
      {
        id: 1,
        title: "Collection & Curation",
        publisher: "Taylor & Francis",
        url: "https://www.tandfonline.com/journals/wccq20",
        description: "Focuses on collection development and curation practices in libraries",
        impactFactor: "1.2",
        category: "Library Science",
        access: "Subscription",
        issn: "2514-9326",
        frequency: "Quarterly"
      },
      {
        id: 2,
        title: "Journal of Library Administration",
        publisher: "Taylor & Francis",
        url: "https://www.tandfonline.com/toc/wjla20/current",
        description: "Covers all aspects of library administration and management",
        impactFactor: "1.5",
        category: "Library Management",
        access: "Subscription",
        issn: "0193-0826",
        frequency: "8 issues/year"
      },
      {
        id: 3,
        title: "The Serials Librarian",
        publisher: "Taylor & Francis",
        url: "https://www.tandfonline.com/toc/wser20/current",
        description: "Dedicated to serials management in libraries",
        impactFactor: "0.8",
        category: "Serials Management",
        access: "Subscription",
        issn: "0361-526X",
        frequency: "Quarterly"
      },
      {
        id: 4,
        title: "Information & Culture",
        publisher: "Taylor & Francis",
        url: "https://www.tandfonline.com/journals/rcic20",
        description: "Explores the history of information and cultural institutions",
        impactFactor: "0.9",
        category: "Information Science",
        access: "Subscription",
        issn: "2164-8034",
        frequency: "3 issues/year"
      },
      
      // Emerald Journals
      {
        id: 5,
        title: "Library Management",
        publisher: "Emerald",
        url: "https://www.emerald.com/insight/publication/issn/0143-5124",
        description: "International journal covering library management issues",
        impactFactor: "1.8",
        category: "Library Management",
        access: "Subscription",
        issn: "0143-5124",
        frequency: "9 issues/year"
      },
      {
        id: 6,
        title: "Journal of Documentation",
        publisher: "Emerald",
        url: "https://www.emerald.com/insight/publication/issn/0022-0418",
        description: "Leading journal in documentation and information science",
        impactFactor: "2.2",
        category: "Information Science",
        access: "Subscription",
        issn: "0022-0418",
        frequency: "6 issues/year"
      },
      {
        id: 7,
        title: "The Electronic Library",
        publisher: "Emerald",
        url: "https://www.emerald.com/insight/publication/issn/0264-0473",
        description: "Focuses on digital libraries and electronic resources",
        impactFactor: "1.6",
        category: "Digital Libraries",
        access: "Subscription",
        issn: "0264-0473",
        frequency: "6 issues/year"
      },
      {
        id: 8,
        title: "Reference Reviews",
        publisher: "Emerald",
        url: "https://www.emerald.com/insight/publication/issn/0950-4125",
        description: "Reviews of reference materials for libraries",
        impactFactor: "0.4",
        category: "Reference Services",
        access: "Subscription",
        issn: "0950-4125",
        frequency: "8 issues/year"
      },
      
      // Open Access Journals
      {
        id: 9,
        title: "Library Philosophy and Practice",
        publisher: "University of Nebraska - Lincoln",
        url: "https://digitalcommons.unl.edu/libphilprac/",
        description: "Open access journal covering library philosophy and practice",
        impactFactor: "N/A",
        category: "Library Science",
        access: "Open Access",
        issn: "1522-0222",
        frequency: "Continuous"
      },
      {
        id: 10,
        title: "Journal of Librarianship and Information Science",
        publisher: "SAGE",
        url: "https://journals.sagepub.com/home/lis",
        description: "Peer-reviewed journal on library and information science",
        impactFactor: "2.0",
        category: "LIS",
        access: "Subscription",
        issn: "0961-0006",
        frequency: "4 issues/year"
      },
      {
        id: 11,
        title: "College & Research Libraries",
        publisher: "ALA",
        url: "https://crl.acrl.org/index.php/crl",
        description: "Official journal of the Association of College and Research Libraries",
        impactFactor: "2.5",
        category: "Academic Libraries",
        access: "Open Access",
        issn: "2150-6701",
        frequency: "6 issues/year"
      }
    ];
    
    setJournals(sampleJournals);
    setLoading(false);
  };

  const publishers = [...new Set(journals.map(j => j.publisher))];

  const filteredJournals = journals.filter(journal => {
    const matchesSearch = journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         journal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         journal.publisher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPublisher = publisher === 'all' || journal.publisher === publisher;
    return matchesSearch && matchesPublisher;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-4">
            <FaArrowLeft className="mr-2" /> Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4">Academic Journals</h1>
          <p className="text-xl opacity-90">Access top journals from leading publishers</p>
        </div>
      </div>

      {/* Publisher Stats */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Taylor & Francis</p>
                <p className="text-2xl font-bold text-blue-600">
                  {journals.filter(j => j.publisher === 'Taylor & Francis').length}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FaBookOpen className="text-2xl text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Emerald</p>
                <p className="text-2xl font-bold text-green-600">
                  {journals.filter(j => j.publisher === 'Emerald').length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FaUniversity className="text-2xl text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Open Access</p>
                <p className="text-2xl font-bold text-purple-600">
                  {journals.filter(j => j.access === 'Open Access').length}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FaQuoteRight className="text-2xl text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search journals by title, publisher, or description..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <select
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
              >
                <option value="all">All Publishers</option>
                {publishers.map((pub, index) => (
                  <option key={index} value={pub}>{pub}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Journals Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="mb-4 text-gray-600">
              Found {filteredJournals.length} journals
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJournals.map((journal) => (
                <motion.div
                  key={journal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
                >
                  <div className={`p-1 ${
                    journal.publisher === 'Taylor & Francis' ? 'bg-blue-500' :
                    journal.publisher === 'Emerald' ? 'bg-green-500' :
                    journal.access === 'Open Access' ? 'bg-purple-500' : 'bg-gray-500'
                  }`} />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-800 flex-1">{journal.title}</h3>
                      {journal.impactFactor !== 'N/A' && (
                        <div className="flex items-center bg-yellow-100 px-2 py-1 rounded text-sm">
                          <FaChartLine className="text-yellow-600 mr-1" />
                          <span className="text-yellow-600">IF: {journal.impactFactor}</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{journal.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <span className="font-medium text-gray-700 w-24">Publisher:</span>
                        <span className="text-gray-600">{journal.publisher}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium text-gray-700 w-24">ISSN:</span>
                        <span className="text-gray-600">{journal.issn}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium text-gray-700 w-24">Frequency:</span>
                        <span className="text-gray-600">{journal.frequency}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium text-gray-700 w-24">Access:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          journal.access === 'Open Access' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          {journal.access}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {journal.category}
                      </span>
                      <a
                        href={journal.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Visit Journal <FaExternalLinkAlt className="ml-1 text-xs" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Major Publisher Portals */}
      <div className="bg-white py-12 mt-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Major Publisher Portals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a
              href="https://www.tandfonline.com/subjects/information-science"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition group text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200">
                <FaBookOpen className="text-3xl text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Taylor & Francis</h3>
              <p className="text-sm text-gray-600">Information Science journals</p>
            </a>
            
            <a
              href="https://www.emerald.com/dlp"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition group text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200">
                <FaUniversity className="text-3xl text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Emerald</h3>
              <p className="text-sm text-gray-600">Digital Library Platform</p>
            </a>
            
            <a
              href="https://www.emerald.com/journals/search-results?page=1&q=Library&fl_SiteID=3&allJournals=1"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition group text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200">
                <FaSearch className="text-3xl text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Emerald Library</h3>
              <p className="text-sm text-gray-600">Library journals search</p>
            </a>
            
            <a
              href="https://www.doaj.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition group text-center"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200">
                <FaQuoteRight className="text-3xl text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">DOAJ</h3>
              <p className="text-sm text-gray-600">Directory of Open Access Journals</p>
            </a>
          </div>
        </div>
      </div>

      {/* Usage Guidelines */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Access Information</h3>
          <p className="text-yellow-700">
            Some journals may require institutional subscription or personal access. 
            Open Access journals are freely available to all users. Check with your 
            institution for full-text access to subscription-based journals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JournalsPage;