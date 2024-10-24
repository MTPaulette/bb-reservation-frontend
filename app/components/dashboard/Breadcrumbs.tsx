import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function BreadcrumbsComponent({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <>
    <Breadcrumbs variant="solid">
    {breadcrumbs.map((breadcrumb, index) => (
      <BreadcrumbItem
        key={breadcrumb.href}
        aria-current={breadcrumb.active}
        href={breadcrumb.href}
      >
        {breadcrumb.label}
      </BreadcrumbItem>
    ))}
    </Breadcrumbs>
    </>
  );
}
