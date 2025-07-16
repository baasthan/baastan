"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createBlogsSchema } from "@workspace/schema/blogs";
import { Button } from "@workspace/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@workspace/ui/components/resizable";
import { Textarea } from "@workspace/ui/components/textarea";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { remark } from "remark";
import html from "remark-html";
import z from "zod";

interface BlogFormProps {
  onSubmit?: (_: z.infer<typeof createBlogsSchema>) => void;
  onCancel?: () => void;
}

const CreateBlogForm = ({ onSubmit, onCancel }: BlogFormProps) => {
  const form = useForm<z.infer<typeof createBlogsSchema>>({
    resolver: zodResolver(createBlogsSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const [content, setContent] = useState<string>("");

  const [htmlContent, setHtmlContent] = useState<string>();

  const getHtmlFromMarkdown = async () => {
    const processed = await remark().use(html).process(content);
    return processed.toString();
  };

  useEffect(() => {
    getHtmlFromMarkdown().then((htmlMarkdown) => {
      console.log("htmlMarkdown===>", htmlMarkdown);
      setHtmlContent(htmlMarkdown);
    });
  }, [content]);

  const handleSubmit = () => {};

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={50} className="p-4 ">
        <Form {...form}>
          <form className="flex flex-col flex-1 h-full gap-4 ">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Title" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter blog content"
                      value={content}
                      // {...field}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setContent(e.target.value)
                      }
                      className="h-50"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex flex-row justify-end gap-4">
              <Button variant={"secondary"}>Cancel</Button>
              <Button>Save Blog</Button>
            </div>
          </form>
        </Form>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        {htmlContent && (
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          ></div>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default CreateBlogForm;
