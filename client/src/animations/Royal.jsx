import React, { useEffect } from 'react';

export default function Royal({ children, type = 'princess' }) {
  // Determine if it's a girl or boy
  const isGirl = type.includes('princess') || type.includes('girl');

  // 1. Set the specific colors based on gender
  const colors = isGirl
    ? { 
        primary: '#ff4d94', 
        secondary: '#ffd700', 
        glow: 'rgba(255, 77, 148, 0.6)',
        bgGradient: 'linear-gradient(135deg, #ffe6f0 0%, #ffb6d9 50%, #ff4d94 100%)', // Pink theme
        nameColor: '#d81b60'
      } 
    : { 
        primary: '#1e3a8a', 
        secondary: '#c0c0c0', 
        glow: 'rgba(30, 58, 138, 0.6)',
        bgGradient: 'linear-gradient(135deg, #e6f0ff 0%, #8cb4ff 50%, #1e3a8a 100%)', // Blue theme
        nameColor: '#1a237e'
      };

  // 2. Inject a global background change when this component mounts
  useEffect(() => {
    const stageRoot = document.querySelector('.stage-root');
    if (stageRoot) {
      // Save the original background to restore later
      const originalBg = stageRoot.style.background;
      
      // Apply the new gradient
      stageRoot.style.background = colors.bgGradient;
      stageRoot.style.backgroundSize = '400% 400%';

      return () => {
        // Restore the original background when the costume goes away
        stageRoot.style.background = originalBg;
      };
    }
  }, [colors.bgGradient]);

  // Extract the name text from children
  let nameText = '';
  if (typeof children === 'string') {
    nameText = children;
  } else if (React.isValidElement(children)) {
    nameText = children.props.children; 
  }

  return (
    <div className="royal-container">
      <style>{`
        .royal-container {
          position: relative;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          padding-top: 60px;
        }

        .royal-name-wrapper {
          position: relative;
          display: inline-block;
        }

        .royal-first-letter {
          position: relative;
          display: inline-block;
        }

        .royal-crown-svg {
          position: absolute;
          top: -35px; 
          left: 50%;
          transform: translateX(-50%);
          width: clamp(50px, 8vw, 100px);
          height: auto;
          z-index: 10;
          animation: crownFall 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          filter: drop-shadow(0 0 15px ${colors.glow});
        }

        @keyframes crownFall {
          0% { transform: translate(-50%, -400px) rotate(-20deg); opacity: 0; }
          60% { transform: translate(-50%, 5px) rotate(5deg); opacity: 1; }
          80% { transform: translate(-50%, -5px) rotate(-2deg); }
          100% { transform: translate(-50%, 0) rotate(0deg); opacity: 1; }
        }

        .royal-name-text {
          font-family: 'Jokerman', 'Cairo', system-ui, sans-serif;
          font-size: clamp(4rem, 12vw, 10rem);
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: 0.02em;
          color: ${colors.nameColor}; /* Change text color to match theme */
          position: relative;
          z-index: 5;
          animation: nameFadeIn 1s ease-out forwards;
          margin: 0;
          text-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        @keyframes nameFadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .royal-sparkles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 4;
          overflow: visible;
        }

        .sparkle {
          position: absolute;
          width: 12px;
          height: 12px;
          background: ${colors.secondary};
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
          opacity: 0;
          animation: floatUp 2.5s infinite ease-in-out;
        }

        .sparkle:nth-child(1) { left: 10%; animation-delay: 0s; }
        .sparkle:nth-child(2) { left: 30%; animation-delay: 0.5s; }
        .sparkle:nth-child(3) { left: 50%; animation-delay: 0.2s; }
        .sparkle:nth-child(4) { left: 70%; animation-delay: 0.8s; }
        .sparkle:nth-child(5) { left: 90%; animation-delay: 0.4s; }

        @keyframes floatUp {
          0% { transform: translateY(50px) scale(0); opacity: 0; }
          50% { transform: translateY(0px) scale(1.2); opacity: 1; }
          100% { transform: translateY(-50px) scale(0); opacity: 0; }
        }
      `}</style>

      <div className="royal-name-wrapper">
        <div className="royal-sparkles">
          <div className="sparkle" />
          <div className="sparkle" />
          <div className="sparkle" />
          <div className="sparkle" />
          <div className="sparkle" />
        </div>

        <svg className="royal-crown-svg" viewBox="0 0 100 70" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`crownGrad-${isGirl ? 'girl' : 'boy'}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.secondary} />
              <stop offset="100%" stopColor={colors.primary} />
            </linearGradient>
          </defs>
          
          <path
            d="M 10 60 L 90 60 L 85 30 L 70 45 L 50 15 L 30 45 L 15 30 Z"
            fill={`url(#crownGrad-${isGirl ? 'girl' : 'boy'})`}
            stroke="#fff"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="25" r="4" fill="#fff" />
          <circle cx="20" cy="40" r="3" fill="#fff" />
          <circle cx="80" cy="40" r="3" fill="#fff" />
          <rect x="10" y="60" width="80" height="6" rx="3" fill={colors.primary} stroke="#fff" strokeWidth="1" />
        </svg>

        <h1 className="royal-name-text">
          {nameText.length > 0 && (
            <>
              <span className="royal-first-letter">{nameText.charAt(0)}</span>
              {nameText.slice(1)}
            </>
          )}
        </h1>
      </div>
    </div>
  );
}