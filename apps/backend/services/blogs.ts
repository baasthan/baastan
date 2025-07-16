import { insertBlogRecord } from "@/repository/blogs";
import { CreateBlogType } from "@workspace/schema/blogs";

interface CreateBlogServiceProps extends CreateBlogType {
  authorId: string;
}

async function createBlog({
  content,
  title,
  authorId,
}: CreateBlogServiceProps) {
  try {
    const blog = await insertBlogRecord({ title, content, authorId });
    if (!blog) {
      return null;
    }
    return blog;
  } catch (error) {
    return null;
  }
}

export { createBlog };
