import React, { useEffect } from 'react';

function PirateShip({ scale = 1, bottom = '80px', duration = 4, delay = 0, speed = 30 }) {
  return (
    <div 
      className="pirate-ship-wrapper"
      style={{ 
        bottom, 
        animationDuration: `${speed}s`,
        animationDelay: `${delay}s`
      }}
    >
      <div 
        className="pirate-ship-bob" 
        style={{ 
          transform: `scale(${scale})`, 
          animationDuration: `${duration}s` 
        }}
      >
        <svg viewBox="0 0 200 150" style={{ width: '100%', height: 'auto', display: 'block' }}>
          {/* Ship Hull */}
          <path d="M 20 100 L 180 100 L 150 140 L 50 140 Z" fill="#5d4037" stroke="#3e2723" strokeWidth="3" />
          <rect x="20" y="95" width="160" height="8" fill="#8d6e63" rx="2" />
          
          {/* Masts */}
          <rect x="60" y="20" width="6" height="75" fill="#3e2723" />
          <rect x="130" y="40" width="6" height="55" fill="#3e2723" />
          
          {/* Sails */}
          <path d="M 66 30 Q 110 20 110 70 L 66 70 Z" fill="#f5f5f5" stroke="#ccc" strokeWidth="1" />
          <path d="M 136 50 Q 170 40 170 80 L 136 80 Z" fill="#f5f5f5" stroke="#ccc" strokeWidth="1" />
          
          {/* Skull and Crossbones on Sail */}
          <circle cx="88" cy="50" r="8" fill="#111" />
          <circle cx="85" cy="48" r="2" fill="#fff" />
          <circle cx="91" cy="48" r="2" fill="#fff" />
          <line x1="78" y1="60" x2="98" y2="60" stroke="#111" strokeWidth="3" />
          <line x1="98" y1="58" x2="78" y2="62" stroke="#111" strokeWidth="3" />
        </svg>
      </div>
    </div>
  );
}

export default function Pirate({ children }) {
  useEffect(() => {
    const stageRoot = document.querySelector('.stage-root');
    if (stageRoot) {
      const originalBg = stageRoot.style.background;
      const originalAnim = stageRoot.style.animation;

      // 1. Changed to Navy Blue and White gradient
      stageRoot.style.setProperty('background', 'linear-gradient(180deg, #ffffff 0%, #e0e7ff 30%, #0a192f 70%, #020c1b 100%)', 'important');
      stageRoot.style.setProperty('background-size', '100% 400%', 'important');
      stageRoot.style.setProperty('animation', 'oceanShift 20s ease-in-out infinite', 'important');

      return () => {
        stageRoot.style.background = originalBg;
        stageRoot.style.animation = originalAnim;
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
    <div className="pirate-container" style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <style>{`
        @keyframes oceanShift {
          0% { background-position: 50% 100%; }
          100% { background-position: 50% 0%; }
        }

        /* The Rolling Waves */
        .ocean-wave {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 200%;
          height: 150px;
          background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg"><path fill="%230a192f" fill-opacity="0.8" d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,149.3C672,139,768,149,864,165.3C960,181,1056,203,1152,192C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>');
          background-size: 50% 100%;
          background-repeat: repeat-x;
          animation: waveMove 8s linear infinite;
          z-index: 2;
        }

        .ocean-wave:nth-child(2) {
          bottom: 20px;
          opacity: 0.6;
          animation: waveMove 12s linear infinite reverse;
          z-index: 3;
        }

        @keyframes waveMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Ship Drifting Across Screen */
        .pirate-ship-wrapper {
          position: absolute;
          left: -300px;
          width: 200px;
          z-index: 4;
          animation: shipDrift linear infinite;
        }

        @keyframes shipDrift {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(100vw + 400px)); }
        }

        /* Ship Bobbing */
        .pirate-ship-bob {
          animation: shipFloat ease-in-out infinite;
          transform-origin: bottom center;
        }

        @keyframes shipFloat {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }

        /* The Fog Reveal for the Name */
        .pirate-name-text {
          font-family: 'Jokerman', 'Cairo', system-ui, sans-serif;
          font-size: clamp(4rem, 12vw, 10rem);
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: 0.02em;
          color: #f1c40f;
          position: relative;
          z-index: 10;
          margin: 0;
          text-shadow: 0 0 20px rgba(0,0,0,0.8), 4px 4px 0px #000;
          animation: fogReveal 3s ease-out forwards;
        }

        @keyframes fogReveal {
          0% { opacity: 0; filter: blur(20px); transform: scale(1.1); }
          100% { opacity: 1; filter: blur(0px); transform: scale(1); }
        }
      `}</style>

      {/* Ocean Waves */}
      <div className="ocean-wave" />
      <div className="ocean-wave" />

      {/* Multiple Ships moving across the screen */}
      <PirateShip scale={0.6} bottom="110px" duration={5} delay={0} speed={45} />
      <PirateShip scale={0.8} bottom="70px" duration={4.5} delay={5} speed={35} />
      <PirateShip scale={1} bottom="30px" duration={3.5} delay={15} speed={25} />

      {/* The Name Reveal */}
      <h1 className="pirate-name-text">{nameText}</h1>
    </div>
  );
}