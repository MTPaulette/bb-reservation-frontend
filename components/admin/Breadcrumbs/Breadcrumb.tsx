import Link from "next/link";
import Title from "@/components/Title";

interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <Title className="text-2xl">
        {pageName}
      </Title>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium text-foreground/50" href="/">
              Dashboard /
            </Link>
          </li>
          <li className="font-medium text-primaryy text-foreground">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
