import React from 'react';
import { WallpaperId } from '../../types';

interface WallpaperBackgroundProps {
  wallpaper: WallpaperId;
  dimmed?: boolean;
}

/**
 * Crisp layered Android scenic vector wallpapers (Misty Dawn, Deep Ocean, Warm Twilight)
 * ensuring high legibility for Lock Screen and Home Screen icons across all viewports.
 */
export const WallpaperBackground: React.FC<WallpaperBackgroundProps> = ({
  wallpaper,
  dimmed = false,
}) => {
  const palette =
    wallpaper === 'deep_ocean'
      ? {
          sky: 'from-[#061826] via-[#0B3550] to-[#135D78]',
          glow: 'bg-cyan-400/20',
          ridgeBack: '#0E4863',
          ridgeMid: '#093247',
          ridgeFront: '#041C2B',
        }
      : wallpaper === 'warm_twilight'
      ? {
          sky: 'from-[#1D1836] via-[#3B2651] to-[#7A3E58]',
          glow: 'bg-amber-300/20',
          ridgeBack: '#4E2D5C',
          ridgeMid: '#311D42',
          ridgeFront: '#181129',
        }
      : {
          sky: 'from-[#0B1F33] via-[#134258] to-[#1D6A73]',
          glow: 'bg-teal-300/20',
          ridgeBack: '#155263',
          ridgeMid: '#0E394B',
          ridgeFront: '#07202E',
        };

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden bg-gradient-to-b ${palette.sky}`}
    >
      {/* Subtle atmospheric horizon glow */}
      <div
        className={`absolute -top-12 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl ${palette.glow}`}
      />
      <div className="absolute bottom-24 right-[-20%] h-64 w-64 rounded-full bg-white/5 blur-3xl" />

      {/* Layered misty mountain silhouettes */}
      <svg
        viewBox="0 0 400 320"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 h-[46%] w-full"
      >
        <path
          d="M0,130 C70,85 130,145 215,95 C285,55 345,105 400,75 L400,320 L0,320 Z"
          fill={palette.ridgeBack}
          opacity="0.72"
        />
        <path
          d="M0,185 C85,150 155,195 250,150 C315,120 360,155 400,140 L400,320 L0,320 Z"
          fill={palette.ridgeMid}
          opacity="0.88"
        />
        <path
          d="M0,235 C95,210 190,250 290,215 C345,196 375,212 400,205 L400,320 L0,320 Z"
          fill={palette.ridgeFront}
        />
      </svg>

      {dimmed && <div className="absolute inset-0 bg-slate-950/35" />}
    </div>
  );
};
