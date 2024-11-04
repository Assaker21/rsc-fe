import { useEffect, useState } from "react";
import "./forum.page.scss";
import postService from "@/services/post.service";
import { useParams } from "react-router-dom";
import Post from "@/components/Post/post.component";

export default function Forum() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  function updatePost(newPost) {
    setPost((curr) => {
      return newPost;
    });
  }

  useEffect(() => {
    getPost();
  }, []);

  async function getPost() {
    const [ok, data] = await postService.getPost(id);
    if (ok) {
      setPost(data);
    }
  }

  return (
    <section className="forum-section">
      <Post
        post={post}
        updatePost={updatePost}
        onClick={() => {}}
        type="single"
      />
    </section>
  );
}
