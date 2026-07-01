"use client";

import { memo } from "react";

function Grain({ zIndex = 1 }: { zIndex?: number }) {
  return (
    <>
      <div className="grain-coarse" style={{ zIndex }} />
      <div className="grain-fine" style={{ zIndex }} />
      <style>{`
        .grain-coarse,
        .grain-fine {
          position: absolute;
          inset: -50%;
          width: 200%;
          height: 200%;
          pointer-events: none;
          mix-blend-mode: screen;
        }
        .grain-coarse {
          opacity: 0.2;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g1'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.35' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g1)'/%3E%3C/svg%3E");
          background-size: 280px 280px;
          animation: grainA 0.6s steps(1) infinite;
        }
        .grain-fine {
          opacity: 0.15;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g2)'/%3E%3C/svg%3E");
          background-size: 180px 180px;
          animation: grainB 0.5s steps(1) infinite;
        }
        @keyframes grainA {
          0%   { transform: translate(0, 0); }
          25%  { transform: translate(-7%, -4%); }
          50%  { transform: translate(-13%, 7%); }
          75%  { transform: translate(5%, -9%); }
          100% { transform: translate(-4%, 11%); }
        }
        @keyframes grainB {
          0%   { transform: translate(0, 0); }
          25%  { transform: translate(6%, 9%); }
          50%  { transform: translate(-9%, -6%); }
          75%  { transform: translate(11%, 4%); }
          100% { transform: translate(-6%, -11%); }
        }
      `}</style>
    </>
  );
}

export default memo(Grain);
