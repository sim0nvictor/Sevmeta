import { useEffect, useRef, useState } from 'react';

// ==========================================================
// SocialEmbed
// Renders a REAL embed (not a fake card) for a social post.
// Supports: instagram, x (twitter), youtube
//
// Usage:
//   <SocialEmbed platform="instagram" url="https://www.instagram.com/p/CxYz12345/" />
//   <SocialEmbed platform="x" url="https://x.com/sevmetaX/status/2021649744242630809" />
//   <SocialEmbed platform="youtube" url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
// ==========================================================

// ---- helpers to load each platform's embed script once ----
function loadScriptOnce(src, globalCheck) {
  return new Promise((resolve) => {
    if (globalCheck()) return resolve();
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve());
      // in case it already loaded before we attached the listener
      if (globalCheck()) resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
}

function loadInstagramEmbed() {
  return loadScriptOnce(
    'https://www.instagram.com/embed.js',
    () => typeof window !== 'undefined' && window.instgrm
  );
}

function loadTwitterEmbed() {
  return loadScriptOnce(
    'https://platform.twitter.com/widgets.js',
    () => typeof window !== 'undefined' && window.twttr
  );
}

function getYouTubeId(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1);
    if (u.searchParams.get('v')) return u.searchParams.get('v');
    // handles /embed/ID or /shorts/ID links too
    const parts = u.pathname.split('/').filter(Boolean);
    return parts[parts.length - 1];
  } catch {
    return null;
  }
}

// ---- Instagram ----
function InstagramEmbed({ url }) {
  const blockquoteRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setReady(false);

    loadInstagramEmbed().then(() => {
      if (cancelled) return;
      requestAnimationFrame(() => window.instgrm?.Embeds?.process());
    });

    // Instagram's script mutates the blockquote directly (bypassing React),
    // so we watch for it to actually become an iframe before showing it —
    // this is what stops the big unstyled white flash mid-load.
    const node = blockquoteRef.current;
    let observer;
    if (node) {
      observer = new MutationObserver(() => {
        if (node.querySelector('iframe') || node.classList.contains('instagram-media-rendered')) {
          setReady(true);
        }
      });
      observer.observe(node, { attributes: true, attributeFilter: ['class'], childList: true, subtree: true });
    }

    const process = () => window.instgrm?.Embeds?.process();
    window.addEventListener('resize', process);

    // Safety net: if embed.js is slow or blocked, reveal anyway after 4s
    // instead of hiding the post forever.
    const fallback = setTimeout(() => setReady(true), 4000);

    return () => {
      cancelled = true;
      observer?.disconnect();
      window.removeEventListener('resize', process);
      clearTimeout(fallback);
    };
  }, [url]);

  return (
    <div className="relative w-full max-w-full min-w-0 overflow-hidden">
      <style>{`
        .instagram-media, .instagram-media-rendered {
          max-width: 100% !important;
          width: 100% !important;
          min-width: 0 !important;
        }
      `}</style>

      {!ready && (
        <div className="flex h-[420px] w-full flex-col items-center justify-center gap-3 rounded-2xl border border-gray-800 bg-[#161616] animate-pulse">
          <div className="h-10 w-10 rounded-full bg-gray-700" />
          <div className="h-3 w-32 rounded bg-gray-700" />
          <div className="h-3 w-20 rounded bg-gray-700" />
        </div>
      )}

      <div style={{ display: ready ? 'flex' : 'none' }} className="justify-center">
        <blockquote
          ref={blockquoteRef}
          className="instagram-media"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
          style={{ margin: 0, width: '100%', maxWidth: '100%' }}
        />
      </div>
    </div>
  );
}

// ---- X / Twitter ----
function XEmbed({ url }) {
  useEffect(() => {
    let cancelled = false;
    loadTwitterEmbed().then(() => {
      if (cancelled) return;
      window.twttr?.widgets?.load();
    });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <div className="flex justify-center">
      <blockquote className="twitter-tweet" data-theme="dark">
        <a href={url}>{url}</a>
      </blockquote>
    </div>
  );
}

// ---- YouTube ----
function YouTubeEmbed({ url }) {
  const videoId = getYouTubeId(url);
  if (!videoId) return null;

  return (
    <div className="aspect-video w-full overflow-hidden rounded-3xl border border-gray-800">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

// ---- Public component ----
export default function SocialEmbed({ platform, url, caption }) {
  const normalized = platform?.toLowerCase();

  let embed;
  if (normalized === 'instagram') embed = <InstagramEmbed url={url} />;
  else if (normalized === 'x' || normalized === 'twitter') embed = <XEmbed url={url} />;
  else if (normalized === 'youtube') embed = <YouTubeEmbed url={url} />;
  else return null;

  return (
    <div className="w-full max-w-full min-w-0 overflow-hidden rounded-3xl bg-[#111111] border border-gray-800 p-4">
      {embed}
      {caption && <p className="mt-4 text-sm text-gray-400 text-center">{caption}</p>}
    </div>
  );
}