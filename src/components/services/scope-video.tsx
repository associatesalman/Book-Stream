"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * Muted, looping, inline autoplay video (requested by the client for the Audiobook Production scope section).
 * - The poster shows until playback starts, and stays if the browser blocks autoplay.
 * - A pause/play button lets visitors stop the motion (WCAG 2.2.2). With "reduce motion" set, the video waits on its
 *   poster until the visitor presses play.
 */
export function ScopeVideo({ src, poster, label, className }: { src: string; poster: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Turn autoplay off and reset the element, which brings the poster back if a frame already played.
      video.autoplay = false;
      video.load();
      return;
    }
    // `autoPlay` normally starts it; this covers browsers that need an explicit call, and syncs the button when
    // playback began before hydration (its "play" event already fired). A rejection leaves the poster.
    video.play().then(
      () => setPlaying(true),
      () => setPlaying(false),
    );
  }, []);

  function toggle() {
    const video = ref.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  }

  return (
    <div className={className}>
      <div className="relative aspect-[9/16] overflow-hidden rounded-[4px] bg-ink">
        <video
          ref={ref}
          className="absolute inset-0 size-full object-cover"
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label={label}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <a href={src}>Download the audiobook production video</a>
        </video>
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause video" : "Play video"}
          className="absolute right-2.5 bottom-2.5 flex size-9 items-center justify-center rounded-full bg-ink/70 text-white hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {playing ? <Pause className="size-4" aria-hidden /> : <Play className="size-4 translate-x-px" aria-hidden />}
        </button>
      </div>
    </div>
  );
}
