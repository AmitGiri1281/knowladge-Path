import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaSearch,
  FaFilter,
  FaArrowLeft,
  FaClock,
  FaBuilding,
  FaRupeeSign,
  FaGraduationCap
} from 'react-icons/fa';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [jobType, setJobType] = useState('all'); // 'all', 'government', 'private'
  const [location, setLocation] = useState('all');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    // Sample job data based on your provided links
    const sampleJobs = [
      // Government Jobs
      {
        id: 1,
        title: "Assistant Librarian",
        organization: "Indian Institute of Technology (Indian School of Mines), Dhanbad",
        type: "government",
        location: "Dhanbad, Jharkhand",
        postedDate: "2024-02-26",
        lastDate: "2024-03-15",
        salary: "₹56,100 - ₹1,77,500",
        qualification: "MLISc with NET/SET",
        description: "Recruitment for Assistant Librarian and Deputy Librarian positions",
        applyUrl: "https://share.google/gnnXWw2TKjU6tsT5x",
        source: "LIS Portal",
        experience: "5-8 years",
        vacancies: 3
      },
      {
        id: 2,
        title: "Library Trainee",
        organization: "Delhi University Library System",
        type: "government",
        location: "Delhi",
        postedDate: "2024-02-25",
        lastDate: "2024-03-10",
        salary: "₹30,000 - ₹35,000",
        qualification: "MLISc",
        description: "One year training program in various sections of the library",
        applyUrl: "https://example.com/du-library-trainee",
        source: "DU Official Website",
        experience: "Freshers can apply",
        vacancies: 5
      },
      {
        id: 3,
        title: "Information Scientist",
        organization: "Indian Space Research Organisation (ISRO)",
        type: "government",
        location: "Bangalore",
        postedDate: "2024-02-24",
        lastDate: "2024-03-20",
        salary: "₹67,700 - ₹2,08,700",
        qualification: "MLISc with 60% marks",
        description: "Scientific and technical information management",
        applyUrl: "https://example.com/isro-scientist",
        source: "ISRO Careers",
        experience: "2-3 years",
        vacancies: 2
      },
      
      // Private Jobs
      {
        id: 4,
        title: "Digital Library Manager",
        organization: "Infosys Knowledge Center",
        type: "private",
        location: "Mysore",
        postedDate: "2024-02-26",
        lastDate: "2024-03-30",
        salary: "₹12 - 18 LPA",
        qualification: "MLISc + 5 years experience",
        description: "Managing digital library resources and services",
        applyUrl: "https://example.com/infosys-lib-manager",
        source: "Infosys Careers",
        experience: "5+ years",
        vacancies: 1
      },
      {
        id: 5,
        title: "Knowledge Management Specialist",
        organization: "Deloitte India",
        type: "private",
        location: "Mumbai",
        postedDate: "2024-02-23",
        lastDate: "2024-03-15",
        salary: "₹15 - 22 LPA",
        qualification: "MLISc/MBA",
        description: "Knowledge management and research services",
        applyUrl: "https://example.com/deloitte-km",
        source: "Deloitte Careers",
        experience: "3-6 years",
        vacancies: 2
      },
      {
        id: 6,
        title: "Research Librarian",
        organization: "Microsoft Research India",
        type: "private",
        location: "Bangalore",
        postedDate: "2024-02-22",
        lastDate: "2024-03-25",
        salary: "₹20 - 28 LPA",
        qualification: "MLISc + PhD preferred",
        description: "Support research teams with information needs",
        applyUrl: "https://example.com/microsoft-research",
        source: "Microsoft Careers",
        experience: "4-7 years",
        vacancies: 1
      },
      {
        id: 7,
        title: "Corporate Librarian",
        organization: "Tata Consultancy Services",
        type: "private",
        location: "Pune",
        postedDate: "2024-02-21",
        lastDate: "2024-03-18",
        salary: "₹8 - 12 LPA",
        qualification: "MLISc",
        description: "Corporate library management and research support",
        applyUrl: "https://example.com/tcs-librarian",
        source: "TCS Careers",
        experience: "2-4 years",
        vacancies: 2
      }
    ];
    
    setJobs(sampleJobs);
    setLoading(false);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = jobType === 'all' || job.type === jobType;
    const matchesLocation = location === 'all' || job.location.includes(location);
    return matchesSearch && matchesType && matchesLocation;
  });

  const locations = [...new Set(jobs.map(job => job.location.split(',').pop().trim()))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-4">
            <FaArrowLeft className="mr-2" /> Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4">Library Jobs</h1>
          <p className="text-xl opacity-90">Government and Private sector opportunities for LIS professionals</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Jobs</p>
                <p className="text-3xl font-bold text-blue-600">{jobs.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FaBriefcase className="text-2xl text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Government Jobs</p>
                <p className="text-3xl font-bold text-green-600">
                  {jobs.filter(j => j.type === 'government').length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FaBuilding className="text-2xl text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Private Jobs</p>
                <p className="text-3xl font-bold text-purple-600">
                  {jobs.filter(j => j.type === 'private').length}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FaBriefcase className="text-2xl text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <select
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
              >
                <option value="all">All Job Types</option>
                <option value="government">Government Jobs</option>
                <option value="private">Private Jobs</option>
              </select>
            </div>
            <div>
              <select
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="all">All Locations</option>
                {locations.map((loc, index) => (
                  <option key={index} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="mb-4 text-gray-600">
              Found {filteredJobs.length} jobs
            </div>
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
                          <p className="text-gray-600 mb-2 flex items-center">
                            <FaBuilding className="mr-2 text-gray-400" />
                            {job.organization}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          job.type === 'government' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-purple-100 text-purple-600'
                        }`}>
                          {job.type === 'government' ? 'Government' : 'Private'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <FaMapMarkerAlt className="mr-2 text-gray-400" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FaRupeeSign className="mr-1 text-gray-400" />
                          {job.salary}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FaGraduationCap className="mr-2 text-gray-400" />
                          {job.qualification}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FaClock className="mr-2 text-gray-400" />
                          {job.experience}
                        </div>
                      </div>
                      
                      <div className="flex items-center mt-4 text-sm">
                        <FaCalendarAlt className="mr-2 text-red-400" />
                        <span className="text-red-600">Last Date: {new Date(job.lastDate).toLocaleDateString()}</span>
                        <span className="mx-2 text-gray-300">|</span>
                        <span className="text-gray-500">Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                        <span className="mx-2 text-gray-300">|</span>
                        <span className="text-blue-600">{job.vacancies} Vacancies</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col items-end">
                      <a
                        href={job.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition flex items-center mb-2"
                      >
                        Apply Now <FaExternalLinkAlt className="ml-2 text-sm" />
                      </a>
                      <span className="text-xs text-gray-500">Source: {job.source}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* External Job Portals */}
      <div className="bg-white py-12 mt-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">External Job Portals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="https://www.lisportal.org.in/category/jobs/government-jobs-lis/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition group"
            >
              <h3 className="font-semibold text-gray-800 group-hover:text-blue-600">Government Jobs [LIS]</h3>
              <p className="text-sm text-gray-600">Latest govt jobs for librarians</p>
            </a>
            <a
              href="https://www.lisportal.org.in/category/jobs/private-jobs-lis/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition group"
            >
              <h3 className="font-semibold text-gray-800 group-hover:text-blue-600">Private Jobs [LIS]</h3>
              <p className="text-sm text-gray-600">Corporate library opportunities</p>
            </a>
            <a
              href="https://www.lisjobs.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition group"
            >
              <h3 className="font-semibold text-gray-800 group-hover:text-blue-600">LIS Jobs</h3>
              <p className="text-sm text-gray-600">International library jobs</p>
            </a>
            <a
              href="https://www.iitism.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition group"
            >
              <h3 className="font-semibold text-gray-800 group-hover:text-blue-600">IIT ISM Dhanbad</h3>
              <p className="text-sm text-gray-600">Assistant Librarian positions</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;