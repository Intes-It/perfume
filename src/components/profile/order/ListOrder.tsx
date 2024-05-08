import React, { useState } from "react";
import styles from "./listorder.module.css";
import { IListOrder } from "@types";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
type listOrderProps = {
  data: IListOrder[];
  changeStatus: (value: string) => void;
};
const listTab = [
  { title: "All" },
  { title: "New order", value: "Pending" },
  { title: "Delivering", value: "Processing" },
  { title: "Completed", value: "Completed" },
  { title: "Canceled", value: "Canceled" },
];
const ListOrder: React.FC<listOrderProps> = ({ data, changeStatus }) => {
  const [state, setState] = useState({
    activeTab: 0,
  });
  const { activeTab } = state;
  const tableBody =
    data &&
    data?.map((item: IListOrder, index) => (
      <tr key={index} className="flex gap-x-10">
        <td className={styles.th}> {item.id_order} </td>
        <td className={styles.th}>
          {dayjs(item.created_time).format("YYYY-MM-DD")}
        </td>
        <td className={styles.th}>{item.total}</td>
        <td className={styles.th}>{item.total_price_cart}</td>
        <td className={styles.th}>{item.status}</td>
        <td className={styles.th}>Detail </td>
      </tr>
    ));

  return (
    <>
      <h1 className="text-[#374151] font-semibold text-2xl">My order detail</h1>
      <div className="mt-3 mb-10 flex content-center ">
        {listTab.map((item, index: number) => (
          <button
            key={item.title}
            className={twMerge(
              activeTab === index
                ? "text-[#603813] font-semibold bg-[#F6F6F6] rounded"
                : "text-[#374151] font-normal",
              "w-32 py-2 h-10"
            )}
            onClick={() => {
              setState((p) => ({ ...p, activeTab: index })),
                changeStatus(item.value as string);
            }}
          >
            {item.title}
          </button>
        ))}
      </div>
      <table className="table w-full">
        <thead className={styles.thead}>
          <tr className="flex gap-x-10">
            <th className={styles.th}>Order ID</th>
            <th className={`${styles.th} flex gap-x-2`}>
              Data Order{" "}
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 2.70801C10.1658 2.70801 10.3248 2.77386 10.442 2.89107C10.5592 3.00828 10.625 3.16725 10.625 3.33301V15.158L14.5584 11.2247C14.6156 11.1633 14.6846 11.114 14.7612 11.0799C14.8379 11.0457 14.9207 11.0273 15.0046 11.0258C15.0885 11.0244 15.1719 11.0398 15.2497 11.0712C15.3275 11.1027 15.3982 11.1495 15.4576 11.2088C15.5169 11.2682 15.5637 11.3389 15.5951 11.4167C15.6266 11.4945 15.642 11.5779 15.6405 11.6618C15.639 11.7457 15.6207 11.8285 15.5865 11.9051C15.5524 11.9818 15.5031 12.0508 15.4417 12.108L10.4417 17.108C10.3245 17.225 10.1657 17.2908 10 17.2908C9.8344 17.2908 9.67555 17.225 9.55836 17.108L4.55836 12.108C4.49695 12.0508 4.4477 11.9818 4.41354 11.9051C4.37938 11.8285 4.36101 11.7457 4.35953 11.6618C4.35805 11.5779 4.37349 11.4945 4.40492 11.4167C4.43636 11.3389 4.48315 11.2682 4.54249 11.2088C4.60184 11.1495 4.67254 11.1027 4.75036 11.0712C4.82818 11.0398 4.91154 11.0244 4.99546 11.0258C5.07938 11.0273 5.16214 11.0457 5.23881 11.0799C5.31547 11.114 5.38447 11.1633 5.44169 11.2247L9.37503 15.158V3.33301C9.37503 3.16725 9.44087 3.00828 9.55808 2.89107C9.6753 2.77386 9.83427 2.70801 10 2.70801Z"
                  fill="#603813"
                />
              </svg>
            </th>
            <th className={styles.th}> Quantity</th>
            <th className={styles.th}>Total</th>
            <th className={styles.th}>Status</th>
            <th className="w-2" />
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
    </>
  );
};

export default ListOrder;
