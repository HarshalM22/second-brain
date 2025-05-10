
import { Trash, Youtube, Twitter, Instagram, Link as LinkIcon } from "lucide-react";
import { ReactNode, useEffect, useRef } from "react";

interface CardProps {
  id:  number;
  title: string;
  type: "youtube" | "twitter" | "instagram" | "link" | string;
  link: string;
  onDelete: (id: number) => void;
  deleteLoading?: boolean;
}

const getTypeIcon = (type: string): ReactNode => {
  switch (type) {
    case "youtube": return <Youtube className="text-red-600" size={20} />;
    case "twitter": return <Twitter className="text-blue-400" size={20} />;
    case "instagram": return <Instagram className="text-pink-600" size={20} />;
    case "link": return <LinkIcon className="text-green-600" size={20} />;
    default: return <LinkIcon className="text-gray-400" size={20} />;
  }
};

const YouTubeEmbed = ({ link }: { link: string }) => {
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
      ></iframe>
    </div>
  );
};

const TwitterEmbed = ({ link }: { link: string }) => {
  const twitterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.twttr) {
      const script = document.createElement("script");
      script.setAttribute("src", "https://platform.twitter.com/widgets.js");
      script.setAttribute("async", "true");
      document.body.appendChild(script);
      script.onload = () => renderTweet();
    } else {
      renderTweet();
    }

    function renderTweet() {
      if (twitterRef.current && window.twttr) {
        twitterRef.current.innerHTML = "";
        const tweetId = extractTwitterID(link);
        if (tweetId) {
          window.twttr.widgets.createTweet(
            tweetId,
            twitterRef.current,
            {
              theme: "light",
              align: "center",
              conversation: "none",
              width: 320,
            }
          );
        }
      }
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

const InstagramEmbed = ({ link }: { link: string }) => {
  const instagramRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!document.getElementById("instagram-embed-script")) {
      const script = document.createElement("script");
      script.id = "instagram-embed-script";
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
      script.onload = processEmbeds;
    } else {
      processEmbeds();
    }
    function processEmbeds() {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
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

// --- NEW: Link Preview ---
const LinkPreview = ({ url, title }: { url: string; title: string }) => {
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
      <div className="text-blue-600 underline text-center break-all">{title || url}</div>
    </a>
  );
};

function extractYouTubeID(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function extractTwitterID(url: string): string {
  const regex = /\/status\/(\d+)/;
  const match = url.match(regex);
  return match ? match[1] : "";
}

// --- THE CARD COMPONENT ---
export function Card({ id, title, type, link, onDelete, deleteLoading = false }: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 w-full h-[350px] overflow-hidden flex flex-col">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-2">
        {/* Icon */}
        <div className="flex-shrink-0">{getTypeIcon(type)}</div>
        {/* Title */}
        <div className="flex-1 text-center px-2">
          <h2 className="font-semibold text-gray-800 text-base truncate">{title}</h2>
        </div>
        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-300"
            title="Delete"
            aria-label="Delete content"
            onClick={() => onDelete(id)}
            disabled={deleteLoading}
          >
            {deleteLoading ? (
              <svg className="animate-spin h-5 w-5 text-red-500" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <Trash className="text-red-500 hover:text-red-700" size={18} />
            )}
          </button>
        </div>
      </div>
      {/* Content */}
      <div className="flex-grow flex items-center justify-center mt-2 overflow-hidden">
        {type === "youtube" && <YouTubeEmbed link={link} />}
        {type === "twitter" && <TwitterEmbed link={link} />}
        {type === "instagram" && <InstagramEmbed link={link} />}
        {type === "link" && <LinkPreview url={link} title={title} />}
        {/* Fallback for unknown types */}
        {["youtube", "twitter", "instagram", "link"].indexOf(type) === -1 && (
          <LinkPreview url={link} title={title} />
        )}
      </div>
    </div>
  );
}

