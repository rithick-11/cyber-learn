import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { AlertCircle, Loader2 } from 'lucide-react';

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { signIn, signUp } = useAuthStore();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    setError('');
    
    if (!email) {
      setError('Email is required');
      return false;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (!password) {
      setError('Password is required');
      return false;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    if (!isLogin && !username) {
      setError('Username is required');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password, username);
        setCountdown(60); // Set cooldown period after signup
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      if (error.message.includes('rate limit')) {
        const secondsMatch = error.message.match(/after (\d+) seconds/);
        if (secondsMatch) {
          setCountdown(parseInt(secondsMatch[1]));
        } else {
          setCountdown(60); // Default cooldown if we can't parse the wait time
        }
      }
      setError(error.message || 'An error occurred during authentication');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto mt-10 p-6 bg-white/10 backdrop-blur-md rounded-lg"
    >
      <h2 className="text-2xl font-bold text-white mb-6">
        {isLogin ? 'Sign In' : 'Create Account'}
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-md flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-red-200 text-sm">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          type="submit"
          disabled={isSubmitting || countdown > 0}
          className={`w-full py-2 px-4 bg-primary-500 text-white rounded transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-transparent flex items-center justify-center ${
            isSubmitting || countdown > 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-600'
          }`}
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : countdown > 0 ? (
            `Please wait ${countdown}s`
          ) : (
            isLogin ? 'Sign In' : 'Sign Up'
          )}
        </button>
      </form>
      <button
        onClick={() => {
          setIsLogin(!isLogin);
          setError('');
        }}
        className="mt-4 text-primary-300 hover:text-primary-200 transition-colors"
      >
        {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
      </button>
    </motion.div>
  );
}