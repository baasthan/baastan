import { Prisma } from "@/generated/prisma";
import { getPrismaClient } from "@/lib/prismaClient";

const insertBlogRecord = async (data: Prisma.blogCreateArgs["data"]) => {
  try {
    const prisma = getPrismaClient();
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
