import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <style>{`
        /* ============================================
           HOME — Playful blue, floating kids
           ============================================ */

        .home {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background:
            radial-gradient(ellipse at 50% 20%, #2a6db5 0%, transparent 60%),
            radial-gradient(ellipse at 80% 80%, #1e5a9a 0%, transparent 55%),
            linear-gradient(180deg, #0a1e3a 0%, #124d8a 50%, #0a1e3a 100%);
          font-family: 'Inter', sans-serif;
        }

        /* ====== Big soft pulsing halo ====== */
        .home-halo {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 75vw;
          height: 75vw;
          max-width: 1000px;
          max-height: 1000px;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(120, 200, 255, 0.28), transparent 65%);
          filter: blur(70px);
          pointer-events: none;
          animation: haloPulse 6s ease-in-out infinite;
        }
        @keyframes haloPulse {
          0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
          50%      { opacity: 1;   transform: translate(-50%, -50%) scale(1.15); }
        }

        /* ====== Floating kids ====== */
        .home-floats {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .float-kid {
          position: absolute;
          opacity: 0;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        .float-kid svg {
          width: 100%;
          height: 100%;
          display: block;
          filter: drop-shadow(0 8px 20px rgba(80, 160, 240, 0.5));
        }

        /* 8 kids at different positions, sizes, timings */
        .kid-1 { width: 130px; height: 195px; left: 6%;  top: 12%;  animation-name: bounce1; animation-duration: 5s;  animation-delay: 0s; }
        .kid-2 { width: 105px; height: 160px; right: 8%; top: 20%;  animation-name: bounce2; animation-duration: 6s;  animation-delay: 0.7s; }
        .kid-3 { width: 150px; height: 225px; left: 12%; bottom: 10%; animation-name: bounce3; animation-duration: 7s; animation-delay: 1.2s; }
        .kid-4 { width: 95px;  height: 145px; right: 15%; bottom: 15%; animation-name: bounce4; animation-duration: 5.5s; animation-delay: 0.4s; }
        .kid-5 { width: 85px;  height: 130px; left: 40%; top: 5%;   animation-name: bounce5; animation-duration: 6.5s; animation-delay: 2s; }
        .kid-6 { width: 115px; height: 175px; right: 5%;  top: 50%;  animation-name: bounce6; animation-duration: 5.2s; animation-delay: 1s; }
        .kid-7 { width: 100px; height: 150px; left: 3%;  bottom: 40%; animation-name: bounce7; animation-duration: 6.8s; animation-delay: 2.5s; }
        .kid-8 { width: 90px;  height: 140px; right: 30%; top: 12%;  animation-name: bounce8; animation-duration: 5.8s; animation-delay: 1.8s; }

        /* Playful bouncy floats — each kid bobs and sways gently */
        @keyframes bounce1 {
          0%, 100% { transform: translate(0, 0)     rotate(-3deg)  scale(1);    opacity: 0.85; }
          25%      { transform: translate(8px, -20px) rotate(2deg)  scale(1.04); }
          50%      { transform: translate(0, -35px) rotate(4deg)  scale(1.06); opacity: 0.95; }
          75%      { transform: translate(-8px, -18px) rotate(0deg) scale(1.02); }
        }
        @keyframes bounce2 {
          0%, 100% { transform: translate(0, 0)      rotate(2deg)   scale(1);    opacity: 0.85; }
          25%      { transform: translate(-10px, -22px) rotate(-3deg) scale(1.05); }
          50%      { transform: translate(0, -38px)  rotate(-5deg)  scale(1.07); opacity: 0.95; }
          75%      { transform: translate(10px, -20px) rotate(0deg)  scale(1.03); }
        }
        @keyframes bounce3 {
          0%, 100% { transform: translate(0, 0)      rotate(-2deg)  scale(1);    opacity: 0.9; }
          25%      { transform: translate(12px, -25px) rotate(3deg) scale(1.05); }
          50%      { transform: translate(0, -45px)  rotate(5deg)   scale(1.08); opacity: 0.95; }
          75%      { transform: translate(-12px, -22px) rotate(-1deg) scale(1.03); }
        }
        @keyframes bounce4 {
          0%, 100% { transform: translate(0, 0)      rotate(3deg)   scale(1);    opacity: 0.85; }
          25%      { transform: translate(-8px, -18px) rotate(-2deg) scale(1.04); }
          50%      { transform: translate(0, -30px)  rotate(-4deg)  scale(1.06); opacity: 0.95; }
          75%      { transform: translate(8px, -16px) rotate(1deg)  scale(1.02); }
        }
        @keyframes bounce5 {
          0%, 100% { transform: translate(0, 0)      rotate(-4deg)  scale(1);    opacity: 0.8; }
          25%      { transform: translate(6px, -15px) rotate(2deg)  scale(1.05); }
          50%      { transform: translate(0, -28px)  rotate(4deg)   scale(1.08); opacity: 0.9; }
          75%      { transform: translate(-6px, -14px) rotate(0deg)  scale(1.03); }
        }
        @keyframes bounce6 {
          0%, 100% { transform: translate(0, 0)      rotate(2deg)   scale(1);    opacity: 0.9; }
          25%      { transform: translate(-10px, -22px) rotate(-3deg) scale(1.04); }
          50%      { transform: translate(0, -40px)  rotate(-5deg)  scale(1.07); opacity: 0.95; }
          75%      { transform: translate(10px, -20px) rotate(0deg)  scale(1.03); }
        }
        @keyframes bounce7 {
          0%, 100% { transform: translate(0, 0)      rotate(-2deg)  scale(1);    opacity: 0.8; }
          25%      { transform: translate(10px, -18px) rotate(3deg) scale(1.04); }
          50%      { transform: translate(0, -32px)  rotate(5deg)   scale(1.07); opacity: 0.9; }
          75%      { transform: translate(-10px, -16px) rotate(1deg) scale(1.02); }
        }
        @keyframes bounce8 {
          0%, 100% { transform: translate(0, 0)      rotate(3deg)   scale(1);    opacity: 0.85; }
          25%      { transform: translate(-8px, -20px) rotate(-2deg) scale(1.05); }
          50%      { transform: translate(0, -34px)  rotate(-4deg)  scale(1.08); opacity: 0.95; }
          75%      { transform: translate(8px, -18px) rotate(1deg)  scale(1.03); }
        }

        /* ====== Floating sparkles ====== */
        .sparkle {
          position: absolute;
          pointer-events: none;
          animation: twinkle 3s ease-in-out infinite;
        }
        .sparkle svg {
          width: 100%; height: 100%;
          fill: #a8d8ff;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.7) rotate(0deg); }
          50%      { opacity: 1;   transform: scale(1.1) rotate(180deg); }
        }
        .sp-1 { width: 18px; height: 18px; top: 18%; left: 25%; animation-delay: 0s; }
        .sp-2 { width: 14px; height: 14px; top: 60%; left: 15%; animation-delay: 0.6s; }
        .sp-3 { width: 22px; height: 22px; top: 30%; right: 22%; animation-delay: 1.2s; }
        .sp-4 { width: 16px; height: 16px; bottom: 25%; right: 12%; animation-delay: 1.8s; }
        .sp-5 { width: 20px; height: 20px; bottom: 35%; left: 35%; animation-delay: 0.9s; }
        .sp-6 { width: 12px; height: 12px; top: 45%; right: 40%; animation-delay: 2.1s; }
        .sp-7 { width: 15px; height: 15px; top: 75%; right: 30%; animation-delay: 1.5s; }
        .sp-8 { width: 13px; height: 13px; top: 10%; left: 55%; animation-delay: 0.3s; }

        /* ====== Content ====== */
        .home-content {
          position: relative;
          z-index: 3;
          text-align: center;
          max-width: 900px;
          animation: riseIn 1.4s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }

        .home-title {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: clamp(2.5rem, 7.5vw, 6rem);
          line-height: 1;
          color: #ffffff;
          letter-spacing: -0.01em;
          margin-bottom: 3.5rem;
          text-shadow:
            0 0 40px rgba(140, 210, 255, 0.6),
            0 4px 24px rgba(0, 0, 0, 0.35);
        }

        /* ====== Buttons — rounded, playful ====== */
        .home-btns {
          display: flex;
          gap: 1.25rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .home .btn {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 1.1rem 3rem;
          border-radius: 999px;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          display: inline-block;
        }

        .home .backstage-btn {
          background: linear-gradient(135deg, #4d8fd6 0%, #2a6db5 100%);
          color: #ffffff;
          border: 2px solid #4d8fd6;
          box-shadow:
            0 8px 24px rgba(77, 143, 214, 0.5),
            inset 0 -3px 0 rgba(0, 0, 0, 0.15);
        }
        .home .backstage-btn:hover {
          transform: translateY(-5px) scale(1.05);
          background: linear-gradient(135deg, #6aa5e0 0%, #4d8fd6 100%);
          box-shadow:
            0 16px 36px rgba(77, 143, 214, 0.65),
            inset 0 -3px 0 rgba(0, 0, 0, 0.15);
        }

        .home .stage-btn {
          background: rgba(168, 216, 255, 0.12);
          color: #e8f4ff;
          border: 2px solid #7ab8e8;
          box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.1);
        }
        .home .stage-btn:hover {
          background: rgba(168, 216, 255, 0.25);
          transform: translateY(-5px) scale(1.05);
          border-color: #a8d8ff;
          box-shadow:
            0 16px 36px rgba(122, 184, 232, 0.5),
            inset 0 -3px 0 rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 720px) {
          .home-floats { opacity: 0.4; }
          .sparkle { display: none; }
        }
      `}</style>

      <div className="home">
        <div className="home-halo" />

        {/* Floating kids */}
        <div className="home-floats">

          {/* Kid 1 — girl in princess gown, arms up happily */}
          <div className="float-kid kid-1">
            <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="20" r="12" fill="#ffd9b3" />
              <path d="M38 12 Q50 4 62 12 Q60 6 50 4 Q40 6 38 12 Z" fill="#a8cdf0" />
              <path d="M40 32 Q50 28 60 32 L60 50 L40 50 Z" fill="#a8cdf0" />
              <path d="M40 34 L22 24 L24 20 L42 30 Z" fill="#ffd9b3" />
              <path d="M60 34 L78 24 L76 20 L58 30 Z" fill="#ffd9b3" />
              <path d="M40 50 L60 50 L76 135 Q50 145 24 135 Z" fill="#4d8fd6" />
              <path d="M50 52 L50 140" stroke="#2a6db5" strokeWidth="1.2" opacity="0.6" />
              <ellipse cx="50" cy="135" rx="26" ry="6" fill="#2a6db5" opacity="0.4" />
            </svg>
          </div>

          {/* Kid 2 — boy in suit, one hand waving */}
          <div className="float-kid kid-2">
            <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="22" r="11" fill="#ffd9b3" />
              <path d="M39 12 Q50 5 61 12 L61 16 Q50 12 39 16 Z" fill="#3a2818" />
              <path d="M39 33 Q50 30 61 33 L61 62 L39 62 Z" fill="#2a6db5" />
              <path d="M46 40 L50 46 L54 40 L50 43 Z" fill="#a8d8ff" />
              <path d="M61 38 L82 26 L84 30 L63 42 Z" fill="#ffd9b3" />
              <rect x="42" y="62" width="7" height="62" rx="3" fill="#0d2b4f" />
              <rect x="51" y="62" width="7" height="62" rx="3" fill="#0d2b4f" />
            </svg>
          </div>

          {/* Kid 3 — girl twirling in flowy dress */}
          <div className="float-kid kid-3">
            <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="20" r="13" fill="#ffd9b3" />
              <path d="M35 12 Q50 2 65 12 Q63 4 50 3 Q37 4 35 12 Z" fill="#a8cdf0" />
              <path d="M38 34 Q50 30 62 34 L62 55 L38 55 Z" fill="#7ab8e8" />
              <path d="M38 34 L18 28 L20 24 L40 30 Z" fill="#ffd9b3" />
              <path d="M62 34 L82 28 L80 24 L60 30 Z" fill="#ffd9b3" />
              <path d="M38 55 Q50 62 62 55 L84 138 Q50 152 16 138 Z" fill="#4d8fd6" />
              <path d="M50 58 L50 142" stroke="#2a6db5" strokeWidth="1.2" opacity="0.5" />
            </svg>
          </div>

          {/* Kid 4 — boy in tuxedo with bow tie */}
          <div className="float-kid kid-4">
            <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="24" r="11" fill="#ffd9b3" />
              <path d="M39 14 Q50 6 61 14 L61 18 Q50 14 39 18 Z" fill="#3a2818" />
              <path d="M39 35 Q50 32 61 35 L61 66 L39 66 Z" fill="#1a3a6b" />
              <path d="M44 44 L50 50 L56 44 L50 47 Z" fill="#ffffff" />
              <rect x="42" y="66" width="7" height="62" rx="3" fill="#0d2b4f" />
              <rect x="51" y="66" width="7" height="62" rx="3" fill="#0d2b4f" />
            </svg>
          </div>

          {/* Kid 5 — little girl in tutu, arms up like a star */}
          <div className="float-kid kid-5">
            <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="26" r="11" fill="#ffd9b3" />
              <path d="M40 16 Q50 8 60 16 Q58 10 50 9 Q42 10 40 16 Z" fill="#ffb8d1" />
              <path d="M40 38 Q50 34 60 38 L60 55 L40 55 Z" fill="#ffd9b3" />
              <path d="M42 40 L22 28 L20 32 L40 44 Z" fill="#ffd9b3" />
              <path d="M58 40 L78 28 L80 32 L60 44 Z" fill="#ffd9b3" />
              <ellipse cx="50" cy="72" rx="32" ry="16" fill="#7ab8e8" />
              <ellipse cx="50" cy="72" rx="24" ry="11" fill="#a8d8ff" opacity="0.7" />
              <rect x="46" y="88" width="3.5" height="35" rx="1.75" fill="#ffd9b3" />
              <rect x="52" y="88" width="3.5" height="35" rx="1.75" fill="#ffd9b3" />
            </svg>
          </div>

          {/* Kid 6 — girl in long elegant gown */}
          <div className="float-kid kid-6">
            <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="20" r="12" fill="#ffd9b3" />
              <path d="M38 12 Q50 4 62 12 Q60 5 50 3 Q40 5 38 12 Z" fill="#3a2818" />
              <path d="M39 32 Q50 28 61 32 L58 52 L42 52 Z" fill="#a8d8ff" />
              <path d="M42 52 L58 52 L68 138 Q50 146 32 138 Z" fill="#4d8fd6" />
              <path d="M42 52 L58 52 L60 90 L40 90 Z" fill="#7ab8e8" opacity="0.7" />
              <rect x="46" y="138" width="3.5" height="12" rx="1.75" fill="#ffd9b3" />
              <rect x="52" y="138" width="3.5" height="12" rx="1.75" fill="#ffd9b3" />
            </svg>
          </div>

          {/* Kid 7 — boy sitting on a fluffy cloud */}
          <div className="float-kid kid-7">
            <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="50" cy="120" rx="35" ry="14" fill="#a8d8ff" opacity="0.85" />
              <ellipse cx="38" cy="114" rx="18" ry="10" fill="#a8d8ff" />
              <ellipse cx="62" cy="114" rx="18" ry="10" fill="#a8d8ff" />
              <circle cx="50" cy="55" r="11" fill="#ffd9b3" />
              <path d="M39 45 Q50 37 61 45 L61 49 Q50 45 39 49 Z" fill="#3a2818" />
              <path d="M40 66 Q50 63 60 66 L60 85 L40 85 Z" fill="#2a6db5" />
              <path d="M60 70 L72 62 L74 66 L62 74 Z" fill="#ffd9b3" />
              <rect x="42" y="85" width="7" height="30" rx="3" fill="#0d2b4f" />
              <rect x="51" y="85" width="7" height="30" rx="3" fill="#0d2b4f" />
            </svg>
          </div>

          {/* Kid 8 — girl with a tiny crown, twirling */}
          <div className="float-kid kid-8">
            <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="24" r="12" fill="#ffd9b3" />
              <path d="M38 14 L42 6 L46 12 L50 4 L54 12 L58 6 L62 14 Q50 16 38 14 Z" fill="#ffd166" />
              <path d="M40 36 Q50 32 60 36 L60 55 L40 55 Z" fill="#a8d8ff" />
              <path d="M40 38 L22 32 L24 28 L42 34 Z" fill="#ffd9b3" />
              <path d="M60 38 L78 32 L76 28 L58 34 Z" fill="#ffd9b3" />
              <path d="M40 55 L60 55 L72 138 Q50 148 28 138 Z" fill="#4d8fd6" />
              <path d="M50 58 L50 142" stroke="#2a6db5" strokeWidth="1" opacity="0.5" />
            </svg>
          </div>
        </div>

        {/* Sparkles */}
        <div className="sparkle sp-1"><svg viewBox="0 0 10 10"><path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" /></svg></div>
        <div className="sparkle sp-2"><svg viewBox="0 0 10 10"><path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" /></svg></div>
        <div className="sparkle sp-3"><svg viewBox="0 0 10 10"><path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" /></svg></div>
        <div className="sparkle sp-4"><svg viewBox="0 0 10 10"><path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" /></svg></div>
        <div className="sparkle sp-5"><svg viewBox="0 0 10 10"><path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" /></svg></div>
        <div className="sparkle sp-6"><svg viewBox="0 0 10 10"><path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" /></svg></div>
        <div className="sparkle sp-7"><svg viewBox="0 0 10 10"><path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" /></svg></div>
        <div className="sparkle sp-8"><svg viewBox="0 0 10 10"><path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" /></svg></div>

        <div className="home-content">
          <h1 className="home-title">Ste. Barbara 2026</h1>
          <div className="home-btns">
            <Link to="/backstage" className="btn backstage-btn">
              Backstage
            </Link>
            <a
              href="/stage"
              target="_blank"
              rel="noopener noreferrer"
              className="btn stage-btn"
            >
              Stage
            </a>
          </div>
        </div>
      </div>
    </>
  );
}