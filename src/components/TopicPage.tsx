import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { topics } from '../data/topics';
import { useAuthStore } from '../store/authStore';
import { ModuleContent } from './ModuleContent';
import { supabase } from '../lib/supabase';

export function TopicPage() {
  const { topicId } = useParams();
  const { user } = useAuthStore();
  const topic = topics.find(t => t.id === topicId);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  if (!topic) return <div>Topic not found</div>;

  const handleModuleComplete = async (moduleId: string) => {
    if (!user) return;

    try {
      // Update user's completed modules and XP in the database
      const module = topic.modules.find(m => m.id === moduleId);
      if (!module) return;

      const { error } = await supabase
        .from('users')
        .update({
          completed_modules: [...(user.completedModules || []), moduleId],
          xp: (user.xp || 0) + module.xp
        })
        .eq('id', user.id);

      if (error) throw error;

      // Update local state
      useAuthStore.getState().loadUser();
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {selectedModule ? (
        <>
          <button
            onClick={() => setSelectedModule(null)}
            className="mb-6 text-primary-400 hover:text-primary-300 transition-colors"
          >
            ← Back to Topic
          </button>
          <ModuleContent
            module={topic.modules.find(m => m.id === selectedModule)!}
            onComplete={() => handleModuleComplete(selectedModule)}
          />
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md rounded-lg p-8"
        >
          <h1 className="text-3xl font-bold text-white mb-6">{topic.title}</h1>
          <p className="text-primary-200 mb-8">{topic.description}</p>
          
          <div className="space-y-6">
            {topic.modules.map((module) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  {module.title}
                </h3>
                <p className="text-primary-200 mb-4">{module.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary-400">XP: {module.xp}</span>
                  {user?.completedModules?.includes(module.id) ? (
                    <span className="text-green-400">Completed</span>
                  ) : (
                    <button
                      onClick={() => setSelectedModule(module.id)}
                      className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
                    >
                      Start Module
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}