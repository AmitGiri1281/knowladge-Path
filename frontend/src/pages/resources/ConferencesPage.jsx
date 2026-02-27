import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaExternalLinkAlt,
  FaSearch,
  FaFilter,
  FaArrowLeft,
  FaUsers,
  FaClock,
  FaGlobe,
  FaVideo,
  FaUniversity
} from 'react-icons/fa';

const ConferencesPage = () => {
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [conferenceType, setConferenceType] = useState('all'); // 'all', 'upcoming', 'past'
  const [mode, setMode] = useState('all'); // 'all', 'physical', 'virtual', 'hybrid'

  useEffect(() => {
    fetchConferences();
  }, []);

  const fetchConferences = () => {
    // Sample conference data
    const sampleConferences = [
      {
        id: 1,
        title: "International Conference on Digital Libraries (ICDL) 2024",
        organizer: "TERI, New Delhi",
        dates: "November 14-17, 2024",
        location: "New Delhi, India",
        mode: "hybrid",
        deadline: "June 30, 2024",
        url: "https://www.teriin.org/icdl/",
        description: "Annual conference focusing on digital library developments in developing countries",
        topics: ["Digital Libraries", "Open Access", "Knowledge Management"],
        speakers: ["Dr. R. S. Aswal", "Prof. Jagdish Arora"],
        status: "upcoming"
      },
      {
        id: 2,
        title: "IFLA World Library and Information Congress 2024",
        organizer: "IFLA",
        dates: "August 24-30, 2024",
        location: "Dubai, UAE",
        mode: "physical",
        deadline: "February 15, 2024",
        url: "https://2024.ifla.org/",
        description: "The premier international conference for library and information professionals",
        topics: ["Libraries", "Information Science", "Cultural Heritage"],
        speakers: ["Barbara Lison", "Dr. Ismail Serageldin"],
        status: "upcoming"
      },
      {
        id: 3,
        title: "International Conference on Information Management (ICIM) 2024",
        organizer: "IIT Delhi",
        dates: "March 22-24, 2024",
        location: "New Delhi, India",
        mode: "physical",
        deadline: "January 15, 2024",
        url: "https://icim2024.iitd.ac.in/",
        description: "Conference on information management and data science",
        topics: ["Information Management", "Data Science", "AI in Libraries"],
        speakers: ["Prof. P. K. Jain", "Dr. Uma Kanjilal"],
        status: "upcoming"
      },
      {
        id: 4,
        title: "Library 2.025 Worldwide Virtual Conference",
        organizer: "Library 2.0",
        dates: "March 6-8, 2025",
        location: "Online",
        mode: "virtual",
        deadline: "February 1, 2025",
        url: "https://www.library20.com/",
        description: "Global virtual conference on emerging technologies in libraries",
        topics: ["Emerging Technologies", "AI", "Virtual Services"],
        speakers: ["Dr. Sandra Hirsh", "Marshall Breeding"],
        status: "upcoming"
      },
      {
        id: 5,
        title: "SIS 2024: Annual Convention of Society for Information Science",
        organizer: "SIS India",
        dates: "December 5-7, 2024",
        location: "Hyderabad, India",
        mode: "hybrid",
        deadline: "September 30, 2024",
        url: "https://sis.org.in/convention2024",
        description: "National convention on information science and knowledge management",
        topics: ["Information Science", "Knowledge Organization", "Research Metrics"],
        speakers: ["Dr. B. K. Sen", "Prof. A. R. D. Prasad"],
        status: "upcoming"
      },
      {
        id: 6,
        title: "CALIBER 2024",
        organizer: "INFLIBNET Centre",
        dates: "February 28 - March 1, 2024",
        location: "Mumbai, India",
        mode: "physical",
        deadline: "December 15, 2023",
        url: "https://www.inflibnet.ac.in/caliber2024",
        description: "Annual convention on automation of libraries in education and research",
        topics: ["Library Automation", "Digital Repositories", "Research Support"],
        speakers: ["Prof. J. P. Singh Joorel", "Dr. H. G. Hosamani"],
        status: "past"
      },
      {
        id: 7,
        title: "International Conference on Knowledge Organization (ICKO) 2023",
        organizer: "DRTC, ISI Bangalore",
        dates: "December 12-14, 2023",
        location: "Bangalore, India",
        mode: "physical",
        deadline: "October 15, 2023",
        url: "https://www.isibang.ac.in/~drtc/icko2023",
        description: "Conference on knowledge organization systems and practices",
        topics: ["Knowledge Organization", "Classification", "Ontologies"],
        speakers: ["Prof. A. Neelameghan", "Dr. Devika P. Madalli"],
        status: "past"
      }
    ];
    
    setConferences(sampleConferences);
    setLoading(false);
  };

  const filteredConferences = conferences.filter(conf => {
    const matchesSearch = conf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conf.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conf.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conf.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = conferenceType === 'all' || conf.status === conferenceType;
    const matchesMode = mode === 'all' || conf.mode === mode;
    return matchesSearch && matchesType && matchesMode;
  });

  const upcomingCount = conferences.filter(c => c.status === 'upcoming').length;
  const pastCount = conferences.filter(c => c.status === 'past').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-4">
            <FaArrowLeft className="mr-2" /> Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4">Conferences & Workshops</h1>
          <p className="text-xl opacity-90">Stay updated with LIS conferences worldwide</p>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Events</p>
                <p className="text-3xl font-bold text-blue-600">{conferences.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FaCalendarAlt className="text-2xl text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Upcoming</p>
                <p className="text-3xl font-bold text-green-600">{upcomingCount}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FaClock className="text-2xl text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Past Events</p>
                <p className="text-3xl font-bold text-gray-600">{pastCount}</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-full">
                <FaUsers className="text-2xl text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search conferences..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <select
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={conferenceType}
                onChange={(e) => setConferenceType(e.target.value)}
              >
                <option value="all">All Events</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </div>
            <div>
              <select
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
              >
                <option value="all">All Modes</option>
                <option value="physical">Physical</option>
                <option value="virtual">Virtual</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>
        </div>

        {/* Conferences List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="mb-4 text-gray-600">
              Found {filteredConferences.length} conferences
            </div>
            <div className="space-y-4">
              {filteredConferences.map((conf) => (
                <motion.div
                  key={conf.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition ${
                    conf.status === 'past' ? 'opacity-75' : ''
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">{conf.title}</h3>
                          <p className="text-gray-600 mb-2 flex items-center">
                            <FaUniversity className="mr-2 text-gray-400" />
                            {conf.organizer}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            conf.mode === 'physical' ? 'bg-blue-100 text-blue-600' :
                            conf.mode === 'virtual' ? 'bg-green-100 text-green-600' :
                            'bg-purple-100 text-purple-600'
                          }`}>
                            {conf.mode.charAt(0).toUpperCase() + conf.mode.slice(1)}
                          </span>
                          {conf.status === 'upcoming' && (
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm font-medium">
                              Upcoming
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <FaCalendarAlt className="mr-2 text-gray-400" />
                          {conf.dates}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FaMapMarkerAlt className="mr-2 text-gray-400" />
                          {conf.location}
                        </div>
                        {conf.status === 'upcoming' && (
                          <div className="flex items-center text-sm text-red-600">
                            <FaClock className="mr-2" />
                            Deadline: {conf.deadline}
                          </div>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mt-4">{conf.description}</p>
                      
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Topics:</p>
                        <div className="flex flex-wrap gap-2">
                          {conf.topics.map((topic, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {conf.speakers && (
                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Key Speakers:</p>
                          <div className="flex flex-wrap gap-2">
                            {conf.speakers.map((speaker, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs"
                              >
                                {speaker}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col items-end">
                      <a
                        href={conf.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-6 py-3 rounded-lg transition flex items-center ${
                          conf.status === 'upcoming'
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {conf.status === 'upcoming' ? 'Conference Website' : 'View Details'}{' '}
                        <FaExternalLinkAlt className="ml-2 text-sm" />
                      </a>
                      {conf.status === 'past' && (
                        <span className="text-xs text-gray-500 mt-2">Proceedings available</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Important Links */}
      <div className="bg-white py-12 mt-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Important Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="https://www.ifla.org/events/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition group"
            >
              <h3 className="font-semibold text-gray-800 group-hover:text-blue-600">IFLA Events</h3>
              <p className="text-sm text-gray-600">International library conferences</p>
            </a>
            <a
              href="https://www.inflibnet.ac.in/events.php"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition group"
            >
              <h3 className="font-semibold text-gray-800 group-hover:text-blue-600">INFLIBNET Events</h3>
              <p className="text-sm text-gray-600">National level LIS events</p>
            </a>
            <a
              href="https://www.conferencealerts.com/library-and-information-science"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition group"
            >
              <h3 className="font-semibold text-gray-800 group-hover:text-blue-600">Conference Alerts</h3>
              <p className="text-sm text-gray-600">LIS conference notifications</p>
            </a>
            <a
              href="https://www.libconf.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition group"
            >
              <h3 className="font-semibold text-gray-800 group-hover:text-blue-600">Library Conferences</h3>
              <p className="text-sm text-gray-600">Global library events calendar</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConferencesPage;