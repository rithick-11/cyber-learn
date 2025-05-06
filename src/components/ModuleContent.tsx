import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle, XCircle, BookOpen } from 'lucide-react';
import { Module } from '../types';
import { useAuthStore } from '../store/authStore';
import ReactMarkdown from 'react-markdown';

interface ModuleContentProps {
  module: Module;
  onComplete: () => void;
}

export function ModuleContent({ module, onComplete }: ModuleContentProps) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const { user } = useAuthStore();

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    const allCorrect = module.quiz.every((q, idx) => selectedAnswers[idx] === q.correctAnswer);
    
    if (allCorrect) {
      onComplete();
    }
  };

  const isAnswerCorrect = (questionIndex: number) => {
    return selectedAnswers[questionIndex] === module.quiz[questionIndex].correctAnswer;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      {!showQuiz ? (
        <div className="space-y-8">
          {/* Module Header */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-primary-400" />
              <h1 className="text-2xl font-bold text-white">{module.title}</h1>
            </div>
            <p className="text-primary-200">{module.description}</p>
          </div>

          {/* Module Content */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8">
            <article className="prose prose-invert max-w-none prose-headings:border-b prose-headings:border-white/10 prose-headings:pb-4 prose-headings:mb-4">
              <ReactMarkdown>{module.content}</ReactMarkdown>
            </article>
          </div>

          {/* Quiz Button */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Ready to test your knowledge?</h3>
                <p className="text-primary-200">Take a quick quiz to complete this module</p>
              </div>
              <button
                onClick={() => setShowQuiz(true)}
                className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center gap-2"
              >
                Start Quiz <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 space-y-8">
          <h2 className="text-2xl font-bold text-white pb-4 border-b border-white/10">Module Quiz</h2>
          {module.quiz.map((question, questionIndex) => (
            <div key={questionIndex} className="space-y-4">
              <p className="text-lg text-white font-medium">{`${questionIndex + 1}. ${question.question}`}</p>
              <div className="space-y-3">
                {question.options.map((option, optionIndex) => (
                  <button
                    key={optionIndex}
                    onClick={() => {
                      if (!quizSubmitted) {
                        const newAnswers = [...selectedAnswers];
                        newAnswers[questionIndex] = optionIndex;
                        setSelectedAnswers(newAnswers);
                      }
                    }}
                    className={`w-full p-4 rounded-lg text-left transition-all ${
                      selectedAnswers[questionIndex] === optionIndex
                        ? 'bg-primary-500 text-white'
                        : 'bg-white/5 text-white hover:bg-white/10'
                    } ${
                      quizSubmitted
                        ? optionIndex === question.correctAnswer
                          ? 'bg-green-500/20 border border-green-500'
                          : selectedAnswers[questionIndex] === optionIndex
                          ? 'bg-red-500/20 border border-red-500'
                          : ''
                        : ''
                    }`}
                    disabled={quizSubmitted}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-sm">
                        {String.fromCharCode(65 + optionIndex)}
                      </span>
                      {option}
                    </div>
                  </button>
                ))}
              </div>
              {quizSubmitted && (
                <div className="flex items-center mt-2 p-3 rounded-lg bg-white/5">
                  {isAnswerCorrect(questionIndex) ? (
                    <div className="flex items-center text-green-400">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Correct answer!
                    </div>
                  ) : (
                    <div className="flex items-center text-red-400">
                      <XCircle className="w-5 h-5 mr-2" />
                      The correct answer was: Option {String.fromCharCode(65 + question.correctAnswer)}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          {!quizSubmitted ? (
            <button
              onClick={handleQuizSubmit}
              disabled={selectedAnswers.length !== module.quiz.length}
              className="mt-6 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full"
            >
              Submit Quiz
            </button>
          ) : (
            <div className="mt-6 space-y-4">
              {module.quiz.every((q, idx) => isAnswerCorrect(idx)) ? (
                <div className="bg-green-500/20 border border-green-500 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-400 mb-2">Congratulations! 🎉</h3>
                  <p className="text-white">You've successfully completed this module and earned {module.xp} XP!</p>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setQuizSubmitted(false);
                    setSelectedAnswers([]);
                  }}
                  className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors w-full"
                >
                  Try Again
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}