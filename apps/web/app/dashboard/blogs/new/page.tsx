import TinyEditor from "@/components/blogs/tiny-editor";
import { headers } from "next/headers";

const Page = async () => {
  const headerData = await headers();
  return (
    <div className="container mx-auto pt-16">
      <TinyEditor headers={headerData} />
    </div>
  );
};

export default Page;
