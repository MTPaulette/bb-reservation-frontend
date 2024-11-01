import { CheckIcon, ExclamationTriangleIcon, CloseIcon } from "@/components/Icons";

export default function Alert({message, color}: {message: string, color: "default"|"warning"|"danger"|"success"}) {
  return (
    <div className={`flex w-full border-l-6 bg-opacity-[15%] px-5 py-6 shadow-md dark:bg-black dark:bg-opacity-20 md:p-9
      ${color === "warning"? "text-warning border-warning bg-warning" : " "}
      ${color === "danger"? "text-red-400 border-red-400 bg-red-400" : " "}
      ${color === "success"? "text-green-500 border-green-500 bg-green-500" : " "}
    `}>
      {color === "success" ? <CheckIcon fill="#22c55e" size={16} /> : ""}
      {color === "warning" ? <ExclamationTriangleIcon fill={"#FBBF24"} size={19} /> : ""}
      {color === "danger" ? <CloseIcon fill="#f87171 " size={16} /> : ""}
  
      <span className="sr-only">Info</span>
      <div className="ml-2 -mt-1">
        <h5 className="font-semibold text-base mb-0.5">
          { color === "success"? "Notes:" : "" }
          { color === "warning"? "Attention!" : "" }
          { color === "danger"? "Error:" : "" }
        </h5>
        <p className="text-sm leading-relaxed text-foreground">{message}</p>
      </div>
    </div>
  );
};