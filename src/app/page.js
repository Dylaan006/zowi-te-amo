'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [phrase, setPhrase] = useState('');
  const [loading, setLoading] = useState(true);
  const [hearts, setHearts] = useState([]);
  const [fade, setFade] = useState(true);

  const randomizeBackground = () => {
    const randomPos = () => `${Math.floor(Math.random() * 80 + 10)}%`;
    const pinks = ['#ffccd5', '#ffb3c1', '#ff8fa3', '#ff758f', '#ff4d6d', '#fff0f3'];
    const randomColor = () => pinks[Math.floor(Math.random() * pinks.length)];

    document.body.style.setProperty('--bg-x1', randomPos());
    document.body.style.setProperty('--bg-y1', randomPos());
    document.body.style.setProperty('--bg-x2', randomPos());
    document.body.style.setProperty('--bg-y2', randomPos());
    document.body.style.setProperty('--bg-color1', randomColor());
    document.body.style.setProperty('--bg-color2', randomColor());
    document.body.style.setProperty('--bg-color3', randomColor());
  };

  const fetchRandomPhrase = async () => {
    setFade(false); // Empezar fade out
    randomizeBackground(); // Cambiar fondo inmediatamente con transición suave

    setTimeout(async () => {
      try {
        const res = await fetch('/api/phrase', { cache: 'no-store' });
        const data = await res.json();
        if (data.phrase) {
          setPhrase(data.phrase);
        }
      } catch (error) {
        setPhrase('Recorda que te amo');
      } finally {
        setFade(true); // Fade in con la nueva frase
        setLoading(false);
      }
    }, 300); // Pequeña espera para el efecto de fade
  };

  useEffect(() => {
    fetchRandomPhrase();

    const initialHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      size: `${Math.random() * 20 + 10}px`
    }));
    setHearts(initialHearts);
  }, []);

  return (
    <main className="container">
      <div className="floating-hearts">
        {hearts.map((heart) => (
          <span
            key={heart.id}
            style={{
              left: heart.left,
              animationDelay: heart.delay,
              fontSize: heart.size,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            ♥
          </span>
        ))}
      </div>

      <h1>Zowi te amo</h1>

      <div className="card">
        <p className={`phrase ${fade ? 'fade-in' : 'fade-out'}`} style={{
          transition: 'opacity 0.5s ease',
          opacity: fade ? 1 : 0
        }}>
          {phrase || "Cargando amor..."}
        </p>
      </div>

      <div className="heart-container" onClick={fetchRandomPhrase} title="Obtener otra frase">
        <svg viewBox="0 0 32 32" className="heart-svg">
          <path d="M16,28.225l-2.112-1.921C6.388,19.467,2,15.485,2,10.601C2,6.619,5.119,3.5,9.101,3.5 c2.251,0,4.411,1.047,5.823,2.7C16.324,4.547,18.484,3.5,20.735,3.5C24.717,3.5,27.836,6.619,27.836,10.601 c0,4.884-4.388,8.866-11.888,15.703L16,28.225z" />
        </svg>
      </div>

      <p style={{ marginTop: '1rem', color: 'rgba(74, 14, 14, 0.6)', fontStyle: 'italic' }}>
        Haz clic en el corazón para una nueva frase y diseño
      </p>
    </main>
  );
}
