import React, { useEffect } from 'react';

// A Twinkling Star
function Star({ size = 2, top = '10%', left = '10%', delay = 0, duration = 3 }) {
  return (
    <div
      className="space-star"
      style={{
        '--size': `${size}px`,
        '--top': top,
        '--left': left,
        '--delay': `${delay}s`,
        '--duration': `${duration}s`,
      }}
    />
  );
}

// The Floating Astronaut
function FloatingAstronaut() {
  return (
    <div className="astronaut-float">
      <svg viewBox="0 0 100 120" style={{ width: '100%', height: 'auto', display: 'block', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }}>
        {/* Oxygen Tubes */}
        <path d="M 40 50 Q 10 70 20 90" fill="none" stroke="#ccc" strokeWidth="4" strokeLinecap="round" />
        <path d="M 60 50 Q 90 70 80 90" fill="none" stroke="#ccc" strokeWidth="4" strokeLinecap="round" />
        
        {/* Backpack */}
        <rect x="25" y="35" width="50" height="40" rx="8" fill="#555" stroke="#333" strokeWidth="2" />
        
        {/* Body */}
        <rect x="35" y="40" width="30" height="45" rx="10" fill="#e0e0e0" stroke="#999" strokeWidth="2" />
        
        {/* Arms and Legs */}
        <rect x="20" y="45" width="15" height="35" rx="7" fill="#e0e0e0" stroke="#999" strokeWidth="2" transform="rotate(20 20 45)" />
        <rect x="65" y="45" width="15" height="35" rx="7" fill="#e0e0e0" stroke="#999" strokeWidth="2" transform="rotate(-20 65 45)" />
        <rect x="38" y="80" width="12" height="30" rx="6" fill="#e0e0e0" stroke="#999" strokeWidth="2" transform="rotate(10 38 80)" />
        <rect x="50" y="80" width="12" height="30" rx="6" fill="#e0e0e0" stroke="#999" strokeWidth="2" transform="rotate(-10 50 80)" />

        {/* Helmet */}
        <circle cx="50" cy="25" r="22" fill="#fff" stroke="#999" strokeWidth="3" />
        
        {/* Visor */}
        <path d="M 35 25 Q 50 15 65 25 Q 65 40 50 40 Q 35 40 35 25 Z" fill="#1a1a2e" stroke="#999" strokeWidth="2" />
        
        {/* Visor Reflection */}
        <path d="M 40 22 Q 50 18 55 22" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      </svg>
    </div>
  );
}

export default function Astronaut({ children }) {
  // 1. Change the background to deep space
  useEffect(() => {
    const stageRoot = document.querySelector('.stage-root');
    if (stageRoot) {
      const originalBg = stageRoot.style.background;
      const originalAnim = stageRoot.style.animation;

      // Deep space gradient
      stageRoot.style.setProperty('background', 'radial-gradient(circle at center, #1a1a2e 0%, #0f0f1a 60%, #000000 100%)', 'important');
      stageRoot.style.setProperty('background-size', '200% 200%', 'important');
      stageRoot.style.setProperty('animation', 'spaceDrift 30s ease-in-out infinite', 'important');

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
    <div className="astronaut-container" style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <style>{`
        @keyframes spaceDrift {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }

        /* Twinkling Stars */
        .space-star {
          position: absolute;
          top: var(--top);
          left: var(--left);
          width: var(--size);
          height: var(--size);
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 0 10px #fff, 0 0 20px #fff;
          animation: twinkle var(--duration) ease-in-out infinite alternate;
          animation-delay: var(--delay);
          z-index: 1;
        }

        @keyframes twinkle {
          0% { opacity: 0.2; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1.2); }
        }

        /* Shooting Star */
        .shooting-star {
          position: absolute;
          top: 20%;
          left: 100%;
          width: 100px;
          height: 2px;
          background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,1));
          transform: rotate(-45deg);
          animation: shoot 4s linear infinite;
          animation-delay: 2s;
          opacity: 0;
          z-index: 2;
        }

        @keyframes shoot {
          0% { transform: translateX(0) translateY(0) rotate(-45deg); opacity: 0; }
          10% { opacity: 1; }
          40% { transform: translateX(-800px) translateY(800px) rotate(-45deg); opacity: 0; }
          100% { opacity: 0; }
        }

        /* The Floating Astronaut */
        .astronaut-float {
          position: absolute;
          top: 15%;
          right: 15%;
          width: clamp(100px, 12vw, 180px);
          z-index: 5;
          animation: floatAstronaut 8s ease-in-out infinite;
        }

        @keyframes floatAstronaut {
          0%, 100% { transform: translateY(0) rotate(5deg); }
          50% { transform: translateY(-20px) rotate(-5deg); }
        }

        /* The Name Text */
        .astronaut-name-text {
          font-family: 'Jokerman', 'Cairo', system-ui, sans-serif;
          font-size: clamp(4rem, 12vw, 10rem);
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: 0.02em;
          color: #ffffff;
          position: relative;
          z-index: 10;
          margin: 0;
          /* Glowing white/blue text */
          text-shadow: 
            0 0 10px #fff,
            0 0 20px #4fc3f7,
            0 0 40px #4fc3f7,
            0 0 80px #0288d1;
          animation: nameFloat 4s ease-in-out infinite;
        }

        @keyframes nameFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>

      {/* Background Elements */}
      <div className="shooting-star" />
      
      {/* Twinkling Stars (Randomly placed) */}
      <Star size={3} top="10%" left="20%" delay={0} duration={2} />
      <Star size={2} top="30%" left="80%" delay={1} duration={4} />
      <Star size={4} top="70%" left="15%" delay={0.5} duration={3} />
      <Star size={2} top="80%" left="60%" delay={1.5} duration={2.5} />
      <Star size={3} top="40%" left="40%" delay={2} duration={5} />
      <Star size={1} top="15%" left="65%" delay={0.8} duration={3} />
      <Star size={2} top="60%" left="90%" delay={1.2} duration={4} />
      <Star size={4} top="85%" left="30%" delay={2.5} duration={2} />
      <Star size={2} top="50%" left="10%" delay={3} duration={3.5} />

      {/* The Astronaut */}
      <FloatingAstronaut />

      {/* The Name */}
      <h1 className="astronaut-name-text">{nameText}</h1>
    </div>
  );
}