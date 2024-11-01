import { DownloadIcon, EyeIcon, TrashIcon } from "@/components/Icons";
import { Package } from "@/lib/definitions";

const packageData: Package[] = [
  {
    name: "Free package",
    price: 0.0,
    invoiceDate: `Jan 13,2023`,
    status: "Paid",
  },
  {
    name: "Standard Package",
    price: 59.0,
    invoiceDate: `Jan 13,2023`,
    status: "Paid",
  },
  {
    name: "Business Package",
    price: 99.0,
    invoiceDate: `Jan 13,2023`,
    status: "Unpaid",
  },
  {
    name: "Standard Package",
    price: 59.0,
    invoiceDate: `Jan 13,2023`,
    status: "Pending",
  },
];

const TableThree = () => {
  return (
    <div className="rounded-sm border border-divider px-5 pb-2.5 pt-6 bg-background shadow-default sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-content2 text-left">
              <th className="min-w-[220px] px-4 py-4 font-medium text-foreground xl:pl-11">
                Package
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-foreground">
                Invoice date
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-foreground">
                Status
              </th>
              <th className="px-4 py-4 font-medium text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {packageData.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-divider px-4 py-5 pl-9 xl:pl-11">
                  <h5 className="font-medium text-foreground">
                    {packageItem.name}
                  </h5>
                  <p className="text-sm">${packageItem.price}</p>
                </td>
                <td className="border-b border-divider px-4 py-5">
                  <p className="text-foreground">
                    {packageItem.invoiceDate}
                  </p>
                </td>
                <td className="border-b border-divider px-4 py-5">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                      packageItem.status === "Paid"
                        ? "bg-success text-success"
                        : packageItem.status === "Unpaid"
                          ? "bg-danger text-danger"
                          : "bg-warning text-warning"
                    }`}
                  >
                    {packageItem.status}
                  </p>
                </td>
                <td className="border-b border-divider px-4 py-5">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary">
                      <EyeIcon fill="currentColor" size={18} />
                    </button>
                    <button className="hover:text-primary">
                      <TrashIcon fill="currentColor" size={18} />
                    </button>
                    <button className="hover:text-primary">
                      <DownloadIcon fill="currentColor" size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
