import { CheckIcon, ExclamationTriangleIcon, CloseIcon } from "@/components/Icons";
import { useTranslations } from 'next-intl';

export default function Alert({message, color}: {message: string, color: "default"|"warning"|"danger"|"success"}) {
  const t = useTranslations("Alert");

  return (
    <div className={`flex w-full border-l-6 bg-opacity-[15%] px-5 py-3 shadow-sm bg-white dark:bg-black dark:bg-opacity-20 md:p-6 text-sm
      ${color === "default"? "border-default bg-background/100" : " "}
      ${color === "warning"? "dark:text-yellow-400 border-yellow-400" : " "}
      ${color === "danger"? " border-red-400 bg-red-200" : " "}
      ${color === "success"? "border-green-500 bg-green-200" : " "}
    `}>
      <div className="shrink-0">
        {color === "success" ? <CheckIcon fill="#22c55e" size={16} /> : ""}
        {color === "warning" ? <ExclamationTriangleIcon fill={"#FBBF24"} size={16} /> : ""}
        {color === "danger" ? <CloseIcon fill="#f87171 " size={16} /> : ""}
      </div>
  
      <span className="sr-only">Info</span>
      <div className="ml-2 -mt-1">
        <h5 className="font-semibold text-base mb-0.5">
          { color === "success"? t("note") : "" }
          { color === "warning"? t("attention") : "" }
          { color === "danger"? t("error") : "" }
        </h5>
        <p className="text-sm leading-relaxed text-foreground">{message}</p>
      </div>
    </div>
  );
};