import React, { useEffect } from 'react';

function FlyingHero({ size = 30, delay = 0, duration = 4, startX = '20%' }) {
  return (
    <div 
      className="flying-hero"
      style={{
        '--size': `${size}px`,
        '--delay': `${delay}s`,
        '--duration': `${duration}s`,
        '--startX': startX,
      }}
    >
      <svg viewBox="0 0 50 50" style={{ width: '100%', height: '100%', display: 'block' }}>
        <path d="M 15 20 Q 5 30 10 45 L 20 35 Z" fill="#e74c3c" />
        <path d="M 15 15 L 25 15 L 30 35 L 20 35 Z" fill="#1e3a8a" />
        <path d="M 15 15 L 5 5 L 10 2 L 20 12 Z" fill="#1e3a8a" />
        <circle cx="20" cy="10" r="5" fill="#ffccbc" />
        <path d="M 15 8 L 25 8 L 23 12 L 17 12 Z" fill="#111" />
      </svg>
    </div>
  );
}

export default function Superhero({ children }) {
  useEffect(() => {
    const stageRoot = document.querySelector('.stage-root');
    if (stageRoot) {
      // 1. Force the background to be Red & Blue
      stageRoot.style.setProperty('background', 'linear-gradient(180deg, #1e3a8a 0%, #3b82f6 40%, #e74c3c 80%, #991b1b 100%)', 'important');
      stageRoot.style.setProperty('background-size', '100% 400%', 'important');
      
      // 2. Kill the old green animation and apply the new skyRise animation
      stageRoot.style.setProperty('animation', 'skyRise 10s linear infinite', 'important');

      return () => {
        // Clean up and restore the default green background when the child leaves
        stageRoot.style.removeProperty('background');
        stageRoot.style.removeProperty('background-size');
        stageRoot.style.removeProperty('animation');
      };
    }
  }, []);

  let nameText = '';
  if (typeof children === 'string') {
    nameText = children;
  } else if (React.isValidElement(children)) {
    nameText = children.props.children; 
  }

  return (
    <div className="superhero-container" style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      <style>{`
        @keyframes skyRise {
          0% { background-position: 50% 100%; }
          100% { background-position: 50% 0%; }
        }

        .speed-line {
          position: absolute;
          bottom: -100px;
          width: 4px;
          height: 100px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 4px;
          animation: shootUp 1s linear infinite;
          pointer-events: none;
          z-index: 2;
        }

        .speed-line:nth-child(1) { left: 10%; animation-delay: 0.2s; height: 150px; }
        .speed-line:nth-child(2) { left: 30%; animation-delay: 0.5s; height: 80px; }
        .speed-line:nth-child(3) { left: 50%; animation-delay: 0.1s; height: 200px; width: 6px; }
        .speed-line:nth-child(4) { left: 70%; animation-delay: 0.8s; height: 120px; }
        .speed-line:nth-child(5) { left: 90%; animation-delay: 0.4s; height: 180px; }

        @keyframes shootUp {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(-120vh); opacity: 0; }
        }

        .flying-hero {
          position: absolute;
          bottom: 10%;
          left: var(--startX);
          width: var(--size);
          height: var(--size);
          z-index: 3;
          animation: heroFlyUp var(--duration) linear infinite;
          animation-delay: var(--delay);
          filter: drop-shadow(0 5px 15px rgba(0,0,0,0.5));
          pointer-events: none;
        }

        @keyframes heroFlyUp {
          0% { transform: translateY(0) scale(0.8) rotate(-10deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-110vh) scale(1.2) rotate(-10deg); opacity: 0; }
        }

        .superhero-name-text {
          font-family: 'Jokerman', 'Cairo', system-ui, sans-serif;
          font-size: clamp(4rem, 14vw, 11rem);
          font-weight: 900;
          line-height: 1.1;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #fff;
          position: relative;
          z-index: 10;
          margin: 0;
          text-shadow: 
            4px 4px 0px #1e3a8a,
            -2px -2px 0px #1e3a8a,
            2px -2px 0px #1e3a8a,
            -2px 2px 0px #1e3a8a,
            0 10px 20px rgba(0,0,0,0.8);
          animation: heroDrop 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        @keyframes heroDrop {
          0% { transform: translateY(-300px) scale(1.5); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>

      <div className="speed-line" />
      <div className="speed-line" />
      <div className="speed-line" />
      <div className="speed-line" />
      <div className="speed-line" />

      <FlyingHero size={40} delay={0} duration={3} startX="15%" />
      <FlyingHero size={25} delay={1.5} duration={4} startX="80%" />
      <FlyingHero size={50} delay={0.8} duration={5} startX="45%" />

      <h1 className="superhero-name-text">{nameText}</h1>
    </div>
  );
}