import { Prisma, PrismaClient } from "@/generated/prisma";

const insertBlogRecord = async (data: Prisma.blogCreateArgs["data"]) => {
  try {
    const prisma = new PrismaClient();
    const newBlog = await prisma.blog.create({
      data,
      select: {
        id: true,
      },
    });
    if (newBlog.id) {
      return newBlog;
    }
    return false;
  } catch {
    return false;
  }
};

export { insertBlogRecord };
