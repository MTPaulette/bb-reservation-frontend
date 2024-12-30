import Link from "next/link";
import { TopClient } from "@/lib/definitions";
import Title from "@/components/Title";
import { getImageUrl, getUsername } from "@/lib/utils";
import { User } from "@nextui-org/react";
import { useLocale, useTranslations } from 'next-intl';

export default function TopClients({clients}: {clients: TopClient[]}) {
  const locale = useLocale();
  const t_statistic = useTranslations("Statistic");

  return (
    <div className="col-span-12 rounded-sm border border-divider bg-background px-7.5 py-6 shadow-default xl:col-span-4">
      <Title className="mb-1.5 text-xl">{t_statistic("best_clients")}</Title>
      <p className="text-foreground/60 font-med font-medium mb-6">{t_statistic("best_clients_description")}</p>

      <div>
        {clients.map((client, key) => (
          <Link
            href={`/${locale}/admin/staff/${client.id}`}
            className="w-full flex justify-between items-center py-2 hover:bg-content2/80 hover:!no-underline"
            key={key}
          >
          <User
            avatarProps={
              {radius: "full", size: "lg", src: client.image? getImageUrl(client.image) : "" }
            }
            classNames={{
              name: "font-semibold dark:font-normal hover:underline",
              description: "text-foreground/60",
            }}
            name={getUsername(client.lastname, client.firstname)}
            description={`${client.email} ${client.phonenumber ? '| '+client.phonenumber: ''}`}
          />
          
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
            <span className="text-xs font-medium text-white">
              {" "}
              {client.reservations_count}
            </span>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

