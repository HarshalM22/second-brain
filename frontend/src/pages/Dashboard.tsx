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
  type: "twitter" | "youtube" | "instagram" | string;
  id: number;
}

export function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [createPost, setCreatePost] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [activeSection, setActiveSection] = useState("All");

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/second-brain/posts`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((response) => {
        setPosts(response.data.posts);
        setShouldUpdate(false);
      });
  }, [shouldUpdate]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/second-brain/posts/${id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  const filteredCards = posts.filter((card) =>
    activeSection === "All" ? true : card.type === activeSection.toLowerCase()
  );

  return (
    <div className="flex">
      <CreateContent
        open={createPost}
        onClose={() => setCreatePost(false)}
        Update={() => setShouldUpdate(true)}
      />

      <Sidebar setActiveSection={setActiveSection} />

      <div className="flex-grow bg-slate-200 min-h-screen overflow-auto">
        {/* Header without border */}
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

        {/* Grid layout for notes */}
        <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
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
      </div>
    </div>
  );
}
