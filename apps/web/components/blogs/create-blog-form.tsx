"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createBlogsSchema } from "@workspace/schema/blogs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { useForm } from "react-hook-form";
import z from "zod";

const CreateBlogForm = () => {
  const form = useForm<z.infer<typeof createBlogsSchema>>({
    resolver: zodResolver(createBlogsSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
  return (
    <Form {...form}>
      <form className="flex flex-col flex-1 h-full gap-4 bg-red-200">
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
                <Textarea placeholder="Enter blog content" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default CreateBlogForm;
