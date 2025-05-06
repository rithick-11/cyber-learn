import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Award } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export function Profile() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* User Stats */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Profile</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {user.username[0].toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">{user.username}</h3>
                <p className="text-primary-200">Level {user.level}</p>
              </div>
            </div>
            <div className="pt-4">
              <div className="flex justify-between text-primary-200 mb-2">
                <span>Experience</span>
                <span>{user.xp} XP</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full">
                <div
                  className="h-full bg-primary-500 rounded-full"
                  style={{ width: `${(user.xp % 1000) / 10}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Achievements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 p-4 rounded-lg"
            >
              <Trophy className="w-8 h-8 text-yellow-400 mb-2" />
              <h3 className="text-lg font-semibold text-white">First Steps</h3>
              <p className="text-primary-200 text-sm">Complete your first module</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 p-4 rounded-lg"
            >
              <Star className="w-8 h-8 text-purple-400 mb-2" />
              <h3 className="text-lg font-semibold text-white">Knowledge Seeker</h3>
              <p className="text-primary-200 text-sm">Reach Level 5</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 p-4 rounded-lg"
            >
              <Award className="w-8 h-8 text-blue-400 mb-2" />
              <h3 className="text-lg font-semibold text-white">Expert</h3>
              <p className="text-primary-200 text-sm">Complete all modules in a topic</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}