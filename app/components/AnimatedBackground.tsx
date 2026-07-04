"use client";

import React, { useMemo } from "react";

interface Coin {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

interface Love {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

interface Particle {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
  size: number;
}

export default function AnimatedBackground() {
  const coins: Coin[] = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 15 + Math.random() * 10,
        size: 15 + Math.random() * 20,
        opacity: 0.05 + Math.random() * 0.1,
      })),
    []
  );

  const loves: Love[] = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 12 + Math.random() * 12,
        size: 12 + Math.random() * 18,
        opacity: 0.04 + Math.random() * 0.08,
      })),
    []
  );

  const particles: Particle[] = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 50,
        delay: Math.random() * 4,
        duration: 8 + Math.random() * 8,
        size: 2 + Math.random() * 3,
      })),
    []
  );

  return (
    <>
      <style>{`
        @keyframes floatDown {
          0% {
            transform: translateY(-10vh) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: var(--opacity);
          }
          50% {
            transform: translateY(45vh) translateX(calc(var(--drift) * 0.5)) rotate(180deg);
          }
          90% {
            opacity: var(--opacity);
          }
          100% {
            transform: translateY(110vh) translateX(var(--drift)) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes floatParticle {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          25% {
            opacity: 0.4;
          }
          75% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-30vh) translateX(var(--drift));
            opacity: 0;
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 8px rgba(167, 139, 250, 0.3);
          }
          50% {
            box-shadow: 0 0 16px rgba(167, 139, 250, 0.5);
          }
        }

        .leaf {
          position: fixed;
          pointer-events: none;
          font-size: var(--size);
          will-change: transform;
        }

        .particle {
          position: fixed;
          pointer-events: none;
          border-radius: 50%;
          will-change: transform;
          animation: glow 3s ease-in-out infinite;
        }
      `}</style>

      <div className="fixed inset-0 -z-10 overflow-hidden bg-[#F8F4EC]">
        {/* Soft gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FDF9F1] via-[#F8F4EC] to-[#F3EAE0] opacity-60" />

        {/* Very subtle texture */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #D2B48C 0px, #D2B48C 1px, transparent 1px, transparent 2px)",
          }}
        />

        {/* Floating coins */}
        {coins.map((coin) => (
            <div
            key={`coin-${coin.id}`}
            className="leaf"
            style={
              {
                left: `${coin.left}%`,
                "--size": `${coin.size}px`,
                "--opacity": coin.opacity,
                "--drift": `${(Math.random() - 0.5) * 100}px`,
                animation: `floatDown ${coin.duration}s linear infinite`,
                animationDelay: `${coin.delay}s`,
              } as React.CSSProperties
            }
          >
            <span role="img" aria-label="coin">
              💰
            </span>
          </div>
        ))}

        {/* Floating love drops */}
        {loves.map((love) => (
            <div
            key={`love-${love.id}`}
            className="leaf"
            style={
              {
                left: `${love.left}%`,
                "--size": `${love.size}px`,
                "--opacity": love.opacity,
                "--drift": `${(Math.random() - 0.5) * 100}px`,
                animation: `floatDown ${love.duration}s linear infinite`,
                animationDelay: `${love.delay}s`,
              } as React.CSSProperties
            }
          >
            <span role="img" aria-label="love">
              💕
            </span>
          </div>
        ))}                 
          </div>

        {/* Glowing particles */}
        {particles.map((particle) => (
          <div
            key={`particle-${particle.id}`}
            className="particle"
            style={
              {
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: "rgba(167, 139, 250, 0.3)",
                "--drift": `${(Math.random() - 0.5) * 50}px`,
                animation: `floatParticle ${particle.duration}s ease-in-out infinite`,
                animationDelay: `${particle.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}
    </>
  );
}
