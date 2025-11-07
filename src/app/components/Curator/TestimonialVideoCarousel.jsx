"use client";
import React, { useRef, useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

// shadcn Carousel (built on Embla)
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";

/* --------- Helper: Extract YouTube ID --------- */
const getYouTubeId = (input = "") => {
  const iframeSrcMatch = input.match(/src=["']([^"']+)["']/);
  const srcUrl = iframeSrcMatch ? iframeSrcMatch[1] : input;
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtube\.com\/embed\/([^?&]+)/,
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/shorts\/([^?&]+)/,
  ];
  for (const p of patterns) {
    const m = srcUrl.match(p);
    if (m) return m[1];
  }
  return null;
};

export default function TourVideoTestimonials({ videos = [] }) {
  const [api, setApi] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingIndex, setPlayingIndex] = useState(null);

  const videoRefs = useRef([]);
  const ytPlayers = useRef({});
  const ytReady = useRef(false);
  const hasYouTube = videos.some((v) => !!getYouTubeId(v));

  /* --- Load YouTube API if needed --- */
  useEffect(() => {
    if (!hasYouTube || typeof window === "undefined") return;

    if (window.YT && window.YT.Player) {
      ytReady.current = true;
      return;
    }

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      ytReady.current = true;
    };
  }, [hasYouTube]);

  /* --- Track Carousel selection --- */
  useEffect(() => {
    if (!api) return;
    const onSelect = () => setActiveIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    setActiveIndex(api.selectedScrollSnap());
    return () => api.off("select", onSelect);
  }, [api]);

  /* --- Pause all videos --- */
  const pauseAll = () => {
    videoRefs.current.forEach((v) => {
      if (!v) return;
      v.pause();
      v.muted = true;
    });
    Object.values(ytPlayers.current).forEach((p) => {
      try {
        p.pauseVideo();
        p.mute();
      } catch {}
    });
  };

  /* --- Play specific index --- */
  const startIndex = (i) => {
    const v = videoRefs.current[i];
    const yt = ytPlayers.current[i];
    pauseAll();

    if (v) {
      v.muted = false;
      v.play().catch(() => {});
    } else if (yt) {
      try {
        yt.unMute();
        yt.playVideo();
      } catch {}
    }

    setPlayingIndex(i);
    setActiveIndex(i);
    api?.scrollTo(i);
  };

  /* --- Handle toggle on click --- */
  const handleToggle = (i) => {
    if (playingIndex === i) {
      const v = videoRefs.current[i];
      const yt = ytPlayers.current[i];
      if (v) {
        v.muted = true;
        v.pause();
      } else if (yt) {
        try {
          yt.mute();
          yt.pauseVideo();
        } catch {}
      }
      setPlayingIndex(null);
      return;
    }
    startIndex(i);
  };

  if (!videos.length) return null;

  return (
    <section id="video-testimonials" className="scroll-mt-28 mt-6">
      <Carousel
        setApi={setApi}
        opts={{ align: "center", loop: true }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {videos.map((src, i) => {
            const id = getYouTubeId(src);
            const isYouTube = !!id;

            return (
              <CarouselItem
                key={i}
                className="pl-3 basis-[90%] sm:basis-1/2 md:basis-1/3 lg:basis-[25%]"
              >
                <VideoCard
                  src={src}
                  youTubeId={id}
                  isYouTube={isYouTube}
                  isMuted={playingIndex !== i}
                  ytReady={ytReady.current}
                  attachVideoRef={(el) => (videoRefs.current[i] = el)}
                  registerYT={(player) => (ytPlayers.current[i] = player)}
                  onClick={() => handleToggle(i)}
                  onMuteToggle={() => handleToggle(i)}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Arrows */}
        <CarouselPrevious className="left-2 border-0" />
        <CarouselNext className="right-2 border-0" />
      </Carousel>
    </section>
  );
}

/* --------------------------- Video Card --------------------------- */
function VideoCard({
  src,
  youTubeId,
  isYouTube,
  isMuted,
  ytReady,
  attachVideoRef,
  registerYT,
  onClick,
  onMuteToggle,
}) {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isYouTube || !ytReady || !iframeRef.current || !youTubeId) return;

    const player = new window.YT.Player(iframeRef.current, {
      videoId: youTubeId,
      playerVars: {
        controls: 0,
        modestbranding: 1,
        disablekb: 1,
        fs: 0,
        rel: 0,
        iv_load_policy: 3,
        playsinline: 1,
      },
      events: {
        onReady: (e) => {
          registerYT(e.target);
          if (isMuted) e.target.mute();
          else e.target.unMute();
        },
      },
    });

    return () => {
      try {
        player.destroy();
      } catch {}
    };
  }, [isYouTube, ytReady, youTubeId]);

  return (
    <div
      className="relative aspect-[9/16] bg-black rounded-xl overflow-hidden shadow-lg cursor-pointer"
      onClick={onClick}
    >
      {isYouTube ? (
        <div ref={iframeRef} className="absolute inset-0 w-full h-full" />
      ) : (
        <video
          ref={attachVideoRef}
          src={src}
          loop
          playsInline
          muted={isMuted}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div className="absolute bottom-3 left-3 z-10">
        <Button
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onMuteToggle();
          }}
          className="bg-black/50 hover:bg-black/70 text-white rounded-full"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </Button>
      </div>
    </div>
  );
}
