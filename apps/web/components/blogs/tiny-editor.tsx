"use client";
import type { Editor as TinyMCEEditor } from "tinymce";

import { BACKEND_API_HOST } from "@/constants/services";
import { useDebounce } from "@/hooks/useDebounce";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import DOMpurify from "dompurify";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface TinyEditorProps {
  headers: ReadonlyHeaders;
}
const TinyEditor = ({ headers }: TinyEditorProps) => {
  const [title, setTitle] = useState<string>("");
  const [rawContent, setRawContent] = useState<string>("");

  const [content, setContent] = useState<string>("");

  const debouncedContent = useDebounce(rawContent, 500);

  useEffect(() => {
    if (editorRef.current) {
      const cleanedHTML = DOMpurify.sanitize(editorRef.current.getContent(), {
        ALLOWED_TAGS: [
          "b",
          "i",
          "strong",
          "a",
          "p",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "img",
          "ol",
          "ul",
          "li",
          "table",
          "thead",
          "tbody",
          "tr",
          "td",
        ],
        ALLOWED_ATTR: ["href", "src", "alt"],
      });
      setContent(cleanedHTML);
    }
  }, [debouncedContent]);

  const editorRef = useRef<TinyMCEEditor | null>(null);
  const saveBlog = async () => {
    console.log("Header ====>", headers);
    const response = await fetch(`${BACKEND_API_HOST}/api/blogs/dashboard`, {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers,
    });
    if (!response.ok) {
      toast.error("Unable to save blog");
    } else {
      toast.success("Saved successfully");
    }
  };

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label>Title :</Label>
        <Input
          className="block"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the title of the blog."
        />
      </div>
      <div className="grid gap-2">
        <Label>Content:</Label>
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
          onInit={(_evt, editor) => (editorRef.current = editor)}
          initialValue="<p>Place your content here</p>"
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "imagetools",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            paste_filter_drop: true,
            invalid_elements: "script,iframe,object,style",
          }}
          onEditorChange={(str) => setRawContent(str)}
        />
      </div>
      <div className="flex flex-row justify-end">
        <Button onClick={saveBlog}>Log Output</Button>
      </div>
    </div>
  );
};

export default TinyEditor;
