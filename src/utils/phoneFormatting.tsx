import React from 'react';
import { LanguageCode } from '../types';

const LOCALE_MAP: Record<LanguageCode, string> = {
  en: 'en-IN',
  ta: 'ta-IN',
  hi: 'hi-IN',
  te: 'te-IN',
  ml: 'ml-IN',
  kn: 'kn-IN',
  bn: 'bn-IN',
};

export function getLocaleForLanguage(language: LanguageCode): string {
  return LOCALE_MAP[language] || 'en-IN';
}

export function formatPhoneClockTime(date: Date, language: LanguageCode): string {
  try {
    return new Intl.DateTimeFormat(getLocaleForLanguage(language), {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date);
  } catch {
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
  }
}

export function formatPhoneLockDate(date: Date, language: LanguageCode): string {
  try {
    return new Intl.DateTimeFormat(getLocaleForLanguage(language), {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    }).format(date);
  } catch {
    return date.toLocaleDateString();
  }
}

export function formatEventTime(isoString: string, language: LanguageCode): string {
  try {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat(getLocaleForLanguage(language), {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return '';
  }
}

export function formatDurationMmSs(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * Safely splits message text to highlight matched suspicious phrases or URLs
 * without using dangerouslySetInnerHTML.
 */
export function renderTextWithHighlights(
  text: string,
  matchedPhrases: string[],
  highlightClassName: string = 'bg-amber-200/90 text-slate-950 font-semibold px-1 rounded'
): React.ReactNode {
  const cleanPhrases = Array.from(
    new Set(
      matchedPhrases
        .map((p) => p.trim())
        .filter((p) => p.length >= 2)
    )
  ).sort((a, b) => b.length - a.length);

  if (cleanPhrases.length === 0) {
    return text;
  }

  const escaped = cleanPhrases.map((p) =>
    p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  );
  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = text.split(pattern);

  if (parts.length <= 1) {
    return text;
  }

  const lowerSet = new Set(cleanPhrases.map((p) => p.toLowerCase()));

  return parts.map((part, idx) => {
    const isMatch = lowerSet.has(part.toLowerCase());
    if (isMatch) {
      return (
        <mark key={idx} className={highlightClassName}>
          {part}
        </mark>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}
