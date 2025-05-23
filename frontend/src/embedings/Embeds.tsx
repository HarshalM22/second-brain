import { useEffect, useRef } from "react";

// ----------- YOUTUBE EMBED -----------
export const YouTubeEmbed = ({ link }: { link: string }) => {
  const videoId = extractYouTubeID(link);
  if (!videoId) return <div className="text-red-500">Invalid YouTube URL</div>;

  return (
    <div className="aspect-video w-full">
      <iframe
        className="w-full h-full rounded-md"
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        frameBorder="0"
      />
    </div>
  );
};

// ----------- TWITTER EMBED -----------
declare global {
  interface Window {
    twttr?: {
      widgets: {
        createTweet: (
          id: string,
          element: HTMLElement,
          options?: {
            theme?: "dark" | "light";
            align?: "left" | "center" | "right";
            conversation?: "none" | "all";
            width?: number;
          }
        ) => Promise<void>;
      };
    };
  }
}

export const TwitterEmbed = ({ link }: { link: string }) => {
  const twitterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderTweet = () => {
      if (twitterRef.current && window.twttr) {
        twitterRef.current.innerHTML = "";
        const tweetId = extractTwitterID(link);
        if (tweetId) {
          window.twttr.widgets.createTweet(tweetId, twitterRef.current, {
            theme: "light",
            align: "center",
            conversation: "none",
            width: 320,
          });
        }
      }
    };

    if (!window.twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.onload = () => renderTweet();
      document.body.appendChild(script);
    } else {
      renderTweet();
    }
  }, [link]);

  return (
    <div className="flex justify-center w-full">
      <div
        ref={twitterRef}
        className="rounded-lg bg-slate-50 p-2 w-full max-w-[340px] min-h-[200px] flex items-center justify-center"
        style={{
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
        }}
      />
    </div>
  );
};

// ----------- INSTAGRAM EMBED -----------
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

export const InstagramEmbed = ({ link }: { link: string }) => {
  const instagramRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    const processEmbeds = () => {
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
      }
    };

    if (!document.getElementById("instagram-embed-script")) {
      const script = document.createElement("script");
      script.id = "instagram-embed-script";
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = processEmbeds;
      document.body.appendChild(script);
    } else {
      processEmbeds();
    }
  }, [link]);

  return (
    <div className="instagram-container w-full">
      <blockquote
        ref={instagramRef}
        className="instagram-media"
        data-instgrm-permalink={link}
        data-instgrm-version="14"
        style={{
          margin: 0,
          width: "100%",
          maxWidth: "540px",
          minWidth: "326px",
        }}
      >
        <a href={link} target="_blank" rel="noopener noreferrer">
          View on Instagram
        </a>
      </blockquote>
    </div>
  );
};

// ----------- LINK PREVIEW -----------
export const LinkPreview = ({ url, title }: { url: string; title: string }) => {
  let domain: string;
  try {
    domain = new URL(url).hostname.replace(/^www\./, "");
  } catch {
    domain = url;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center justify-center w-full h-full p-4 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 transition"
    >
      <div className="flex items-center gap-2 mb-2">
        <img
          src={`https://www.google.com/s2/favicons?sz=32&domain_url=${url}`}
          alt=""
          className="w-6 h-6"
        />
        <span className="text-gray-700 text-sm font-medium">{domain}</span>
      </div>
      <div className="text-blue-600 underline text-center break-all">
        {title || url}
      </div>
    </a>
  );
};

// ----------- HELPERS -----------
export function extractYouTubeID(url: string): string | null {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export function extractTwitterID(url: string): string {
  const regex = /\/status\/(\d+)/;
  const match = url.match(regex);
  return match ? match[1] : "";
}
