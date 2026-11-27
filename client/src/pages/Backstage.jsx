import { useEffect, useRef, useState } from 'react';
import { socket } from '../socket';
import { api } from '../api';
import { COSTUMES, findCostumeByLabel, suggestCostumes } from '../costumes';

const EMPTY_FORM = {
  name: '',
  costume: ''
};

export default function Backstage() {
  const [children, setChildren] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [connected, setConnected] = useState(socket.connected);
  const [currentOnStage, setCurrentOnStage] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(0);

  const nameRef = useRef(null);
  const costumeRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    api.getChildren().then(setChildren);

    const onUpdate = (list) => setChildren(list);
    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);
    const onStage = (child) => setCurrentOnStage(child);

    socket.on('children:updated', onUpdate);
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('stage:show', onStage);
    socket.on('stage:clear', () => setCurrentOnStage(null));
    socket.on('stage:current', onStage);

    socket.emit('stage:requestState');

    return () => {
      socket.off('children:updated', onUpdate);
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('stage:show', onStage);
      socket.off('stage:clear');
      socket.off('stage:current', onStage);
    };
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        costumeRef.current &&
        !costumeRef.current.contains(e.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCostumeChange = (value) => {
    setForm({ ...form, costume: value });
    const matches = suggestCostumes(value);
    setSuggestions(matches);
    setShowSuggestions(matches.length > 0);
    setActiveSuggestion(0);
  };

  const handleCostumeKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Enter') costumeRef.current?.blur();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestion((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestion((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      pickSuggestion(suggestions[activeSuggestion]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const pickSuggestion = (costume) => {
    setForm({ ...form, costume: costume.label });
    setShowSuggestions(false);
    costumeRef.current?.focus();
  };

  const canSend =
    form.name.trim().length > 0 &&
    form.costume.trim().length > 0;

  const sendToStage = () => {
    if (!canSend) return;

    // Match costume by free text, fallback to "None"
    const matched = findCostumeByLabel(form.costume);
    const costume = matched || COSTUMES[0]; // COSTUMES[0] is "None"

    const child = {
      id: Date.now().toString(),
      name: form.name.trim(),
      costume: costume.id,
      costumeLabel: matched ? costume.label : form.costume.trim(),
      theme: costume.theme,
      animation: costume.animation,
      icon: costume.icon,
      imageUrl: ''
    };

    // Clear the stage first, then send the new child
    socket.emit('stage:clear');
    setTimeout(() => {
      socket.emit('stage:show', child);
    }, 80);

    // Reset all inputs
    setForm(EMPTY_FORM);
    setShowSuggestions(false);
    setSuggestions([]);
    nameRef.current?.focus();
  };

  const handleNameKeyDown = (e) => {
    if (e.key === 'Enter' && form.name.trim()) {
      costumeRef.current?.focus();
    }
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }

        .backstage {
          min-height: 100vh;
          background: #0d1b2a;
          padding: 1.5rem;
          font-family: 'Inter', sans-serif;
          color: #e8f4ff;
        }

        .bs-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          padding: 1rem 1.5rem;
          background: linear-gradient(135deg, #1a3a5c 0%, #0d1b2a 100%);
          border-radius: 14px;
          margin-bottom: 1.5rem;
          border: 1px solid #24425f;
        }
        .bs-header h1 {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #e8f4ff;
          letter-spacing: 0.02em;
        }
        .bs-header-right {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        .status {
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.4rem 0.9rem;
          border-radius: 999px;
        }
        .status.online {
          color: #4fc3f7;
          background: rgba(79, 195, 247, 0.12);
          border: 1px solid rgba(79, 195, 247, 0.4);
        }
        .status.offline {
          color: #ef5350;
          background: rgba(239, 83, 80, 0.12);
          border: 1px solid rgba(239, 83, 80, 0.4);
        }
        .on-stage-pill {
          padding: 0.4rem 0.9rem;
          background: rgba(79, 195, 247, 0.15);
          border: 1px solid rgba(79, 195, 247, 0.5);
          border-radius: 999px;
          font-size: 0.8rem;
          color: #a8d8ff;
        }
        .on-stage-pill strong { color: #e8f4ff; }

        .bs-body {
          display: grid;
          grid-template-columns: 420px 1fr;
          gap: 1.5rem;
          max-width: 1400px;
          margin: 0 auto;
        }
        @media (max-width: 900px) {
          .bs-body { grid-template-columns: 1fr; }
        }

        .bs-form {
          background: #112b47;
          padding: 1.75rem;
          border-radius: 16px;
          border: 1px solid #24425f;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          height: fit-content;
          position: sticky;
          top: 1.5rem;
        }
        @media (max-width: 900px) {
          .bs-form { position: static; }
        }
        .bs-form h2 {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          margin-bottom: 0.75rem;
          color: #e8f4ff;
        }
        .bs-form label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #7aa5c9;
          margin-top: 0.4rem;
          font-weight: 600;
        }
        .bs-form input {
          background: #0d1b2a;
          border: 1px solid #24425f;
          color: #e8f4ff;
          padding: 0.75rem 0.9rem;
          border-radius: 8px;
          font-family: inherit;
          font-size: 0.95rem;
          transition: border-color 0.2s ease;
        }
        .bs-form input:focus {
          outline: none;
          border-color: #4fc3f7;
          box-shadow: 0 0 0 3px rgba(79, 195, 247, 0.15);
        }
        .bs-form input::placeholder {
          color: #5a7a95;
        }

        /* ===== Costume autocomplete ===== */
        .costume-wrap {
          position: relative;
        }
        .suggestions {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          right: 0;
          background: #0d1b2a;
          border: 1px solid #24425f;
          border-radius: 8px;
          max-height: 220px;
          overflow-y: auto;
          z-index: 10;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        .suggestion-item {
          padding: 0.65rem 0.9rem;
          cursor: pointer;
          font-size: 0.9rem;
          color: #cfe6f8;
          transition: background 0.15s ease;
        }
        .suggestion-item:hover,
        .suggestion-item.active {
          background: #1a3a5c;
          color: #ffffff;
        }
        .suggestion-item .label {
          font-weight: 600;
        }
        .suggestion-item .meta {
          font-size: 0.72rem;
          color: #7aa5c9;
          margin-left: 0.5rem;
        }
        .suggestion-empty {
          padding: 0.65rem 0.9rem;
          font-size: 0.85rem;
          color: #7aa5c9;
          font-style: italic;
        }

        .send-btn {
          margin-top: 1.25rem;
          padding: 1rem;
          background: linear-gradient(135deg, #0288d1 0%, #01579b 100%);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-family: inherit;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .send-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(2, 136, 209, 0.5);
          background: linear-gradient(135deg, #039be5 0%, #0277bd 100%);
        }
        .send-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .bs-list {
          background: #112b47;
          padding: 1.75rem;
          border-radius: 16px;
          border: 1px solid #24425f;
        }
        .bs-list h2 {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          margin-bottom: 1rem;
          color: #e8f4ff;
        }

        .empty {
          color: #7aa5c9;
          font-style: italic;
          padding: 1rem;
          text-align: center;
          font-size: 0.9rem;
        }

        .list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .child-card {
          display: grid;
          grid-template-columns: 60px 1fr;
          gap: 1rem;
          align-items: center;
          padding: 0.85rem;
          background: #0d1b2a;
          border-radius: 12px;
          border: 1px solid #24425f;
          transition: border-color 0.2s ease;
        }
        .child-card:hover {
          border-color: #4fc3f7;
        }

        .cc-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0288d1, #01579b);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
        }

        .cc-info h3 {
          font-size: 1.05rem;
          margin-bottom: 0.25rem;
          color: #e8f4ff;
        }
        .cc-info p {
          font-size: 0.85rem;
          color: #7aa5c9;
        }
      `}</style>

      <div className="backstage">
        <header className="bs-header">
          <h1>Backstage</h1>
          <div className="bs-header-right">
            <span className={`status ${connected ? 'online' : 'offline'}`}>
              {connected ? 'Live' : 'Offline'}
            </span>
            {currentOnStage && (
              <span className="on-stage-pill">
                On stage: <strong>{currentOnStage.name}</strong>
              </span>
            )}
          </div>
        </header>

        <div className="bs-body">
          {/* LEFT — FORM */}
          <section className="bs-form">
            <h2>New Presentation</h2>

            <label htmlFor="name-input">Name</label>
            <input
              id="name-input"
              ref={nameRef}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              onKeyDown={handleNameKeyDown}
              placeholder="Child's name"
              autoComplete="off"
            />

            <label htmlFor="costume-input">Costume</label>
            <div className="costume-wrap">
              <input
                id="costume-input"
                ref={costumeRef}
                value={form.costume}
                onChange={(e) => handleCostumeChange(e.target.value)}
                onFocus={() => {
                  if (suggestions.length > 0) setShowSuggestions(true);
                }}
                onKeyDown={handleCostumeKeyDown}
                placeholder="Type a costume"
                autoComplete="off"
              />
              {showSuggestions && (
                <div className="suggestions" ref={suggestionsRef}>
                  {suggestions.length === 0 ? (
                    <div className="suggestion-empty">
                      No match — will use "None" theme
                    </div>
                  ) : (
                    suggestions.map((c, i) => (
                      <div
                        key={c.id}
                        className={`suggestion-item ${i === activeSuggestion ? 'active' : ''}`}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          pickSuggestion(c);
                        }}
                      >
                        <span className="label">{c.label}</span>
                        <span className="meta">{c.theme} · {c.animation}</span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <button
              className="send-btn"
              onClick={sendToStage}
              disabled={!canSend}
            >
              Send to Stage
            </button>
          </section>

          {/* RIGHT — LIST */}
          <section className="bs-list">
            <h2>On Stage Now</h2>
            {currentOnStage ? (
              <div className="child-card">
                <div className="cc-avatar">
                  {currentOnStage.name.charAt(0).toUpperCase()}
                </div>
                <div className="cc-info">
                  <h3>{currentOnStage.name}</h3>
                  <p>{currentOnStage.costumeLabel}</p>
                </div>
              </div>
            ) : (
              <p className="empty">Nothing on stage yet.</p>
            )}

            <h2 style={{ marginTop: '2rem' }}>History</h2>
            <div className="list">
              {children.length === 0 && (
                <p className="empty">No presentations yet.</p>
              )}
              {children.map((c) => (
                <div key={c.id} className="child-card">
                  <div className="cc-avatar">
                    {c.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="cc-info">
                    <h3>{c.name}</h3>
                    <p>{c.costumeLabel || 'None'}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}