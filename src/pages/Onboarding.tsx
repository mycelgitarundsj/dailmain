import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

export default function Onboarding() {
  // Remove navigate since we're not using routing for onboarding anymore

  const handleGetStarted = () => {
    // Mark onboarding as complete
    localStorage.setItem('dailyflow_onboarding_complete', 'true')
    // Reload the page to trigger the App component to re-check onboarding status
    window.location.reload()
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

        {/* Get Started Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          onClick={handleGetStarted}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px 32px',
            borderRadius: '25px',
            border: 'none',
            overflow: 'hidden',
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
          transition={{ delay: 1.4, duration: 1 }}
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
          <svg
            width="80"
            height="80"
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
          >
            {/* Rounded square background */}
            <rect width="512" height="512" rx="120" fill="rgba(245, 245, 240, 0.9)"/>
            
            {/* Outer teal ring */}
            <circle cx="256" cy="256" r="200" fill="#4ECDC4" opacity="0.4"/>
            
            {/* Main clock circle with gradient */}
            <defs>
              <radialGradient id="clockGradientOnboarding" cx="0.3" cy="0.3" r="0.8">
                <stop offset="0%" stopColor="#4ECDC4"/>
                <stop offset="50%" stopColor="#2E8B8B"/>
                <stop offset="100%" stopColor="#1E5F5F"/>
              </radialGradient>
            </defs>
            
            <circle cx="256" cy="256" r="180" fill="url(#clockGradientOnboarding)"/>
            
            {/* Clock hour markers */}
            <g stroke="white" strokeWidth="8" strokeLinecap="round">
              <line x1="256" y1="96" x2="256" y2="126"/>
              <line x1="331" y1="125" x2="318" y2="148"/>
              <line x1="387" y1="181" x2="364" y2="194"/>
              <line x1="416" y1="256" x2="386" y2="256"/>
              <line x1="387" y1="331" x2="364" y2="318"/>
              <line x1="331" y1="387" x2="318" y2="364"/>
              <line x1="256" y1="416" x2="256" y2="386"/>
              <line x1="181" y1="387" x2="194" y2="364"/>
              <line x1="125" y1="331" x2="148" y2="318"/>
              <line x1="96" y1="256" x2="126" y2="256"/>
              <line x1="125" y1="181" x2="148" y2="194"/>
              <line x1="181" y1="125" x2="194" y2="148"/>
            </g>
            
            {/* Animated clock hands */}
            <motion.g 
              stroke="white" 
              strokeLinecap="round"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: '256px 256px' }}
            >
              <line x1="256" y1="256" x2="206" y2="206" strokeWidth="12"/>
              <line x1="256" y1="256" x2="331" y2="181" strokeWidth="8"/>
            </motion.g>
            
            {/* Center dot */}
            <circle cx="256" cy="256" r="12" fill="white"/>
          </svg>
        ))}
      </motion.div>
    </div>
  )
}