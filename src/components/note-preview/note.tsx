"use client";

import { useDebounce } from "@uidotdev/usehooks";
import { Code, Eye } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { updateNote } from "~/lib/update-note";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface Props {
  id: number;
  title: string | null;
  content: string | null;
}

export default function Note(props: Readonly<Props>) {
  const [onPreview, setOnPreview] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);

  const debouncedTitle = useDebounce(title, 200);
  const debouncedContent = useDebounce(content, 200);

  const resizeTextarea = useCallback(() => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, []);

  useEffect(() => {
    if (onPreview) return;
    resizeTextarea();
  }, [onPreview, resizeTextarea]);

  useEffect(() => {
    setIsLoading(true);
    resizeTextarea();
  }, [title, content, resizeTextarea]);

  useEffect(() => {
    setIsLoading(true);
    updateNote(props.id, debouncedTitle ?? "", debouncedContent)
      .catch(() => {
        console.error("error on update");
        setIsLoading(false);
      })
      .finally(() => {
        console.log("note saved successfully");
        setIsLoading(false);
      });
  }, [props.id, debouncedTitle, debouncedContent]);

  async function handleTitle(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.currentTarget.value);
  }

  async function handleContent(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const textarea = event.currentTarget;
    setContent(textarea.value);
  }

  return (
    <div className="relative">
      <div className="flex items-end">
        <p className="text-sm text-foreground/30">
          {isLoading ? "Saving..." : "Saved"}
        </p>
        <Button
          onClick={() => setOnPreview(!onPreview)}
          size="icon"
          variant="ghost"
          className="ml-auto"
        >
          {onPreview ? <Code className="size-6" /> : <Eye className="size-6" />}
        </Button>
      </div>
      <Input
        onChange={handleTitle}
        value={title ?? ""}
        placeholder="New Note Title..."
        className="mt-2 h-auto font-geist-mono"
      />
      {onPreview ? (
        <Markdown className="prose prose-stone prose-invert mt-4">
          {content}
        </Markdown>
      ) : (
        <Textarea
          ref={textareaRef}
          onChange={handleContent}
          value={content ?? ""}
          placeholder="# Your markdown here..."
          className="mt-2 min-h-[250px] resize-none overflow-hidden border-none font-geist-mono outline-none focus-visible:ring-transparent"
        />
      )}
    </div>
  );
}
