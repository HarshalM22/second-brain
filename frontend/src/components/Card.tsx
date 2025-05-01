import { Share } from "../icons/Share";
 import { Trash, Youtube, Twitter, Instagram } from "lucide-react";
 import { ReactNode, useEffect, useState } from "react";
 
 interface CardProps {
   id: string | number;
   title: string;
   type: "youtube" | "twitter" | "instagram" | string;
   link: string;
   onDelete: (id: string | number) => void;
 }
 
 const getTypeIcon = (type: string): ReactNode => {
   switch (type) {
     case "youtube":
       return <Youtube className="text-red-500" size={20} />;
     case "twitter":
       return <Twitter className="text-blue-500" size={20} />;
     case "instagram":
       return <Instagram className="text-pink-500" size={20} />;
     default:
       return null;
   }
 };
 
 const YouTubeEmbed = ({ link }: { link: string }) => {
   const getYouTubeEmbedLink = (url: string) => {
     const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
     return match ? `https://www.youtube.com/embed/${match[1]}` : url;
   };
 
   return (
     <div className="aspect-video">
       <iframe
         className="w-full h-full rounded-lg"
         src={getYouTubeEmbedLink(link)}
         title="YouTube video player"
         frameBorder="0"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
         allowFullScreen
       ></iframe>
     </div>
   );
 };
 
 const TwitterEmbed = ({ link }: { link: string }) => (
   <blockquote className="twitter-tweet">
     <a href={link.replace("x.com", "twitter.com")} target="_blank" rel="noopener noreferrer">
       View Tweet
     </a>
   </blockquote>
 );
 
 const InstagramEmbed = ({ link }: { link: string }) => (
   <blockquote
     className="instagram-media"
     data-instgrm-permalink={link}
     data-instgrm-version="14"
     style={{ width: "100%" }}
   >
     <a href={link} target="_blank" rel="noopener noreferrer">
       View on Instagram
     </a>
   </blockquote>
 );
 
 export function Card({ id, title, type, link, onDelete }: CardProps) {
   const [instagramScriptLoaded, setInstagramScriptLoaded] = useState(false);
 
   useEffect(() => {
     if (type === "instagram" && !instagramScriptLoaded) {
       const script = document.createElement("script");
       script.src = "https://www.instagram.com/embed.js";
       script.async = true;
       script.onload = () => setInstagramScriptLoaded(true);
       document.body.appendChild(script);
     }
   }, [type, instagramScriptLoaded]);
 
   return (
     <div className="bg-white hover:shadow-xl rounded-xl shadow-sm p-3 w-full min-h-[200px] flex flex-col justify-between relative">
       {/* Type icon in top-left */}
       <div className="absolute top-3 left-3">{getTypeIcon(type)}</div>
 
       {/* Share + Delete in top-right */}
       <div className="absolute top-3 right-3 flex gap-2">
         <button title="Share">
           <Share />
         </button>
         <button onClick={() => onDelete(id)} title="Delete">
           <Trash className="text-red-500 hover:text-red-700" size={18} />
         </button>
       </div>
 
       {/* Title */}
       <h2 className="text-center text-base font-semibold mt-6">{title}</h2>
 
       {/* Content based on type */}
       <div className="pt-4">
         {type === "youtube" && <YouTubeEmbed link={link} />}
         {type === "twitter" && <TwitterEmbed link={link} />}
         {type === "instagram" && instagramScriptLoaded && <InstagramEmbed link={link} />}
       </div>
     </div>
   );
 }