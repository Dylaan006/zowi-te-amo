'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [phrase, setPhrase] = useState('');
  const [loading, setLoading] = useState(true);
  const [hearts, setHearts] = useState([]);

  const fetchRandomPhrase = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/phrase', { cache: 'no-store' });
      const data = await res.json();
      if (data.phrase) {
        setPhrase(data.phrase);
      }
    } catch (error) {
      console.error('Error fetching phrase:', error);
      setPhrase('El amor está en el aire...');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomPhrase();

    // Create floating hearts
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
      <Head>
        <title>Zowi te amo</title>
        <meta name="description" content="Una aplicación romántica para descubrir frases de amor aleatorias." />
      </Head>

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
        {loading ? (
          <div className="phrase" style={{ justifyContent: 'center' }}>
            <div className="loader"></div>
          </div>
        ) : (
          <p className="phrase">{phrase}</p>
        )}
      </div>

      <div className="heart-container" onClick={fetchRandomPhrase} title="Obtener otra frase">
        <svg viewBox="0 0 32 32" className="heart-svg">
          <path d="M16,28.225l-2.112-1.921C6.388,19.467,2,15.485,2,10.601C2,6.619,5.119,3.5,9.101,3.5 c2.251,0,4.411,1.047,5.823,2.7C16.324,4.547,18.484,3.5,20.735,3.5C24.717,3.5,27.836,6.619,27.836,10.601 c0,4.884-4.388,8.866-11.888,15.703L16,28.225z" />
        </svg>
      </div>

      <p style={{ marginTop: '1rem', color: 'rgba(74, 14, 14, 0.6)', fontStyle: 'italic' }}>
        Hace clic en el corazón para una nueva frase
      </p>
    </main>
  );
}
