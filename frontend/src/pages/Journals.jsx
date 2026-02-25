import React from 'react';
import { FaExternalLinkAlt, FaBookOpen, FaUniversity, FaFlask } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Journals = () => {
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

        {/* Journals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {journals.map((journal, index) => (
            <motion.a
              key={index}
              href={journal.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
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
          ))}
        </div>

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