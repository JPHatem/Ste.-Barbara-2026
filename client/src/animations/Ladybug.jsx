import React, { useEffect } from 'react';

function TinyLadybug({ size = 20, delay = 0, duration = 6, startX = '10%' }) {
  return (
    <div 
      className="flying-ladybug"
      style={{
        '--size': `${size}px`,
        '--delay': `${delay}s`,
        '--duration': `${duration}s`,
        '--startX': startX,
      }}
    >
      <svg viewBox="0 0 30 30" style={{ width: '100%', height: '100%', display: 'block' }}>
        <ellipse cx="10" cy="15" rx="9" ry="12" fill="#e74c3c" stroke="#111" strokeWidth="1.5" transform="rotate(-15 10 15)" />
        <ellipse cx="20" cy="15" rx="9" ry="12" fill="#e74c3c" stroke="#111" strokeWidth="1.5" transform="rotate(15 20 15)" />
        <circle cx="8" cy="10" r="2" fill="#111" />
        <circle cx="12" cy="18" r="2.5" fill="#111" />
        <circle cx="22" cy="10" r="2" fill="#111" />
        <circle cx="18" cy="18" r="2.5" fill="#111" />
        <circle cx="15" cy="5" r="4" fill="#111" />
        <path d="M 13 2 Q 10 -2 8 1" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 17 2 Q 20 -2 22 1" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function Ladybug({ children }) {
  // 1. Try to find the root element to change the background
  useEffect(() => {
    // Look for the stage root class
    const stageRoot = document.querySelector('.stage-root');
    
    if (stageRoot) {
      // Save the existing animation and background
      const originalBg = stageRoot.style.background;
      const originalAnim = stageRoot.style.animation;
      
      // Apply the new Ladybug gradient
      stageRoot.style.background = 'linear-gradient(135deg, #ffffff 0%, #e74c3c 30%, #111111 60%, #e74c3c 80%, #ffffff 100%)';
      stageRoot.style.backgroundSize = '400% 400%';
      
      // Keep the gradient shifting animation
      stageRoot.style.animation = 'gradientShift 15s ease-in-out infinite';

      return () => {
        // Clean up: restore original when child leaves
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
    <div className="ladybug-container" style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <style>{`
        /* Flying Ladybugs Over the Wheat */
        .flying-ladybug {
          position: absolute;
          bottom: 5%; /* Positioned slightly above the very bottom */
          left: var(--startX);
          width: var(--size);
          height: var(--size);
          z-index: 10;
          animation: bugFly var(--duration) ease-in-out infinite alternate;
          animation-delay: var(--delay);
          filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4));
          pointer-events: none;
        }

        @keyframes bugFly {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(30px, -40px) rotate(15deg); }
          50% { transform: translate(-20px, -80px) rotate(-15deg); }
          75% { transform: translate(-50px, -30px) rotate(10deg); }
          100% { transform: translate(20px, -100px) rotate(-10deg); }
        }

        /* The Name Text */
        .ladybug-name-text {
          font-family: 'Jokerman', 'Cairo', system-ui, sans-serif;
          font-size: clamp(4rem, 12vw, 10rem);
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: 0.02em;
          color: #ffffff;
          position: relative;
          z-index: 20;
          margin: 0;
          text-shadow: 0 4px 15px rgba(0,0,0,0.8), 0 0 20px #e74c3c;
          animation: ladybugNamePop 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        @keyframes ladybugNamePop {
          0% { opacity: 0; transform: scale(0.5) rotate(-5deg); }
          60% { opacity: 1; transform: scale(1.05) rotate(2deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
      `}</style>

      {/* Render the name */}
      <h1 className="ladybug-name-text">{nameText}</h1>

      {/* Render 6 random flying ladybugs at the bottom */}
      <TinyLadybug size={30} delay={0} duration={7} startX="10%" />
      <TinyLadybug size={20} delay={1.5} duration={9} startX="25%" />
      <TinyLadybug size={35} delay={0.8} duration={6} startX="40%" />
      <TinyLadybug size={15} delay={2.2} duration={8} startX="55%" />
      <TinyLadybug size={25} delay={0.3} duration={10} startX="70%" />
      <TinyLadybug size={28} delay={3} duration={7.5} startX="85%" />
    </div>
  );
}