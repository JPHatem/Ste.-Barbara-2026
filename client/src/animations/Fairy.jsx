import React, { useEffect, useState } from 'react';

export default function Fairy({ children }) {
  const [hasAppeared, setHasAppeared] = useState(false);
  const [isShining, setIsShining] = useState(false);

  // 1. Change the background to a magical fairy gradient
  useEffect(() => {
    const stageRoot = document.querySelector('.stage-root');
    if (stageRoot) {
      const originalBg = stageRoot.style.background;
      const originalAnim = stageRoot.style.animation;

      stageRoot.style.setProperty('background', 'linear-gradient(135deg, #ffffff 0%, #fff8e1 50%, #ffd700 100%)', 'important');
      stageRoot.style.setProperty('background-size', '400% 400%', 'important');
      stageRoot.style.setProperty('animation', 'gradientShift 15s ease-in-out infinite', 'important');

      return () => {
        stageRoot.style.background = originalBg;
        stageRoot.style.animation = originalAnim;
      };
    }
  }, []);

  // 2. Handle the timing of the wand and the name
  useEffect(() => {
    const appearTimer = setTimeout(() => {
      setHasAppeared(true);
    }, 1500);

    const shineInterval = setInterval(() => {
      setIsShining(true);
      setTimeout(() => setIsShining(false), 1000);
    }, 4000);

    return () => {
      clearTimeout(appearTimer);
      clearInterval(shineInterval);
    };
  }, []);

  let nameText = '';
  if (typeof children === 'string') {
    nameText = children;
  } else if (React.isValidElement(children)) {
    nameText = children.props.children; 
  }

  return (
    <div className="fairy-container" style={{ position: 'relative', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <style>{`
        /* The Magic Wand */
        .fairy-wand {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 150px;
          z-index: 20;
          /* The animation defined below controls the movement */
          animation: wandMove 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        @keyframes wandMove {
          0% { transform: translate(-50%, -50%) rotate(0deg) scale(0.5); opacity: 0; }
          20% { opacity: 1; }
          /* Shake in the center */
          25% { transform: translate(-50%, -50%) rotate(-15deg); }
          35% { transform: translate(-50%, -50%) rotate(15deg); }
          45% { transform: translate(-50%, -50%) rotate(-15deg); }
          55% { transform: translate(-50%, -50%) rotate(15deg); }
          /* Fly to the left side of the screen */
          100% { left: 10%; transform: translate(0, -50%) rotate(20deg) scale(0.8); opacity: 1; }
        }

        /* The Wand Shake (repeating) */
        .fairy-wand-shake {
          animation: wandShake 2s ease-in-out infinite;
          transform-origin: bottom center;
        }

        @keyframes wandShake {
          0%, 100% { transform: rotate(0deg); }
          10% { transform: rotate(-5deg); }
          20% { transform: rotate(5deg); }
          30% { transform: rotate(-5deg); }
          40% { transform: rotate(5deg); }
          50% { transform: rotate(0deg); }
        }

        /* The Name Text */
        .fairy-name-text {
          font-family: 'Jokerman', 'Cairo', system-ui, sans-serif;
          font-size: clamp(4rem, 12vw, 10rem);
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: 0.02em;
          color: #2e7d32;
          position: relative;
          z-index: 10;
          margin: 0;
          text-shadow: 0 4px 10px rgba(0,0,0,0.1);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .fairy-name-text.appeared {
          opacity: 1;
          transform: translateY(0);
        }

        /* The Shine Effect */
        .fairy-name-text.shining {
          animation: nameShine 1s ease-in-out forwards;
        }

        @keyframes nameShine {
          0% { text-shadow: 0 4px 10px rgba(0,0,0,0.1); color: #2e7d32; }
          50% { text-shadow: 0 0 30px #ffd700, 0 0 50px #ffd700; color: #fffde7; }
          100% { text-shadow: 0 4px 10px rgba(0,0,0,0.1); color: #2e7d32; }
        }
      `}</style>

      {/* The Magic Wand */}
      <div className="fairy-wand">
        <div className={hasAppeared ? 'fairy-wand-shake' : ''}>
          <svg viewBox="0 0 100 200" style={{ width: '100%', height: 'auto', display: 'block' }}>
            {/* Wand Handle */}
            <rect x="45" y="50" width="10" height="150" rx="5" fill="#8d6e63" />
            <rect x="47" y="50" width="4" height="150" fill="#a1887f" />
            
            {/* Star at the top */}
            <g transform="translate(50, 40)">
              <path 
                d="M 0 -35 L 10 -10 L 35 -10 L 15 5 L 20 30 L 0 15 L -20 30 L -15 5 L -35 -10 L -10 -10 Z" 
                fill="#ffd700" 
                stroke="#fbc02d" 
                strokeWidth="2" 
              />
              {/* Star Glow */}
              <circle cx="0" cy="0" r="40" fill="#ffd700" opacity="0.3" filter="blur(5px)" />
            </g>
          </svg>
        </div>
      </div>

      {/* The Name */}
      <h1 className={`fairy-name-text ${hasAppeared ? 'appeared' : ''} ${isShining ? 'shining' : ''}`}>
        {nameText}
      </h1>
    </div>
  );
}