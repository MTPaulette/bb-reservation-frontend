import { User } from "@nextui-org/react";

export default function MyUser({
  name, role, src,
}: {
  name: string, role: string, src: string|undefined,
}) {
  return (
    <User
      name={name}
      description={role}
      avatarProps={{
        src: src? src: ""
      }}
    />
  );
}