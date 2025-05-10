import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Sidebar } from "../components/Sidebar";
import { Plus } from "../icons/Plus";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { CreateContent } from "../components/CreateContent";

interface Post {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "instagram" | "links" |string;
  id: number;
}

const sectionToType: Record<string, string | undefined> = {
  Tweets: "twitter",
  Videos: "youtube",
  Instagram: "instagram",
  Link :"links" 
};

export function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [createPost, setCreatePost] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [activeSection, setActiveSection] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${BACKEND_URL}/api/v1/second-brain/posts`, {
          headers: { token: localStorage.getItem("token") || "" },
        });
        setPosts(response.data.posts || []);
      } catch (err: any) {
        setError("Failed to load posts.");
        console.error(err);
      } finally {
        setLoading(false);
        setShouldUpdate(false);
      }
    }

    fetchPosts();
  }, [shouldUpdate]);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/v1/second-brain/delete-post`, {
        headers: { token: localStorage.getItem("token") || "" },
        data: { id },
      });
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      console.error("Failed to delete post", err);
      alert("Failed to delete post. Please try again.");
    }
  };

  // --- FILTERING LOGIC ---
  const filteredCards = posts.filter((card) => {
    if (activeSection === "All") return true;
    const type = sectionToType[activeSection];
    return card.type === type;
  });

  return (
    <div className="flex">
      <CreateContent
        open={createPost}
        onClose={() => setCreatePost(false)}
        Update={() => setShouldUpdate(true)}
      />

      <Sidebar setActiveSection={setActiveSection} />

      <div className="flex-grow bg-slate-200 min-h-screen overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 bg-slate-200">
          <h1 className="text-2xl font-bold text-gray-800">
            {activeSection.toUpperCase()} NOTES
          </h1>
          <Button
            variant="primary"
            text="Add content"
            startIcon={<Plus />}
            onClick={() => setCreatePost(true)}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="text-center text-gray-600">Loading posts...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : filteredCards.length === 0 ? (
            <div className="text-center text-gray-500">No posts found.</div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {filteredCards.map((post) => (
                <Card
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  type={post.type}
                  link={post.link}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
