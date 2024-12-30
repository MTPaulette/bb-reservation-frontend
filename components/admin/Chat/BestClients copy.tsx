import Link from "next/link";
import Image from "next/image";
import { BestClient, Client } from "@/lib/definitions";
import Title from "@/components/Title";
import { getImageUrl } from "@/lib/utils";

const clientData: Client[] = [
  {
    avatar: "/images/user/user-01.png",
    name: "Devid Heilo",
    text: "How are you?",
    time: 12,
    textCount: 3,
    dot: 3,
  },
  {
    avatar: "/images/user/user-02.png",
    name: "Henry Fisher",
    text: "Waiting for you!",
    time: 12,
    textCount: 0,
    dot: 1,
  },
  {
    avatar: "/images/user/user-04.png",
    name: "Jhon Doe",
    text: "What's up?",
    time: 32,
    textCount: 0,
    dot: 3,
  },
  {
    avatar: "/images/user/user-05.png",
    name: "Jane Doe",
    text: "Great",
    time: 32,
    textCount: 2,
    dot: 6,
  },
  {
    avatar: "/images/user/user-01.png",
    name: "Jhon Doe",
    text: "How are you?",
    time: 32,
    textCount: 0,
    dot: 3,
  },
  {
    avatar: "/images/user/user-03.png",
    name: "Jhon Doe",
    text: "How are you?",
    time: 32,
    textCount: 3,
    dot: 6,
  },
];

export default function BestClients({clients, title}: {clients: BestClient[], title: string}) {
  return (
    <div className="col-span-12 rounded-sm border border-divider bg-background py-6 shadow-default xl:col-span-4">
      <Title className="mb-6 px-7.5 text-xl">{title}</Title>

      <div>
        {clients.map((client, key) => (
          <Link
            href="/"
            className="flex items-center gap-5 px-7.5 py-3 hover:bg-gray-3 dark:hover:bg-meta-4"
            key={key}
          >
            <div className="relative h-14 w-14 rounded-full">
              <Image
                width={56}
                height={56}
                src={client.image? getImageUrl(client.image): ""}
                alt="User"
                style={{
                  width: "auto",
                  height: "auto",
                }}
              />
              <span
                className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white ${
                  client.status === 'actibe' ? "bg-success" : `bg-danger`
                } `}
              ></span>
            </div>

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="font-medium text-foreground">
                  {client.name}
                </h5>
                <p>
                  <span className="text-sm text-foreground">
                    {client.text}
                  </span>
                  <span className="text-xs"> . {client.time} min</span>
                </p>
              </div>
              {client.textCount !== 0 && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                  <span className="text-sm font-medium text-white">
                    {" "}
                    {client.textCount}
                  </span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

