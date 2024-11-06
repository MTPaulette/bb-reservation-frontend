import { User } from "@nextui-org/react";

export default function MyUser({
  name, role, src,
}: {
  name: string, role: string, src: string|undefined,
}) {
  return (
    <User
      isFocusable
      name={name}
      description={role}
      avatarProps={{
        src: src? src: "",
        isBordered: true,
        as: "button",
        className: "transition-transform mr-1 truncate whitespace-nowrap",
        color: "warning",
      }}
    />
  );
}