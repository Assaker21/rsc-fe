import "./rich-text-editor.scss";

import {
  BubbleMenu,
  EditorContent,
  FloatingMenu,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import { Bold, Italic, Underline, Strikethrough } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toggle } from "@/components/ui/toggle";

export default ({ content, onChange, newImage, readOnly, clearContent }) => {
  const editor = useEditor({
    editable: !readOnly,
    extensions: [
      StarterKit,
      Image,
      Placeholder.configure({
        placeholder: () => {
          return "Enter text here...";
        },
      }),
    ],
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    content: content,
  });

  useEffect(() => {
    if (newImage) {
      editor.chain().focus().setImage({ src: newImage }).run();
    }
  }, [newImage]);

  useEffect(() => {
    if (clearContent) {
      editor.commands.clearContent(true);
    }
  }, [clearContent]);

  return (
    <>
      {editor && (
        <BubbleMenu
          className="bubble-menu"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <Card className="sm:col-span-2">
            <ToggleGroup type="multiple">
              <Toggle
                aria-label="Toggle bold"
                pressed={editor.isActive("bold")}
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                style={{ aspectRatio: 1 }}
              >
                <Bold className="h-4 w-4" />
              </Toggle>
              <Toggle
                aria-label="Toggle italic"
                pressed={editor.isActive("italic")}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                style={{ aspectRatio: 1 }}
              >
                <Italic className="h-4 w-4" />
              </Toggle>
              <Toggle
                aria-label="Toggle strike"
                pressed={editor.isActive("strike")}
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                style={{ aspectRatio: 1 }}
              >
                <Strikethrough className="h-4 w-4" />
              </Toggle>
            </ToggleGroup>
          </Card>
        </BubbleMenu>
      )}

      <EditorContent editor={editor} />
    </>
  );
};
