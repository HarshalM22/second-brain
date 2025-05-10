import { useRef, useState, useEffect, useCallback } from "react";
import { Cross } from "../icons/Cross";
import { TwitterIcon } from "../icons/TwitterIcon";
import { Youtube } from "../icons/Youtube";
import { InstagramIcon } from "../icons/InstagramIcon";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { Link } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  Update: () => void;
}

type ContentType = "youtube" | "twitter" | "instagram" | "links";

const CONTENT_TYPES: {
  type: ContentType;
  label: string;
  icon: JSX.Element;
}[] = [
  { type: "youtube", label: "Youtube", icon: <Youtube /> },
  { type: "twitter", label: "Twitter", icon: <TwitterIcon /> },
  { type: "instagram", label: "Instagram", icon: <InstagramIcon /> },
  { type: "links", label: "Links", icon: <Link /> },
];

export function CreateContent({ open, onClose, Update }: Props) {
  const titleref = useRef<HTMLInputElement>(null);
  const linkref = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [type, setType] = useState<ContentType>("youtube");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setError(null);
      setLoading(false);
      setType("youtube");
      setTimeout(() => titleref.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Trap focus inside modal
  useEffect(() => {
    if (!open) return;
    const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];

    function handleTab(e: KeyboardEvent) {
      if (!focusable || focusable.length === 0) return;
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleTab);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleTab);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  const validateInputs = useCallback(() => {
    const title = titleref.current?.value?.trim();
    const link = linkref.current?.value?.trim();
    if (!title) return "Title is required.";
    if (!link) return "Link is required.";
    try {
      new URL(link);
    } catch {
      return "Please enter a valid URL.";
    }
    return null;
  }, []);

  async function createPost() {
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/second-brain/create-post`,
        {
          title: titleref.current?.value,
          link: linkref.current?.value,
          type,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      onClose();
      Update();
    } catch (e: any) {
      setError(e?.response?.data?.message || "Something went wrong.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl p-7 w-full max-w-md shadow-2xl flex flex-col items-center gap-6 relative border border-slate-200 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
        style={{
          animation: "fadeInScale 0.25s cubic-bezier(.4,2,.6,1) both"
        }}
      >
        {/* Header */}
        <div className="w-full flex items-center justify-between mb-2">
          <div />
          <div className="text-2xl font-extrabold text-gray-800 tracking-tight text-center flex-1">
            Create Post
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 focus:outline-none rounded-full p-1 transition-colors"
            aria-label="Close Modal"
            style={{ fontSize: 22 }}
          >
            <Cross />
          </button>
        </div>
        {/* Inputs */}
        <div className="w-full flex flex-col gap-4">
          <label className="font-semibold text-sm text-gray-700">Title</label>
          <input
            ref={titleref}
            type="text"
            placeholder="Title here..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <label className="font-semibold text-sm text-gray-700 mt-2">Link</label>
          <input
            ref={linkref}
            type="url"
            placeholder="Link here..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>
        {/* Content Type Buttons */}
        <div className="flex gap-4 flex-wrap justify-center w-full mt-2">
          {CONTENT_TYPES.map(({ type: ctype, label, icon }) => (
            <button
              key={ctype}
              type="button"
              onClick={() => setType(ctype)}
              aria-pressed={type === ctype}
              className={`
                flex items-center gap-2 px-7 py-2 rounded-full font-semibold transition-all duration-150
                shadow-sm border
                text-base
                ${
                  type === ctype
                    ? "bg-[#FF0000] text-white border-[#FF0000] shadow-lg" // Youtube
                    : ctype === "twitter"
                    ? "bg-white text-black border-black hover:bg-gray-100"
                    : ctype === "instagram"
                    ? "bg-white text-black border-black hover:bg-gray-100"
                    : "bg-slate-100 text-gray-700 hover:bg-slate-200"
                }
              `}
              style={{
                minWidth: 140,
                justifyContent: "center",
                boxShadow: type === ctype ? "0 4px 14px 0 rgba(0,0,0,0.12)" : undefined
              }}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
        {/* Error */}
        {error && (
          <div className="w-full text-center text-red-600 text-sm font-medium bg-red-50 rounded-lg py-1 px-2 border border-red-200 mt-2">
            {error}
          </div>
        )}
        {/* Submit Button */}
        <button
          className={`
            mt-8 w-full py-3 rounded-lg text-lg font-bold transition
            ${loading
              ? "bg-blue-300 text-black cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-black shadow-md border"}
          `}
          onClick={createPost}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Create"}
        </button>
      </div>
      {/* Animation keyframes */}
      <style>{`
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.95);}
          100% { opacity: 1; transform: scale(1);}
        }
      `}</style>
    </div>
  );
}
