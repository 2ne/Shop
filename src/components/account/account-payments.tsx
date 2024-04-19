import React from "react";

const invoice = {
  items: [
    {
      id: "#772967",
      title: "Bubbles the Seahorn",
      description: "Every Tuesday at 11:30 - 12:00",
      date: "12 May 2023",
      cost: "£120.00",
      status: "Paid",
    },
    {
      id: "#583490",
      title: "Bubbles the Seahorn",
      description: "Every Tuesday at 11:30 - 12:00",
      date: "11 May 2023",
      cost: "£120.00",
      status: "Awaiting payment",
    },
  ],
};

const AccountPayments: React.FC = () => {
  return (
    <div>
      <table className="w-full text-sm leading-6 text-left whitespace-nowrap">
        <colgroup>
          <col className="w-full" />
          <col />
          <col />
        </colgroup>
        <thead className="border-b">
          <tr>
            <th scope="col" className="px-0 pb-2 font-medium">
              Invoice
            </th>
            <th
              scope="col"
              className="hidden pb-2 pl-8 pr-0 font-medium text-right sm:table-cell"
            >
              Date
            </th>
            <th scope="col" className="pb-2 pl-8 pr-0 font-medium text-right">
              Cost
            </th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item) => (
            <tr key={item.id} className="border-b last-of-type:border-b-0">
              <td className="px-0 py-3 align-top max-w-0">
                <div className="flex items-center gap-x-2">
                  <button
                    type="button"
                    className="font-medium truncate text-primary_text hover:underline"
                  >
                    {item.id}
                  </button>
                  {item.status === "Awaiting payment" && (
                    <span className="inline-flex items-center px-1.5 py-0.5 text-xs font-medium rounded bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20">
                      Awaiting payment
                    </span>
                  )}
                  {item.status === "Paid" && (
                    <span className="inline-flex items-center px-1.5 py-0.5 text-xs font-medium rounded bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                      Paid
                    </span>
                  )}
                </div>
                <div className="truncate ">{item.title}</div>
                <div className="-mt-px truncate text-neutral-500">
                  {item.description}
                </div>
              </td>
              <td className="hidden py-5 pl-8 pr-0 text-right align-top text-neutral-500 sm:table-cell">
                {item.date}
              </td>
              <td className="py-5 pl-8 pr-0 text-right align-top text-neutral-500 tabular-nums">
                {item.cost}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountPayments;
