import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { topics } from './data/topics';
import { Auth } from './components/Auth';
import { TopicPage } from './components/TopicPage';
import { Profile } from './components/Profile';
import { useAuthStore } from './store/authStore';

function App() {
  const { user, signOut } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900">
        {/* Header */}
        <header className="bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Shield className="w-8 h-8 text-primary-400" />
              </motion.div>
              <h1 className="text-2xl font-bold text-white">CyberLearn</h1>
            </Link>
            <nav>
              <ul className="flex space-x-6 text-white">
                <li><Link to="/" className="hover:text-primary-400 transition-colors">Dashboard</Link></li>
                {user ? (
                  <>
                    <li><Link to="/profile" className="hover:text-primary-400 transition-colors">Profile</Link></li>
                    <li>
                      <button
                        onClick={() => signOut()}
                        className="hover:text-primary-400 transition-colors"
                      >
                        Sign Out
                      </button>
                    </li>
                  </>
                ) : (
                  <li><Link to="/auth" className="hover:text-primary-400 transition-colors">Sign In</Link></li>
                )}
              </ul>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/topic/:topicId" element={<TopicPage />} />
            <Route path="/" element={
              <>
                {/* Hero Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-4xl font-bold text-white mb-4">Master Cybersecurity Through Play</h2>
                  <p className="text-primary-200 text-lg max-w-2xl mx-auto">
                    Embark on an exciting journey to become a cybersecurity expert. Learn through interactive challenges,
                    earn achievements, and build real-world skills.
                  </p>
                </motion.div>

                {/* Topics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {topics.map((topic, index) => (
                    <motion.div
                      key={topic.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/10 backdrop-blur-md rounded-lg p-6 hover:bg-white/20 transition-colors cursor-pointer"
                      onClick={() => window.location.href = `/topic/${topic.id}`}
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="bg-primary-500 p-3 rounded-lg">
                          <Shield className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">{topic.title}</h3>
                      </div>
                      <p className="text-primary-200 mb-4">{topic.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="h-2 w-24 bg-white/20 rounded-full">
                            <div
                              className="h-full bg-primary-500 rounded-full"
                              style={{ width: `${topic.progress}%` }}
                            />
                          </div>
                          <span className="ml-2 text-primary-200">{topic.progress}%</span>
                        </div>
                        <span className="text-primary-400">{topic.modules.length} modules</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;