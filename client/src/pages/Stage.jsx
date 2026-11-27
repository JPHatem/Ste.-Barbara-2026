import { useEffect, useRef, useState } from 'react';
import { socket } from '../socket';
import CostumeDirector from '../animations/CostumeDirector'; // <-- Import the director

function WheatSheaf() {
  return (
    <svg viewBox="0 0 40 160" preserveAspectRatio="xMidYMax meet" style={{ width: '100%', height: '100%', display: 'block', color: 'inherit' }}>
      <line x1="20" y1="40" x2="20" y2="160" stroke="currentColor" strokeWidth="1.5" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
        const y = 40 + i * 12;
        return (
          <g key={i}>
            <ellipse cx="14" cy={y} rx="4" ry="7" transform={`rotate(-30 14 ${y})`} fill="currentColor" />
            <ellipse cx="26" cy={y} rx="4" ry="7" transform={`rotate(30 26 ${y})`} fill="currentColor" />
          </g>
        );
      })}
      <ellipse cx="20" cy="30" rx="4" ry="8" fill="currentColor" />
      <line x1="20" y1="22" x2="10" y2="8" stroke="currentColor" strokeWidth="0.8" />
      <line x1="20" y1="22" x2="20" y2="4" stroke="currentColor" strokeWidth="0.8" />
      <line x1="20" y1="22" x2="30" y2="8" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

function SpyingMask() {
  const [visible, setVisible] = useState(false);
  const [direction, setDirection] = useState('left');
  const [tilt, setTilt] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const directions = ['left', 'right', 'top', 'bottom'];
    let cancelled = false;
    const runPeek = () => {
      if (cancelled) return;
      timerRef.current = setTimeout(() => {
        if (cancelled) return;
        const dir = directions[Math.floor(Math.random() * directions.length)];
        setDirection(dir);
        setTilt((Math.random() - 0.5) * 25);
        setVisible(true);
        setTimeout(() => {
          if (cancelled) return;
          setVisible(false);
          setTimeout(runPeek, 1200);
        }, 1800 + Math.random() * 1000);
      }, 5000 + Math.random() * 5000);
    };
    runPeek();
    return () => { cancelled = true; if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <div className={`spy-mask spy-${direction} ${visible ? 'visible' : ''}`} style={{ '--tilt': `${tilt}deg` }}>
      <svg viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 30 Q10 10 30 10 Q50 15 70 10 Q90 10 90 30 Q90 50 70 50 Q50 45 30 50 Q10 50 10 30 Z" fill="currentColor" fillOpacity="0.15" />
        <ellipse cx="32" cy="30" rx="12" ry="9" fill="none" />
        <ellipse cx="68" cy="30" rx="12" ry="9" fill="none" />
        <circle cx="34" cy="30" r="3" fill="currentColor" className="eye-pupil" />
        <circle cx="66" cy="30" r="3" fill="currentColor" className="eye-pupil" />
        <path d="M46 30 L54 30" strokeWidth="2" />
        <path d="M10 30 L2 20 M10 30 L2 40" strokeWidth="2" />
        <path d="M90 30 L98 20 M90 30 L98 40" strokeWidth="2" />
      </svg>
    </div>
  );
}

function Candy({ color = '#e84393' }) {
  return (
    <svg viewBox="0 0 40 24" style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}>
      <path d="M2 12 L10 6 L10 18 Z" fill={color} opacity="0.9" />
      <path d="M38 12 L30 6 L30 18 Z" fill={color} opacity="0.9" />
      <rect x="8" y="4" width="24" height="16" rx="8" fill={color} />
      <rect x="8" y="4" width="24" height="16" rx="8" fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1" />
      <path d="M14 6 L14 18 M20 6 L20 18 M26 6 L26 18" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="1.2" />
    </svg>
  );
}

const CANDY_COLORS = ['#e84393', '#f39c12', '#9b59b6', '#e74c3c', '#1abc9c', '#3498db', '#f1c40f'];

let candyIdCounter = 0;

function CandyBasket() {
  const [ejected, setEjected] = useState([]);
  const [isShaking, setIsShaking] = useState(false);
  const cleanupRef = useRef([]);

  useEffect(() => {
    const ejectBurst = () => {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);

      const count = 5 + Math.floor(Math.random() * 4);
      const newCandies = Array.from({ length: count }).map((_, i) => {
        const id = ++candyIdCounter;
        const angle = -30 - Math.random() * 60;
        const distance = 80 + Math.random() * 120;
        const dx = Math.cos((angle * Math.PI) / 180) * distance;
        const dy = Math.sin((angle * Math.PI) / 180) * distance;
        const rot = (Math.random() - 0.5) * 720;
        const delay = i * 40 + Math.random() * 60;
        const color = CANDY_COLORS[Math.floor(Math.random() * CANDY_COLORS.length)];
        return { id, dx, dy, rot, delay, color };
      });
      
      setEjected((prev) => [...prev, ...newCandies]);

      const removalTimer = setTimeout(() => {
        setEjected((prev) => prev.filter((c) => !newCandies.find((n) => n.id === c.id)));
      }, 2200);
      cleanupRef.current.push(removalTimer);
    };

    const firstTimer = setTimeout(ejectBurst, 3000);
    const interval = setInterval(ejectBurst, 15000);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
      cleanupRef.current.forEach((t) => clearTimeout(t));
      cleanupRef.current = [];
    };
  }, []);

  return (
    <div className="candy-basket-wrap">
      {ejected.map((c) => (
        <div
          key={c.id}
          className="flying-candy"
          style={{
            '--dx': `${c.dx}px`,
            '--dy': `${c.dy}px`,
            '--rot': `${c.rot}deg`,
            animationDelay: `${c.delay}ms`,
          }}
        >
          <Candy color={c.color} />
        </div>
      ))}

      <div className={`candy-basket ${isShaking ? 'shake' : ''}`}>
        <svg viewBox="0 0 120 100" style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}>
          <defs>
            <linearGradient id="basketGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d9a55b" />
              <stop offset="100%" stopColor="#8a5a2b" />
            </linearGradient>
            <clipPath id="basketInnerClip">
              <path d="M14 52 Q60 42 106 52 L98 88 Q60 96 22 88 Z" />
            </clipPath>
          </defs>

          <path d="M30 52 Q60 10 90 52" fill="none" stroke="#8a5a2b" strokeWidth="4" strokeLinecap="round" />
          <path d="M30 52 Q60 10 90 52" fill="none" stroke="#d9a55b" strokeWidth="2" strokeLinecap="round" />

          <path d="M10 55 Q60 45 110 55 Q60 50 10 55 Z" fill="#b07a3c" stroke="#5c3a18" strokeWidth="2" />

          <g>
            <g transform="translate(25 46) rotate(-15) scale(0.35)"><Candy color="#e84393" /></g>
            <g transform="translate(45 42) rotate(5) scale(0.35)"><Candy color="#f39c12" /></g>
            <g transform="translate(65 44) rotate(-5) scale(0.35)"><Candy color="#9b59b6" /></g>
            <g transform="translate(85 48) rotate(12) scale(0.35)"><Candy color="#1abc9c" /></g>
            <g transform="translate(35 50) rotate(8) scale(0.35)"><Candy color="#3498db" /></g>
            <g transform="translate(55 50) rotate(-10) scale(0.35)"><Candy color="#e74c3c" /></g>
          </g>

          <path d="M10 55 Q60 45 110 55 L102 92 Q60 100 18 92 Z" fill="url(#basketGrad)" stroke="#5c3a18" strokeWidth="2" />

          <g clipPath="url(#basketInnerClip)">
             <g transform="translate(30 55) rotate(20) scale(0.35)"><Candy color="#f1c40f" /></g>
             <g transform="translate(70 56) rotate(-20) scale(0.35)"><Candy color="#e84393" /></g>
          </g>

          <g stroke="#5c3a18" strokeOpacity="0.5" strokeWidth="1.2">
            <path d="M20 62 Q60 56 100 62" fill="none" />
            <path d="M18 72 Q60 66 102 72" fill="none" />
            <path d="M17 82 Q60 76 103 82" fill="none" />
            <path d="M30 56 L26 92" fill="none" />
            <path d="M45 53 L43 95" fill="none" />
            <path d="M60 52 L60 96" fill="none" />
            <path d="M75 53 L77 95" fill="none" />
            <path d="M90 56 L94 92" fill="none" />
          </g>
          
          <path d="M10 55 Q60 45 110 55 Q60 64 10 55 Z" fill="#b07a3c" stroke="#5c3a18" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}

function Camera() {
  const [flashing, setFlashing] = useState(false);

  useEffect(() => {
    const triggerFlash = () => {
      setFlashing(true);
      setTimeout(() => setFlashing(false), 400);
    };

    const firstTimer = setTimeout(triggerFlash, 4000);
    const interval = setInterval(triggerFlash, 20000);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={`camera-wrap ${flashing ? 'flashing' : ''}`}>
      <svg viewBox="0 0 120 80" style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>
        <defs>
          <linearGradient id="camBodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a3a3a" />
            <stop offset="100%" stopColor="#111111" />
          </linearGradient>
          <linearGradient id="lensGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#555" />
            <stop offset="40%" stopColor="#0a0a0a" />
            <stop offset="100%" stopColor="#2a2a2a" />
          </linearGradient>
          <linearGradient id="flashBeam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {flashing && (
          <path d="M 75 25 L 140 -10 L 140 70 Z" fill="url(#flashBeam)" style={{ animation: 'flashBurst 0.4s ease-out forwards' }} />
        )}

        <line x1="40" y1="60" x2="20" y2="80" stroke="#222" strokeWidth="4" strokeLinecap="round" />
        <line x1="80" y1="60" x2="100" y2="80" stroke="#222" strokeWidth="4" strokeLinecap="round" />
        <line x1="60" y1="60" x2="60" y2="80" stroke="#222" strokeWidth="4" strokeLinecap="round" />
        <circle cx="60" cy="60" r="5" fill="#333" />

        <rect x="10" y="20" width="100" height="45" rx="8" fill="url(#camBodyGrad)" stroke="#000" strokeWidth="2" />
        
        <rect x="50" y="10" width="25" height="15" rx="3" fill="#222" stroke="#000" strokeWidth="1.5" />
        <rect x="75" y="15" width="12" height="8" rx="2" fill="#555" />
        <circle cx="85" cy="19" r="2.5" fill="#d32f2f" />

        <rect x="25" y="32" width="45" height="33" rx="6" fill="url(#lensGrad)" stroke="#000" strokeWidth="1.5" />
        <ellipse cx="47" cy="48" rx="14" ry="12" fill="#000" />
        <ellipse cx="47" cy="48" rx="10" ry="8" fill="#1a2b4c" />
        <path d="M 42 42 Q 48 40 52 46" fill="none" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" />

        <rect x="72" y="28" width="30" height="15" rx="3" fill="#222" stroke="#000" strokeWidth="1.5" />
        <rect x="75" y="30" width="24" height="11" rx="1.5" fill="#fff" opacity={flashing ? 1 : 0.2} style={{ transition: 'opacity 0.1s' }} />
      </svg>
    </div>
  );
}

export default function Stage() {
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    const handleShow = (child) => setCurrent(child);
    const handleClear = () => setCurrent(null);

    socket.on('stage:show', handleShow);
    socket.on('stage:clear', handleClear);
    socket.on('stage:current', handleShow);

    socket.emit('stage:requestState');

    return () => {
      socket.off('stage:show', handleShow);
      socket.off('stage:clear', handleClear);
      socket.off('stage:current', handleShow);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');

        .stage-root {
          position: fixed; inset: 0; overflow: hidden;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          color: #0d1b2a;
          font-family: 'Cairo', system-ui, sans-serif;
          background: linear-gradient(135deg, #ffffff 0%, #d6f0e0 25%, #1a6b5a 50%, #d6f0e0 75%, #ffffff 100%);
          background-size: 400% 400%;
          animation: gradientShift 30s ease-in-out infinite;
        }

        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          25%  { background-position: 100% 0%; }
          50%  { background-position: 100% 100%; }
          75%  { background-position: 0% 100%; }
          100% { background-position: 0% 50%; }
        }

        .stage-header {
          position: absolute; top: 2rem; left: 0; right: 0;
          text-align: center; padding: 0 1rem; z-index: 5;
        }
        .stage-header-line,
        .stage-header-sub,
        .stage-header-tag {
          font-family: 'Cairo', system-ui, sans-serif;
          line-height: 1.5;
        }
        .stage-header-line { font-size: clamp(1rem, 1.8vw, 1.5rem); font-weight: 700; color: #0d1b2a; }
        .stage-header-sub  { font-size: clamp(0.9rem, 1.5vw, 1.2rem); font-weight: 700; color: #2a6b5a; }
        .stage-header-tag  { font-size: clamp(1.6rem, 3vw, 2.6rem); font-weight: 900; margin-top: 0.75rem; color: #0d1b2a; letter-spacing: 0.05em; }

        .stage-main {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          text-align: center; padding: 1rem; z-index: 5;
          pointer-events: none;
        }
        
        .stage-child-name {
          font-family: 'Jokerman', 'Cairo', system-ui, sans-serif;
          font-size: clamp(4rem, 12vw, 10rem);
          font-weight: 700; line-height: 1.1; letter-spacing: 0.02em;
          color: #0d1b2a;
          margin: 0;
        }

        .stage-land {
          position: absolute; left: 0; right: 0; bottom: 0;
          height: clamp(5rem, 9vw, 8rem);
          pointer-events: none; z-index: 1;
        }
        .stage-land svg { width: 100%; height: 100%; display: block; }

        .stage-bottom {
          position: absolute; left: 0; right: 0; bottom: 0;
          display: flex; align-items: flex-end; justify-content: center;
          gap: 2rem; z-index: 5;
          padding: 0 1rem;
        }

        .stage-date {
          font-family: 'Cairo', system-ui, sans-serif;
          font-size: clamp(1.2rem, 2vw, 1.8rem);
          font-weight: 700; letter-spacing: 0.15em;
          color: #2a6b5a;
          padding-bottom: clamp(0.75rem, 1.5vw, 1.5rem);
          align-self: center;
        }

        .wheat-group {
          display: flex; align-items: flex-end; gap: 0.6rem;
          height: clamp(9rem, 16vw, 15rem);
          color: #8a6a00;
        }
        .wheat-group .wheat-sheaf {
          width: clamp(30px, 2.6vw, 44px);
          height: 100%;
          transform-origin: bottom center;
          animation:
            growWheat 1.6s cubic-bezier(0.22, 1, 0.36, 1) both,
            wheatSway 4s 1.6s ease-in-out infinite;
        }
        .wheat-group .wheat-sheaf:nth-child(1) { animation-delay: 0s, 1.6s; }
        .wheat-group .wheat-sheaf:nth-child(2) { animation-delay: 0.15s, 1.75s; }
        .wheat-group .wheat-sheaf:nth-child(3) { animation-delay: 0.3s, 1.9s; }
        .wheat-group .wheat-sheaf:nth-child(4) { animation-delay: 0.45s, 2.05s; }
        .wheat-group .wheat-sheaf:nth-child(5) { animation-delay: 0.6s, 2.2s; }
        .wheat-group .wheat-sheaf:nth-child(6) { animation-delay: 0.75s, 2.35s; }

        @keyframes growWheat {
          0%   { transform: scaleY(0); opacity: 0; }
          60%  { opacity: 1; }
          100% { transform: scaleY(1); opacity: 1; }
        }

        @keyframes wheatSway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }

        .spy-mask {
          position: fixed; color: #1a6b5a; z-index: 3; pointer-events: none; opacity: 0;
          filter: drop-shadow(0 6px 16px rgba(0,0,0,0.35));
          transition: opacity 0.6s ease, transform 0.9s cubic-bezier(0.34, 1.3, 0.64, 1);
        }
        .spy-mask svg { width: 130px; height: auto; display: block; }
        .spy-mask .eye-pupil { animation: pupilLook 2.5s ease-in-out infinite; }
        @keyframes pupilLook {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          50% { transform: translateX(2px); }
          75% { transform: translateX(-1px); }
        }

        .spy-mask.spy-left { left: 0; top: 40%; transform: translate(-100%, -50%) rotate(var(--tilt, 0deg)); }
        .spy-mask.spy-left.visible { transform: translate(8px, -50%) rotate(var(--tilt, 0deg)); opacity: 1; }

        .spy-mask.spy-right { right: 0; top: 40%; transform: translate(100%, -50%) rotate(var(--tilt, 0deg)); }
        .spy-mask.spy-right.visible { transform: translate(-8px, -50%) rotate(var(--tilt, 0deg)); opacity: 1; }

        .spy-mask.spy-top { top: 0; left: 50%; transform: translate(-50%, -100%) rotate(var(--tilt, 0deg)); }
        .spy-mask.spy-top.visible { transform: translate(-50%, 8px) rotate(var(--tilt, 0deg)); opacity: 1; }

        .spy-mask.spy-bottom { bottom: 0; left: 50%; transform: translate(-50%, 100%) rotate(var(--tilt, 0deg)); }
        .spy-mask.spy-bottom.visible { transform: translate(-50%, -8px) rotate(var(--tilt, 0deg)); opacity: 1; }

        /* ====== Candy basket bottom-right ====== */
        .candy-basket-wrap {
          position: fixed;
          right: clamp(0.75rem, 2vw, 2rem);
          bottom: clamp(0.5rem, 1.5vw, 1.25rem);
          width: clamp(100px, 12vw, 160px);
          height: auto;
          z-index: 6;
          pointer-events: none;
        }
        .candy-basket {
          width: 100%;
          height: auto;
          display: block;
          filter: drop-shadow(0 8px 14px rgba(0,0,0,0.3));
          animation: basketBob 6s ease-in-out infinite;
          transform-origin: bottom center;
        }
        @keyframes basketBob {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50% { transform: translateY(-3px) rotate(1deg); }
        }
        .candy-basket.shake {
          animation: basketShake 0.4s ease-in-out;
        }
        @keyframes basketShake {
          0% { transform: translateX(0) rotate(0); }
          20% { transform: translateX(-5px) rotate(-3deg); }
          40% { transform: translateX(5px) rotate(3deg); }
          60% { transform: translateX(-4px) rotate(-2deg); }
          80% { transform: translateX(4px) rotate(2deg); }
          100% { transform: translateX(0) rotate(0); }
        }

        .flying-candy {
          position: absolute;
          left: 50%;
          top: 30%;
          width: clamp(20px, 2vw, 30px);
          transform: translate(-50%, -50%);
          animation: candyFly 1.8s cubic-bezier(0.25, 0.6, 0.4, 1) forwards;
          opacity: 0;
        }
        @keyframes candyFly {
          0% { transform: translate(-50%, -50%) rotate(0deg) scale(0.5); opacity: 0; }
          10% { opacity: 1; }
          55% { transform: translate(calc(-50% + var(--dx) * 0.7), calc(-50% + var(--dy) * 0.7 - 20px)) rotate(calc(var(--rot) * 0.6)) scale(1); opacity: 1; }
          100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy) + 180px)) rotate(var(--rot)) scale(0.9); opacity: 0; }
        }

        /* ====== Camera bottom-left ====== */
        .camera-wrap {
          position: fixed;
          left: clamp(0.75rem, 2vw, 2rem);
          bottom: clamp(0.5rem, 1.5vw, 1.25rem);
          width: clamp(90px, 12vw, 150px);
          height: auto;
          z-index: 6;
          pointer-events: none;
          filter: drop-shadow(0 8px 12px rgba(0,0,0,0.5));
          transform-origin: bottom center;
        }
        
        .camera-wrap.flashing {
          animation: cameraJolt 0.3s ease-out;
        }
        @keyframes cameraJolt {
          0% { transform: translateY(0) rotate(0deg); }
          30% { transform: translateY(3px) rotate(-1.5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }

        @keyframes flashBurst {
          0% { opacity: 0; transform: scaleX(0.8); }
          20% { opacity: 0.9; transform: scaleX(1.1); }
          100% { opacity: 0; transform: scaleX(1.5); }
        }

        @media (max-width: 720px) {
          .spy-mask svg { width: 80px; }
          .wheat-group .wheat-sheaf:nth-child(n+4) { display: none; }
          .wheat-group { gap: 0.4rem; height: clamp(7rem, 22vw, 11rem); }
          .stage-bottom { gap: 1rem; }
          .candy-basket-wrap { width: clamp(80px, 20vw, 120px); }
          .camera-wrap { width: clamp(70px, 18vw, 110px); }
        }
      `}</style>

      <div className="stage-root">
        <SpyingMask />

        <div className="stage-land">
          <svg viewBox="0 0 1440 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="landGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#b8e6a8" />
                <stop offset="45%" stopColor="#8fd18a" />
                <stop offset="100%" stopColor="#4a8a52" />
              </linearGradient>
              <linearGradient id="landTopGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d4f0c4" />
                <stop offset="100%" stopColor="#b8e6a8" />
              </linearGradient>
            </defs>
            <path d="M0 90 Q240 50 480 80 T960 70 T1440 85 L1440 200 L0 200 Z" fill="url(#landGrad)" />
            <path d="M0 90 Q240 50 480 80 T960 70 T1440 85 L1440 110 Q960 90 480 110 T0 115 Z" fill="url(#landTopGrad)" opacity="0.85" />
            <path d="M0 90 Q240 50 480 80 T960 70 T1440 85" fill="none" stroke="#e6f5d8" strokeWidth="2" opacity="0.8" />
          </svg>
        </div>

        <header className="stage-header">
          <div className="stage-header-line" dir="rtl">عائلة الأخويّات - فرع مار جرجس و القدّيسة صوفيا - الصفرا</div>
          <div className="stage-header-sub" dir="rtl">إحتفالات عيد القدّيسة بربارة 2026</div>
          <div className="stage-header-tag" dir="rtl">عَغَفلة</div>
        </header>

        <main className="stage-main">
          {current ? (
            <CostumeDirector 
              costume={current.costume} 
              childName={current.name} 
            />
          ) : null}
        </main>

        <div className="stage-bottom">
          <div className="wheat-group">
            <div className="wheat-sheaf"><WheatSheaf /></div>
            <div className="wheat-sheaf"><WheatSheaf /></div>
            <div className="wheat-sheaf"><WheatSheaf /></div>
            <div className="wheat-sheaf"><WheatSheaf /></div>
            <div className="wheat-sheaf"><WheatSheaf /></div>
            <div className="wheat-sheaf"><WheatSheaf /></div>
            <div className="wheat-sheaf"><WheatSheaf /></div>
          </div>

          <div className="stage-date">5 / 12 / 2026</div>

          <div className="wheat-group">
            <div className="wheat-sheaf"><WheatSheaf /></div>
            <div className="wheat-sheaf"><WheatSheaf /></div>
            <div className="wheat-sheaf"><WheatSheaf /></div>
            <div className="wheat-sheaf"><WheatSheaf /></div>
            <div className="wheat-sheaf"><WheatSheaf /></div>
            <div className="wheat-sheaf"><WheatSheaf /></div>
            <div className="wheat-sheaf"><WheatSheaf /></div>
          </div>
        </div>

        <CandyBasket />
        <Camera />
      </div>
    </>
  );
}