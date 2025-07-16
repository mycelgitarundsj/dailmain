import React, { useState, useEffect } from 'react'

const Onboarding: React.FC = () => {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleGetStarted = () => {
    localStorage.setItem('onboardingCompleted', 'true')
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <svg 
              width="120" 
              height="120" 
              viewBox="0 0 120 120" 
              className="drop-shadow-lg"
            >
              {/* Rounded square background */}
              <rect 
                x="10" 
                y="10" 
                width="100" 
                height="100" 
                rx="20" 
                ry="20" 
                fill="#F5F5F0"
                className="drop-shadow-md"
              />
              
              {/* Clock circle with gradient */}
              <defs>
                <radialGradient id="clockGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#4ECDC4" />
                  <stop offset="100%" stopColor="#1E5F5F" />
                </radialGradient>
              </defs>
              
              <circle 
                cx="60" 
                cy="60" 
                r="35" 
                fill="url(#clockGradient)"
                stroke="#4ECDC4"
                strokeWidth="2"
              />
              
              {/* Clock markers */}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((hour) => {
                const angle = (hour * 30 - 90) * (Math.PI / 180)
                const x1 = 60 + Math.cos(angle) * 28
                const y1 = 60 + Math.sin(angle) * 28
                const x2 = 60 + Math.cos(angle) * (hour % 3 === 0 ? 22 : 25)
                const y2 = 60 + Math.sin(angle) * (hour % 3 === 0 ? 22 : 25)
                
                return (
                  <line
                    key={hour}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="white"
                    strokeWidth={hour % 3 === 0 ? "3" : "2"}
                    strokeLinecap="round"
                  />
                )
              })}
              
              {/* Clock hands */}
              <g className="animate-spin" style={{ transformOrigin: '60px 60px', animationDuration: '8s' }}>
                {/* Hour hand */}
                <line
                  x1="60"
                  y1="60"
                  x2="60"
                  y2="40"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                
                {/* Minute hand */}
                <line
                  x1="60"
                  y1="60"
                  x2="75"
                  y2="35"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </g>
              
              {/* Center dot */}
              <circle 
                cx="60" 
                cy="60" 
                r="4" 
                fill="white"
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className={`transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-4xl font-bold text-white mb-4">DailyFlow</h1>
          <p className="text-xl text-white/90 mb-8 max-w-md mx-auto">
            Welcome to your ADHD-friendly task management companion
          </p>
          
          <button
            onClick={handleGetStarted}
            className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get Started
          </button>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-white/30 rounded-full"></div>
            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
            <div className="w-2 h-2 bg-white/30 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Onboarding