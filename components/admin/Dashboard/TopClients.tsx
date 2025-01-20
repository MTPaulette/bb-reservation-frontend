import Link from "next/link";
import { TopClient } from "@/lib/definitions";
import Title from "@/components/Title";
import { getImageUrl, getUsername } from "@/lib/utils";
import { User } from "@nextui-org/react";
import { useLocale, useTranslations } from 'next-intl';
import moment from "moment";

export default function TopClients({clients, period}: {clients: TopClient[], period: string}) {
  const locale = useLocale();
  const t_statistic = useTranslations("Statistic");
  const year = period != "" ? moment(period).year() : "~";
  // const year = period != "" ? moment(period).year() : moment().year();

  return (
    // <div className="col-span-12 xl:col-span-4 rounded-sm border border-divider bg-background px-7.5 py-6 shadow-default">
    <div className="col-span-12 xl:col-span-7 rounded-sm border border-divider bg-background px-7.5 py-6 shadow-default">
      <div className="mb-6">
        <Title className="text-xl">{t_statistic("best_clients")}</Title>
        <p className="text-foreground/60 font-medium mt-2 leading-none">
          {t_statistic("best_clients_description")}
        </p>
        <p className="text-foreground/60 font-medium mt-1 leading-none">
          {t_statistic("year")}:
          <span className="font-medium text-sm text-foreground ml-2">{year}</span>
        </p>
      </div>
      <div>
        {clients.map((client, key) => (
          <Link
            href={`/${locale}/admin/clients/${client.id}`}
            className="w-full flex justify-between items-center py-2 hover:bg-content2/80 hover:!no-underline"
            key={key}
          >
          <User
            avatarProps={
              {className:"flex-shrink-0", radius: "full", size: "lg", src: client.image? getImageUrl(client.image) : "" }
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

