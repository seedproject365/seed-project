'use client';

import { useEffect, useState } from 'react';

type FloatingEmoji = {
  id: number;
  emoji: string;
  size: number;
  opacity: number;
  duration: string;
  delay: string;
  startX: string;
  startY: string;
  endX: string;
  endY: string;
  rotateStart: string;
  rotateEnd: string;
  blur: number;
};

type Particle = {
  id: number;
  size: number;
  left: string;
  top: string;
  duration: string;
  delay: string;
  opacity: number;
};

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function createFloatingEmojis(): FloatingEmoji[] {
  const emojis = ['💰', '❤️'];

  return Array.from({ length: 10 }, (_, index) => {
    const emoji = emojis[index % emojis.length];
    const size = randomBetween(18, 36);
    const opacity = randomBetween(0.3, 0.8);
    const duration = `${randomBetween(20, 28)}s`;
    const delay = `${randomBetween(-12, 0)}s`;
    const blur = randomBetween(0, 0.6);

    return {
      id: index,
      emoji,
      size,
      opacity,
      duration,
      delay,
      startX: `${randomBetween(8, 92)}vw`,
      startY: '-12vh',
      endX: `${randomBetween(10, 90)}vw`,
      endY: '112vh',
      rotateStart: `${randomBetween(-8, 8)}deg`,
      rotateEnd: `${randomBetween(-16, 16)}deg`,
      blur,
    };
  });
}

function createParticles(): Particle[] {
  return Array.from({ length: 14 }, (_, index) => ({
    id: index,
    size: randomBetween(2, 5),
    left: `${randomBetween(5, 95)}%`,
    top: `${randomBetween(5, 95)}%`,
    duration: `${randomBetween(8, 16)}s`,
    delay: `${randomBetween(0, 8)}s`,
    opacity: randomBetween(0.15, 0.45),
  }));
}

export function AnimatedBackground() {
  const [emojis, setEmojis] = useState<FloatingEmoji[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setEmojis(createFloatingEmojis());
    setParticles(createParticles());
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.85),_transparent_55%),linear-gradient(135deg,_#f9f2e7_0%,_#f4e6d5_45%,_#efe0c8_100%)]" />
      <div className="absolute inset-0 opacity-80" style={{
        backgroundImage:
          'linear-gradient(120deg, rgba(124, 87, 54, 0.06) 0%, rgba(124, 87, 54, 0.02) 34%, transparent 100%), radial-gradient(circle at 20% 20%, rgba(255,255,255,0.7), transparent 20%), radial-gradient(circle at 80% 15%, rgba(223, 188, 145, 0.16), transparent 25%), linear-gradient(0deg, rgba(255,255,255,0.14), rgba(255,255,255,0.14))',
        backgroundBlendMode: 'screen, normal, normal, overlay',
        filter: 'contrast(1.02)',
      }} />
      <div className="absolute inset-0 opacity-60" style={{
        backgroundImage:
          'radial-gradient(circle, rgba(255,255,255,0.45) 0 1px, transparent 1px)',
        backgroundSize: '12px 12px',
        mixBlendMode: 'soft-light',
      }} />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle, rgba(255, 245, 230, 0.55), transparent 55%)',
        filter: 'blur(70px)',
        transform: 'translate3d(0, 0, 0)',
      }} />

      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.left,
            top: particle.top,
            opacity: particle.opacity,
            background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(214, 167, 105, 0.35) 45%, transparent 100%)',
            filter: 'blur(0.6px)',
            animation: `driftParticle ${particle.duration} ease-in-out ${particle.delay} infinite`,
            transform: 'translate3d(0, 0, 0)',
          }}
        />
      ))}

      {emojis.map((item) => (
        <span
          key={item.id}
          className="absolute select-none will-change-transform"
          style={{
            left: item.startX,
            top: item.startY,
            fontSize: `${item.size}px`,
            lineHeight: 1,
            display: 'inline-block',
            fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif',
            opacity: 0,
            animation: `floatEmoji ${item.duration} ease-in-out ${item.delay} infinite`,
            filter: `blur(${item.blur}px)`,
            ['--emoji-opacity' as string]: item.opacity,
            ['--move-x' as string]: `${item.endX === item.startX ? '0vw' : item.endX}`,
            ['--move-y' as string]: `${item.endY === item.startY ? '0vh' : item.endY}`,
            ['--rotate-start' as string]: item.rotateStart,
            ['--rotate-end' as string]: item.rotateEnd,
          }}
        >
          {item.emoji}
        </span>
      ))}

      <style jsx global>{`
        @keyframes floatEmoji {
          0% {
            transform: translate3d(0, 0, 0) rotate(var(--rotate-start));
            opacity: 0;
          }
          10% {
            opacity: var(--emoji-opacity);
          }
          90% {
            opacity: var(--emoji-opacity);
          }
          100% {
            transform: translate3d(var(--move-x), var(--move-y), 0) rotate(var(--rotate-end));
            opacity: 0;
          }
        }

        @keyframes driftParticle {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(0.95);
            opacity: 0.12;
          }
          50% {
            transform: translate3d(1.3vw, -1.3vh, 0) scale(1.05);
            opacity: 0.35;
          }
        }
      `}</style>
    </div>
  );
}
