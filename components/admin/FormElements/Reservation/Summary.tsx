"use client"

import { useState } from "react";
import { Button, Chip, Image, User } from "@nextui-org/react";
import { useLocale, useTranslations } from 'next-intl';
import Alert from "@/components/Alert";
import { CouponType, Reservation_draftType, RessourceType, UserType } from "@/lib/definitions";
import Title from "@/components/Title";
import { capitalize, formatCurrency, getImageUrl, getUsername } from "@/lib/utils";
import { confirmReservation } from "@/lib/action/admin/reservations";
import { signOut } from "next-auth/react";

export default function SummaryReservation(
  { 
    client, ressource,
    reservation_draft, coupon,
    click_to_confirm
  }: {
    client: UserType, ressource: RessourceType ,
    reservation_draft: Reservation_draftType, coupon: CouponType|undefined,
    click_to_confirm: unknown
  } ) {
  const t_input = useTranslations("Input");
  const t_ressource = useTranslations("Ressource");
  const t_error = useTranslations("InputError");
  const locale = useLocale();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleConfirmReservation = async () => {
    setError("");
    setSuccess("");
    setLoading(true);
    confirmReservation(Number(client.id), Number(ressource.id))
    .then(async (res) => {
      setLoading(false);
      const response = await res.json();
      if(res?.ok) {
        setSuccess(t_input("new_reservation_success_msg"));
        setTimeout(() => {
          click_to_confirm(response.reservation_id);
          setSuccess("");
          // window.location.reload();
        }, 3000);
      } else {
        const status = res.status;
        switch(status) {
          case 401:
            setError(t_error("unauthenticated"));
            setTimeout(async () => {
              await signOut({
                callbackUrl: `/${locale}/auth/login`
              });
            }, 500);
            break;
          case 422:
            if(response.errors.en){
              setError(locale === "en" ? response.errors.en : response.errors.fr);
            } else {
              setError(JSON.stringify(response));
            }
            break;
          case 403:
            setError(t_error("acces_denied"));
            break;
          case 500:
            setError(t_error("something_wrong"));
            break;
          default:
            break;
        }
      }
    })
    .catch((error) => {
      setError(t_error("something_wrong"));
      console.error(error);
    })
  }

  return (
    <>
    {error != "" ? (
      <div className="mb-8 md:mt-10">
        <Alert color="danger" message={error} />
      </div>
    ) : null}
    {success != "" ? (
      <div className="mb-8 md:mt-10">
        <Alert color="success" message={success} />
      </div>
    ) : null}
    <div className="w-full">
      <Title className="text-sm text-danger-500 font-bold my-6 md:my-8 
       border-red-400 bg-red-200
       flex w-full border-l-6 bg-opacity-[15%] px-5 py-3 shadow-sm dark:bg-black dark:bg-opacity-20
       ">{t_ressource("confirm_reservation")}</Title>
      {/* <div className="grid justify-between grid-cols-12 sm:gap-10 md:gap-14 mt-6 md:mt-8"> */}
      <div className="grid justify-between grid-cols-12 sm:gap-10 md:gap-14">
        <div className="col-span-12 sm:col-span-8 pr-0 sm:pr-8">
          <div className="mb-6 sm:mb-0">
            <Title className="font-semibold text-xl text-foreground">{t_ressource("transaction_informations")}</Title>
            <div className="mt-6 text-justify text-foreground/60">
              Vous avez entamé la réservation de la ressource <span className="font-semibold text-foreground">{ressource.space.name} </span>
              de l&apos;agence de <span className="font-semibold text-foreground">{ressource.agency.name}</span> pour le client
              <span className="font-semibold text-foreground"> {getUsername(client.lastname, client.firstname)} </span>
              allant du <span className="font-semibold text-foreground">{reservation_draft.start_date}</span> au
              <span className="font-semibold text-foreground"> {reservation_draft.end_date} </span>
              de <span className="font-semibold text-foreground">{reservation_draft.start_hour}</span> au
              <span className="font-semibold text-foreground"> {reservation_draft.end_hour}</span>.

              <p className="mt-6">
                La somme à payer pour cette réservation est:
                <span className="inline-block rounded ml-1 px-1.5 py-0.5 uppercase font-bold text-sm bg-success text-white"> {formatCurrency(reservation_draft.initial_amount)}</span>
              </p>
              {coupon ? (
                <p className="mt-6">
                  Grace à l&apos;utilisation du coupon <span className="font-semibold text-foreground whitespace-nowrap">{coupon.name}  |  {coupon.code} </span>
                  qui vous donne droit à une réduction de <span className="font-semibold text-foreground"> {coupon.percent ? coupon.percent+' %' :  coupon.amount? formatCurrency(coupon.amount): ''}</span>,
                  le reste à payer pour cette reservation est donc de 
                  <span className="inline-block rounded ml-1 px-1.5 py-0.5 uppercase font-bold text-sm bg-success text-white"> {formatCurrency(reservation_draft.amount_due)}</span>
                </p>
              ) : null }
            </div>
          </div>
          <div className="border-t-2 border-divider pt-6 mt-6">
            <Title className="font-semibold text-xl text-foreground">{t_ressource("client_informations")}</Title>
            <div className="mt-6">
              <User
                avatarProps={
                  {className:"flex-shrink-0", radius: "full", size: "lg", src: client.image? getImageUrl(client.image) : "" }
                }
                classNames={{
                  name: "font-semibold",
                  description: "text-foreground/60",
                }}
                description={client.email}
                name={getUsername(client.lastname, client.firstname)}
              />
            </div>
            {/* characteristics */}
            <div className="border-t-2 border-divider pt-6 mt-6 hidden sm:block">
              <Title className="font-semibold text-xl text-foreground">{t_ressource("characteristics")}</Title>
              {ressource.space && ressource.space.characteristics.length > 0 ? (
                <ul className="w-full flex flex-wrap mt-6 gap-x-4 gap-y-4">
                  {ressource.space.characteristics.map((item) => (
                    <li key={item.id}>
                      <Chip color="default" size="md" variant="flat">
                        {capitalize(locale === "en" ? item.name_en: item.name_fr)}
                      </Chip>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>


        <div className="col-span-12 sm:col-span-4">
          <div className="border-t-2 border-divider pt-6 mt-6 sm:border-none sm:pt-0 sm:mt-0">
            <Title className="font-semibold text-xl text-foreground mb:mb-6 sm:my-6">{t_ressource("ressource_informations")}</Title>
         
          <div className="mb-4 md:mb-6">
            <Title className="text-xl font-semibold sm:text-2xl">
              {capitalize(ressource.space.name)}
            </Title>
            {ressource.agency ? (
              <p className="mt-1 font-light text-tiny">{t_ressource("from")}:
                <span className="font-medium ms-2">
                  {ressource.agency.name? capitalize(ressource.agency.name): ""}
                </span>
              </p>
            ): null }
          </div>
          <p className="text-foreground/60 text-justify mt-2">
            {capitalize(locale === "en" ? ressource.space.description_en: ressource.space.description_fr)}
          </p>
          <div>
          {ressource.space && ressource.space.images.length > 0 ? (
            <>
              <div className="mt-2">
                <Image
                  isBlurred
                  src={getImageUrl(ressource.space.images[0].src)}
                  alt="NextUI Album Cover"
                  className="relative"
                  classNames={{
                    img: ["w-full", "h-auto"]
                  }}
                />
              </div>
              <div className="w-full mt-2 h-full flex flex-wrap gap-6 items-center justify-start">
                {ressource.space.images.map((item) => (
                  <div key={item.id} className="flex-shrink-0">
                    <Image
                      width={80}
                      height={80}
                      radius="sm"
                      src={getImageUrl(item.src)}
                      alt="space image"
                    />
                  </div>
                ))}
              </div>
            </>
          ) : null}
          </div>
          {/* characteristics */}
          <div className="border-t-2 border-divider pt-6 mt-6 block sm:hidden">
            <Title className="font-semibold text-xl text-foreground">{t_ressource("characteristics")}</Title>
            {ressource.space && ressource.space.characteristics.length > 0 ? (
              <ul className="w-full flex flex-wrap mt-6 gap-x-4 gap-y-4">
                {ressource.space.characteristics.map((item) => (
                  <li key={item.id}>
                    <Chip color="default" size="md" variant="flat">
                      {capitalize(locale === "en" ? item.name_en: item.name_fr)}
                    </Chip>
                  </li>
                ))}
              </ul>
            ) : null}
          </div> </div>
        </div>

        <div className="col-span-12 mt-8">
          <Button
            type="button"
            color="danger"
            isLoading={loading}
            className="w-full uppercase truncate"
            onClick={handleConfirmReservation}
          >
            {t_ressource("confirm_reservation_btn")}
          </Button>
          </div>
      </div>
    </div>
    </>
  )
}