import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import RichTextEditor from "../RichTextEditor/rich-text-editor";

import "./new-post.component.scss";
import { Button } from "../ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toggle } from "@/components/ui/toggle";
import { useState, useRef } from "react";
import { Image, Plus, Loader2 } from "lucide-react";
import postService from "@/services/post.service";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function NewPost({ post, onChange, createPost, type }) {
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clearContent, setClearContent] = useState(false);

  const fileInputRef = useRef(null);

  const handleImageButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type.split("/")[0];
      if (fileType !== "image") {
        console.error("Only image files are allowed.");
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        console.error("File size exceeds the maximum allowed size (5MB).");
        return;
      }

      setLoading(true);
      const [ok, data] = await postService.uploadImage(file);
      setLoading(false);
      if (ok) {
        setNewImage("http://localhost:3000/" + data);
      }
    }
  };

  const handleCreatePost = async () => {
    setLoading(true);
    await createPost(post);
    setLoading(false);
    onChange({ title: "", description: "" });
    setClearContent(Math.random());
  };

  return (
    <Card className="sm:col-span-2">
      {type !== "comment" && (
        <CardHeader className="pb-3" style={{ marginTop: "-0.6rem" }}>
          <CardTitle>
            <input
              className="new-post-title-input"
              placeholder="What's new?"
              value={post.title}
              onChange={(e) => {
                onChange({ title: e.target.value });
              }}
            />
          </CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <RichTextEditor
          content={post.description}
          onChange={(content) => onChange({ description: content })}
          newImage={newImage}
          clearContent={clearContent}
        />
      </CardContent>
      <CardFooter className="new-post-footer">
        <div
          className={`new-post-buttons-container${
            type === "comment" ? " end" : ""
          }`}
        >
          {type !== "comment" && (
            <ToggleGroup type="multiple">
              <Button
                size="icon"
                variant="ghost"
                disabled={loading}
                onClick={() => {
                  handleImageButtonClick();
                }}
              >
                {!loading && <Image className="h-4 w-4" />}
                {loading && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
              </Button>
            </ToggleGroup>
          )}
          <Button
            disabled={
              loading ||
              !post?.description ||
              post.description == "" ||
              post.description == "<p></p>" ||
              (type !== "comment" && (!post?.title || post.title == ""))
            }
            onClick={handleCreatePost}
          >
            {!loading && (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Create post
              </>
            )}
            {loading && <Loader2 className="m-2 h-4 w-4 animate-spin" />}
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            accept="image/*"
          />
        </div>
      </CardFooter>
    </Card>
  );
}
