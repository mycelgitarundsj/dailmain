import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, ChevronRight } from 'lucide-react'

export default function Onboarding() {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    // Mark onboarding as complete
    localStorage.setItem('dailyflow_onboarding_complete', 'true')
    navigate('/')
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 30px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Floating particles background */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
              y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50,
              opacity: 0
            }}
            animate={{
              y: -50,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              borderRadius: '50%',
            }}
          />
        ))}
      </div>

      <div style={{
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        zIndex: 1,
      }}>
        {/* Main logo animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{
            type: "spring",
            damping: 15,
            stiffness: 100,
            duration: 1.2
          }}
          style={{
            marginBottom: '40px',
            textAlign: 'center',
          }}
        >
          {/* Pulsing glow effect */}
          <motion.div
            animate={{
              boxShadow: [
                '0 0 20px rgba(255, 255, 255, 0.3)',
                '0 0 40px rgba(255, 255, 255, 0.6)',
                '0 0 20px rgba(255, 255, 255, 0.3)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '60px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ fontSize: '48px' }}
            >
              ⚡
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{
              fontSize: '32px',
              fontWeight: '700',
              fontFamily: 'Poppins, sans-serif',
              marginBottom: '8px',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              color: 'white',
            }}
          >
            DailyFlow
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            style={{
              fontSize: '16px',
              opacity: 0.9,
              fontStyle: 'italic',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
              color: 'white',
              marginBottom: '20px',
            }}
          >
            ADHD Friendly To-Do List App
          </motion.p>
        </motion.div>

        {/* Welcome message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          style={{ marginBottom: '40px' }}
        >
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            fontFamily: 'Poppins, sans-serif',
            color: 'white',
            marginBottom: '16px',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          }}>
            Welcome! ✨
          </h2>
          <p style={{
            fontSize: '18px',
            color: 'white',
            opacity: 0.9,
            lineHeight: '1.5',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
            marginBottom: '24px',
          }}>
            Transform your daily tasks into a fun, rewarding experience designed for your unique brain
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginBottom: '40px',
            width: '100%',
          }}
        >
          {[
            { emoji: '🎯', text: 'Smart task prioritization' },
            { emoji: '🎡', text: 'Decision-making wheel' },
            { emoji: '📊', text: 'Progress tracking' },
            { emoji: '🧠', text: 'ADHD-friendly design' },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '12px 20px',
                borderRadius: '20px',
                gap: '12px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span style={{ fontSize: '24px' }}>{feature.emoji}</span>
              <span style={{ fontSize: '16px', fontWeight: '500', color: 'white' }}>
                {feature.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Get Started Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          onClick={handleGetStarted}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px 32px',
            borderRadius: '25px',
            border: 'none',
            backgroundColor: '#fff',
            color: '#667eea',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: '600',
            fontFamily: 'Poppins, sans-serif',
            gap: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            minWidth: '200px',
            transition: 'all 0.2s ease',
          }}
        >
          <span>Get Started! 🚀</span>
          <ChevronRight size={20} />
        </motion.button>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 1 }}
          style={{
            fontSize: '14px',
            color: 'white',
            opacity: 0.8,
            fontStyle: 'italic',
            marginTop: '24px',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
          }}
        >
          "Different brains, amazing results" ✨
        </motion.p>
      </div>

      {/* Bottom decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          display: 'flex',
          gap: '20px',
        }}
      >
        {['🎯', '🌟', '💪', '🚀', '✨'].map((emoji, index) => (
          <motion.div
            key={emoji}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.2,
              repeatType: "reverse"
            }}
            style={{
              fontSize: '24px',
              opacity: 0.7,
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}