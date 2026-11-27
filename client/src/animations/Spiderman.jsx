import React, { useEffect } from 'react';

function HangingSpider({ delay = 0, startX = '20%', dropHeight = '40%' }) {
  return (
    <div 
      className="hanging-spider"
      style={{
        '--delay': `${delay}s`,
        '--startX': startX,
        '--dropHeight': dropHeight,
      }}
    >
      <div className="spider-web-line" />
      <svg viewBox="0 0 40 40" className="spider-svg">
        <path d="M 20 20 Q 10 10 5 15 M 20 20 Q 15 5 10 8 M 20 20 Q 30 10 35 15 M 20 20 Q 25 5 30 8 M 20 20 Q 8 25 3 30 M 20 20 Q 12 35 8 32 M 20 20 Q 32 25 37 30 M 20 20 Q 28 35 32 32" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="20" cy="22" rx="6" ry="8" fill="#111" />
        <circle cx="20" cy="15" r="4" fill="#111" />
      </svg>
    </div>
  );
}

export default function Spiderman({ children }) {
  useEffect(() => {
    const stageRoot = document.querySelector('.stage-root');
    if (stageRoot) {
      const originalBg = stageRoot.style.background;
      const originalAnim = stageRoot.style.animation;

      // 1. Set the Red & Blue gradient
      stageRoot.style.setProperty('background', 'linear-gradient(135deg, #1e3a8a 0%, #111111 50%, #991b1b 100%)', 'important');
      stageRoot.style.setProperty('background-size', '400% 400%', 'important');
      
      // 2. Restart the moving animation
      stageRoot.style.setProperty('animation', 'gradientShift 15s ease-in-out infinite', 'important');

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
    <div className="spiderman-container" style={{ position: 'relative', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      <style>{`
        .corner-web {
          position: absolute;
          width: 50vw;
          height: 50vw;
          max-width: 600px;
          max-height: 600px;
          opacity: 0.3;
          z-index: 1;
          pointer-events: none;
        }
        .corner-web.tl { top: -10%; left: -10%; }
        .corner-web.tr { top: -10%; right: -10%; transform: scaleX(-1); }
        .corner-web.bl { bottom: -10%; left: -10%; transform: scaleY(-1); }
        .corner-web.br { bottom: -10%; right: -10%; transform: scale(-1, -1); }

        .web-path {
          animation: webGrow 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
        }

        @keyframes webGrow {
          0% { stroke-dashoffset: 1000; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }

        .hanging-spider {
          position: absolute;
          top: -50px;
          left: var(--startX);
          width: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 5;
          animation: dropSpider 6s ease-in-out infinite;
          animation-delay: var(--delay);
          pointer-events: none;
        }

        .spider-web-line {
          width: 1px;
          height: 50vh;
          background: rgba(255, 255, 255, 0.5);
        }

        .spider-svg {
          width: 100%;
          height: auto;
          filter: drop-shadow(0 5px 10px rgba(0,0,0,0.8));
        }

        @keyframes dropSpider {
          0% { transform: translateY(-100%); opacity: 0; }
          20% { opacity: 1; }
          60% { transform: translateY(var(--dropHeight)); opacity: 1; }
          90% { transform: translateY(-100%); opacity: 0; }
          100% { transform: translateY(-100%); opacity: 0; }
        }

        /* Matched to Royal.jsx font sizes and weight */
        .spiderman-name-text {
          font-family: 'Jokerman', 'Cairo', system-ui, sans-serif;
          font-size: clamp(4rem, 12vw, 10rem);
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: 0.02em;
          color: #fff;
          position: relative;
          z-index: 10;
          margin: 0;
          text-shadow: 
            5px 5px 0px #991b1b,
            -2px -2px 0px #1e3a8a,
            2px -2px 0px #1e3a8a,
            -2px 2px 0px #1e3a8a,
            0 15px 25px rgba(0,0,0,0.9);
          animation: thwipIn 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        @keyframes thwipIn {
          0% { transform: translateY(-150px) scale(1.5); opacity: 0; }
          60% { transform: translateY(10px) scale(0.95); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>

      {['tl', 'tr', 'bl', 'br'].map((pos) => (
        <svg key={pos} className={`corner-web ${pos}`} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line 
              key={deg}
              x1="0" y1="0" 
              x2={200 * Math.cos(deg * Math.PI / 180)} 
              y2={200 * Math.sin(deg * Math.PI / 180)} 
              stroke="#fff" strokeWidth="1.5" className="web-path"
            />
          ))}
          {[30, 60, 90, 120, 150, 180].map((radius) => (
            <path
              key={radius}
              d={`M 0 ${radius} Q ${radius/2} ${radius/2} ${radius} 0`}
              fill="none" stroke="#fff" strokeWidth="1.5" className="web-path"
              style={{ animationDelay: '0.5s' }}
            />
          ))}
        </svg>
      ))}

      <HangingSpider delay={0} startX="15%" dropHeight="30vh" />
      <HangingSpider delay={2} startX="85%" dropHeight="45vh" />
      <HangingSpider delay={4} startX="50%" dropHeight="20vh" />

      <h1 className="spiderman-name-text">{nameText}</h1>
    </div>
  );
}