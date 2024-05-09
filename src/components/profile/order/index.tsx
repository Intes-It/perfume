import { showToast } from "@redux/slices/toast/toastSlice";
import { useAppDispatch } from "@redux/store";
import { GET } from "@utils/fetch";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Image from "next/image";
import { IListOrder } from "@types";
import dayjs from "dayjs";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
const listTab = [
  { title: "All", value: "" },
  { title: "New order", value: "status=Pending" },
  { title: "Delivering", value: "status=Processing" },
  { title: "Completed", value: "status=Completed" },
  { title: "Canceled", value: "status=Canceled" },
];
const Order = () => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState({
    status: "",
    page: 1,
  });
  const { status, page } = state;
  const { data } = useQuery(["get-list-order", status, page], async () => {
    try {
      const res = await GET(`/api/orders/book/list/?page=${page}&${status}`);
      return res.data;
    } catch (error) {
      dispatch(() => showToast(String(error)));
    }
  });
  const th = {
    color: "#603813",
    padding: ".75rem 1.75rem",
    fontWeight: 500,
    fontSize: 14,
  };

  const tableBody =
    data &&
    data?.data.results.map((item: IListOrder) => (
      <tr key={item.id} className="bg-white">
        <th
          scope="row"
          className="px-7 py-4 font-medium text-[#374151] whitespace-nowrap"
        >
          {item.id_order}
        </th>
        <td className="px-6 py-4 font-medium text-[#374151]">
          {dayjs(item.created_time).format("YYYY-MM-DD")}
          {"    "}
          <span className="ml-2"></span>
          {dayjs(item.created_time).format("HH:MM")}
        </td>
        <td className="pl-12 py-4 font-medium text-[#374151]  ">
          {item.total}
        </td>
        <td className="px-6 py-4 font-medium text-[#374151] ">
          {item.total_price_payment} USD
        </td>
        <td
          className={twMerge(
            "px-6 py-4 font-medium",
            { completed: "text-[#00DD16]", canceled: "text-[#FF2626]" }[
              item.status.toLowerCase()
            ] || "text-[#0047FF]"
          )}
        >
          {item.status}
        </td>
        <td className="px-6 py-4 ">
          <Link href={`my-order/${item.id}`}>
            <div className="flex items-center gap-x-2 cursor-pointer">
              <span className="text-[#005AEA] font-normal text-xs">Detail</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.25596 2.21529C4.41321 2.0805 4.64994 2.09871 4.78473 2.25596L7.78473 5.75596C7.9051 5.89639 7.9051 6.10362 7.78473 6.24405L4.78473 9.74405C4.64994 9.9013 4.41321 9.91951 4.25596 9.78473C4.09871 9.64994 4.0805 9.41321 4.21529 9.25596L7.0061 6.00001L4.21529 2.74405C4.0805 2.58681 4.09871 2.35007 4.25596 2.21529Z"
                  fill="#575757"
                />
              </svg>
            </div>
          </Link>
        </td>
      </tr>
    ));

  return (
    <div>
      <h1 className="text-[#374151] font-semibold text-2xl">My order detail</h1>
      <div className="mt-3 mb-10 flex content-center ">
        {listTab.map((item) => (
          <button
            key={item.title}
            className={twMerge(
              status === item.value
                ? "text-[#603813] font-semibold bg-[#F6F6F6] rounded"
                : "text-[#374151] font-normal",
              "w-32 py-2 h-10"
            )}
            onClick={() => setState((p) => ({ ...p, status: item.value }))}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        {data && data?.data.results.length <= 0 ? (
          <div className="relative" style={{ paddingTop: "10%" }}>
            <div className="text-center">
              <Image
                src={"/images/empty.png"}
                width={140}
                height={140}
                alt="empt"
              />
              <p className="font-medium text-xl">
                You don’t have any order yet
              </p>
            </div>
          </div>
        ) : (
          <div className="relative overflow-x-auto rounded border shadow-lg ">
            <table className="w-full text-sm text-left rtl:text-right ">
              <thead className="bg-[#F6F6F6] rounded">
                <tr>
                  <th scope="col" style={th}>
                    Order ID
                  </th>
                  <th
                    scope="col"
                    style={th}
                    className={` flex items-center gap-x-2`}
                  >
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
                  <th style={th} scope="col">
                    {" "}
                    Quantity
                  </th>
                  <th style={th} scope="col">
                    Total
                  </th>
                  <th style={th} scope="col">
                    Status
                  </th>
                  <th className="w-2" />
                </tr>
              </thead>
              <tbody>{tableBody}</tbody>
            </table>
            <div className=" flex justify-center my-5">
              <div className="flex gap-x-5">
                <button
                  className={twMerge(
                    "text-[#B3B3B3] text-xs font-medium",
                    data?.data.previous === null && "cursor-not-allowed"
                  )}
                  onClick={() =>
                    setState((p) => ({ ...p, page: state.page - 1 }))
                  }
                  disabled={data?.data.previous === null}
                >
                  Previous
                </button>
                <div className="flex gap-x-2">
                  {Array.from({ length: data?.data.total }, (_, index) => (
                    <button
                      className={` ${
                        page === index + 1 && "bg-[#603813] text-white"
                      }  w-5 h-5 px-1  rounded`}
                      onClick={() => {
                        setState((p) => ({ ...p, page: index + 1 }));
                      }}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button
                  className={twMerge(
                    "text-[#B3B3B3] text-xs font-medium",
                    data?.data.next === null && "cursor-not-allowed"
                  )}
                  onClick={() =>
                    setState((p) => ({ ...p, page: state.page + 1 }))
                  }
                  disabled={data?.data.next === null}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
