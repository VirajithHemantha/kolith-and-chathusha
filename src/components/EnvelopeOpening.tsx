import React, { useState, useEffect } from "react";
import { Heart } from 'lucide-react';

export function EnvelopeOpening({ onComplete, onMusicStart }: { onComplete: () => void, onMusicStart?: () => void }) {
  const [opened, setOpened] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (opened) {
      if (onMusicStart) onMusicStart();
      
      // Sequence: wait for open flap + slide up, then fade out scene, then transition
      const fadeTimer = setTimeout(() => {
        setFadeOut(true);
      }, 2500);

      const completeTimer = setTimeout(() => {
        onComplete();
      }, 3500); 

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [opened, onComplete, onMusicStart]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Great+Vibes&family=Inter:wght@400;500;600&display=swap');

        .app-shell {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-image: url("/peony%20flowers.png");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          font-family: "Cormorant Garamond", serif;
          overflow: hidden;
          position: relative;
          opacity: ${fadeOut ? 0 : 1};
          transition: opacity 1s ease;
        }

        .paper-texture {
          position: absolute;
          inset: 0;
          background-image: url("https://www.transparenttextures.com/patterns/paper-fibers.png");
          opacity: 0.3;
          pointer-events: none;
          z-index: 0;
        }

        .scene {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 800px;
          padding: 20px;
        }

        .envelope-text {
          position: absolute;
          top: 30%;
          left: 0;
          width: 100%;
          text-align: center;
          transform: translateY(-50%);
          z-index: 5;
          pointer-events: none;
          opacity: ${opened ? 0 : 1};
          transition: opacity 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .envelope-names {
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(28px, 5vw, 46px);
          letter-spacing: 0.15em;
          color: #ffffff;
          text-shadow: 0 2px 8px rgba(0,0,0,0.5);
          line-height: 1;
        }

        .envelope-date {
          font-family: "Inter", sans-serif;
          font-size: clamp(10px, 1.5vw, 12px);
          letter-spacing: 0.4em;
          color: rgba(255, 255, 255, 0.85);
          text-transform: uppercase;
          text-shadow: 0 1px 4px rgba(0,0,0,0.5);
        }

        .envelope-wrapper {
          position: relative;
          width: min(100%, 700px);
          aspect-ratio: 1.6 / 1;
          perspective: 1500px;
          cursor: ${opened ? 'default' : 'pointer'};
          transform: scale(${opened ? 1.05 : 1});
          transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
          filter: drop-shadow(0 25px 40px rgba(150, 90, 60, 0.3));
        }

        .envelope-back {
          position: absolute;
          inset: 0;
          background: #000000;
          border-radius: 16px;
          overflow: hidden;
          z-index: 0;
        }

        .envelope-back::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("https://www.transparenttextures.com/patterns/handmade-paper.png");
          opacity: 0.2;
          mix-blend-mode: multiply;
        }

        .card-container {
          position: absolute;
          inset: 8px 12px;
          background: linear-gradient(180deg, #ffffff, #fafafa);
          border-radius: 10px;
          box-shadow: 0 -4px 15px rgba(0,0,0,0.1);
          transform: translateY(${opened ? '-65%' : '0'});
          transition: transform 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.6s;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          border: 1px solid rgba(212, 175, 55, 0.2);
          overflow: hidden;
        }

        .card-inner {
          position: absolute;
          inset: 12px;
          border: 1px solid rgba(212, 175, 55, 0.4);
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 20px;
        }

        .card-names {
          font-family: "Great Vibes", cursive;
          font-size: clamp(40px, 6vw, 56px);
          color: #000000;
          margin-bottom: 15px;
          line-height: 1;
        }

        .card-details {
          font-family: "Inter", sans-serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #000000;
          opacity: 0.8;
          line-height: 2;
        }

        .flap {
          position: absolute;
          inset: 0;
          border-radius: 16px;
        }

        .flap::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("https://www.transparenttextures.com/patterns/handmade-paper.png");
          opacity: 0.15;
          mix-blend-mode: multiply;
        }

        /* Terracotta / Peach colors for the envelope */
        .flap-bottom {
          clip-path: polygon(0 100%, 50% 48%, 100% 100%);
          background: linear-gradient(to top, #222222, #111111);
          z-index: 3;
        }

        .flap-left {
          clip-path: polygon(0 0, 50% 50%, 0 100%);
          background: linear-gradient(to right, #333333, #222222);
          z-index: 2;
        }

        .flap-right {
          clip-path: polygon(100% 0, 50% 50%, 100% 100%);
          background: linear-gradient(to left, #333333, #222222);
          z-index: 2;
        }

        .flap-top {
          clip-path: polygon(0 0, 50% 52%, 100% 0);
          background: linear-gradient(to bottom, #444444, #333333);
          z-index: ${opened ? 0 : 4};
          transform-origin: top;
          transform: rotateX(${opened ? '180deg' : '0deg'});
          transition: transform 1s cubic-bezier(0.34, 1.56, 0.64, 1), z-index 0s ${opened ? '0.3s' : '0s'};
          box-shadow: ${opened ? 'none' : '0 10px 20px rgba(0,0,0,0.08)'};
        }



        .wax-seal-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 6;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .wax-seal {
          width: 90px;
          height: 90px;
          background: radial-gradient(circle at 35% 35%, #E60000, #990000);
          border-radius: 50%;
          box-shadow: 
            0 8px 15px rgba(100, 40, 20, 0.3),
            inset 0 4px 8px rgba(255, 255, 255, 0.3),
            inset 0 -4px 10px rgba(80, 25, 10, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: ${opened ? 0 : 1};
          transform: scale(${opened ? 1.3 : 1});
          transition: opacity 0.5s ease, transform 0.5s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .wax-seal::after {
          content: "";
          position: absolute;
          inset: 6px;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.15);
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
        }

        .wax-seal-icon {
          color: #FFF3EB;
          filter: drop-shadow(0 2px 3px rgba(0,0,0,0.2));
          z-index: 2;
        }

        .wax-hint {
          margin-top: 24px;
          font-family: "Inter", sans-serif;
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.85);
          opacity: ${opened ? 0 : 1};
          transition: opacity 0.4s ease;
        }

        @media (max-width: 640px) {
          .envelope-wrapper {
            aspect-ratio: 1.4 / 1;
            width: 92%;
          }
          .wax-seal {
            width: 70px;
            height: 70px;
          }
          .wax-hint {
            margin-top: 20px;
            font-size: 9px;
          }
        }
      `}</style>

      <div className="app-shell">
        <div className="paper-texture" />
        
        <div className="scene">


          <div 
            className="envelope-wrapper"
            role="button"
            tabIndex={opened ? -1 : 0}
            aria-label="Open invitation"
            onClick={() => {
              if (!opened) setOpened(true);
            }}
            onKeyDown={(e) => {
              if (!opened && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                setOpened(true);
              }
            }}
          >
            <div className="envelope-back" />
            
            <div className="card-container">
              <div className="card-inner">
                <div className="card-names">Kolith & Chathusha</div>
                <div className="card-details">
                  24 October 2026<br />
                  White Tower Banquet Hall
                </div>
              </div>
            </div>

            <div className="flap flap-left" />
            <div className="flap-right flap" />
            <div className="flap-bottom flap" />
            
            <div className="envelope-text">
              <div className="envelope-names">Kolith & Chathusha</div>
              <div className="envelope-date">24 OCTOBER 2026</div>
            </div>
            
            <div className="flap-top flap" />

            <div className="wax-seal-container">
              <div className="wax-seal">
                <Heart className="wax-seal-icon w-8 h-8" fill="currentColor" />
              </div>
              <div className="wax-hint">TAP TO BREAK SEAL</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}