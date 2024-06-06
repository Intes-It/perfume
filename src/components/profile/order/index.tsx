import { showToast } from "@redux/slices/toast/toastSlice";
import { useAppDispatch } from "@redux/store";
import { IListOrder } from "@types";
import { GET } from "@utils/fetch";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { twMerge } from "tailwind-merge";
const listTab = [
  { title: "All", value: "" },
  { title: "New order", value: "&statuses=3" },
  { title: "Delivering", value: "&statuses=7" },
  { title: "Completed", value: "&statuses=8" },
  { title: "Canceled", value: "&statuses=5" },
];
const listStatus: { [key: string]: string } = {
  "3": "New",
  "4": "Accepted",
  "5": "Canceled",
  "6": "In progress",
  "7": "Delivering",
  "8": "Completed",
};

const Order = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [state, setState] = useState({
    status: "",
    page: 1,
    tab: 1,
    orderId: -1,
    totalOrder: 0,
  });
  const [orderDetail, setOrderDetail] = useState<any>({});
  const [isShowToast, setIsShowToast] = useState(false);
  const { status, page, tab, orderId, totalOrder } = state;
  const { data } = useQuery(["get-list-order", status, page], async () => {
    try {
      const res = await GET(
        `/api/order/my_order/?page=${page}${status ? status : ""}`
      );
      return res.data;
    } catch (error) {
      dispatch(() => showToast(String(error)));
    }
  });
  useEffect(() => {
    const getOrderById = async () => {
      try {
        const res = await GET(`/api/order/${orderId}`);
        setOrderDetail(res?.data);
      } catch (error) {
        dispatch(() => showToast(String(error)));
      }
    };
    if (orderId !== -1) {
      getOrderById();
    }
  }, [orderId]);

  const th = {
    color: "#603813",
    padding: ".75rem 1.75rem",
    fontWeight: 500,
    fontSize: 14,
  };

  const tableBody =
    data &&
    data?.results?.map((item: IListOrder) => (
      <tr key={item.id} className="bg-white">
        <th
          scope="row"
          className="px-7 py-4 font-medium text-[#374151] whitespace-nowrap"
        >
          {item.id}
        </th>
        <td className="px-7 py-4 font-medium text-[#374151]">
          {dayjs(item.updated_at).format("YYYY-MM-DD")}
          {"    "}
          <span className="ml-2"></span>
          {dayjs(item.updated_at).format("HH:mm")}
        </td>
        <td className="pl-12 py-4 font-medium text-[#374151]  ">
          {item.quantity}
        </td>
        <td className="px-6 py-4 font-semibold text-[#374151] ">
          {item.total} $
        </td>
        <td
          className={twMerge(
            "px-7 py-4 font-semibold",
            { 8: "text-[#00DD16]", 5: "text-[#FF2626]" }[item.status] ||
            "text-[#0047FF]"
          )}
        >
          {listStatus[item.status.toString()]}
        </td>
        <td className="px-7 py-4 ">
          <div
            onClick={() => {
              setState((pre) => ({
                ...pre,
                tab: 2,
                orderId: item.id,
                totalOrder: item.quantity,
              }));
            }}
          >
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
          </div>
        </td>
      </tr>
    ));

  return tab === 1 ? (
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
            onClick={() =>
              setState((p) => ({ ...p, status: item.value, page: 1 }))
            }
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        {data && data?.results?.length <= 0 ? (
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
        ) : !data ? (
          <div></div>
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
                    Date Order{" "}
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
                    data?.previous_page === null && "cursor-not-allowed"
                  )}
                  onClick={() =>
                    setState((p) => ({ ...p, page: state.page - 1 }))
                  }
                  disabled={data?.previous_page === null}
                >
                  Previous
                </button>
                <div className="flex gap-x-2">
                  {Array.from({ length: data?.num_pages }, (_, index) => (
                    <button
                      className={` ${page === index + 1 && "bg-[#603813] text-white"
                        }  w-5 h-5 px-1  rounded text-sm`}
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
                    data?.next_page === null && "cursor-not-allowed"
                  )}
                  onClick={() =>
                    setState((p) => ({ ...p, page: state.page + 1 }))
                  }
                  disabled={data?.next_page === null}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="ml-[56px]">
      <h1 className="text-[#374151] font-semibold text-2xl flex flex-row gap-3">
        <svg
          onClick={() => {
            setState((pre) => ({
              ...pre,
              tab: 1,
            }));
          }}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="my-auto cursor-pointer"
        >
          <g clip-path="url(#clip0_306_3068)">
            <path
              d="M3.63605 11.2932C3.44858 11.4807 3.34326 11.735 3.34326 12.0002C3.34326 12.2653 3.44858 12.5197 3.63605 12.7072L9.29305 18.3642C9.48165 18.5463 9.73425 18.6471 9.99645 18.6449C10.2586 18.6426 10.5095 18.5374 10.6949 18.352C10.8803 18.1666 10.9854 17.9158 10.9877 17.6536C10.99 17.3914 10.8892 17.1388 10.707 16.9502L6.75705 13.0002H20C20.2653 13.0002 20.5196 12.8948 20.7072 12.7073C20.8947 12.5198 21 12.2654 21 12.0002C21 11.735 20.8947 11.4806 20.7072 11.2931C20.5196 11.1055 20.2653 11.0002 20 11.0002H6.75705L10.707 7.05018C10.8892 6.86158 10.99 6.60898 10.9877 6.34678C10.9854 6.08458 10.8803 5.83377 10.6949 5.64836C10.5095 5.46295 10.2586 5.35778 9.99645 5.35551C9.73425 5.35323 9.48165 5.45402 9.29305 5.63618L3.63605 11.2932Z"
              fill="#374151"
            />
          </g>
          <defs>
            <clipPath id="clip0_306_3068">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
        Order Detail
      </h1>
      <div className="mt-[42px] flex flex-wrap">
        <div className="w-3/5 border border-[#E9E9E9]  mr-8 p-6 h-fit">
          <div className="flex justify-between">
            <div className="text-[16px] text-[#374151] font-medium">
              Order ID:
            </div>
            <div className="text-[#603813] text-[16px] font-semibold">
              #{orderDetail.id}
            </div>
          </div>
          <div className="flex justify-between mt-3">
            <div className="text-[16px] text-[#374151] font-medium">
              Date order:
            </div>
            <div className="text-[#603813] text-[16px] font-semibold">
              <span className="mr-2">
                {dayjs(orderDetail.created_at).format("HH:MM")}
              </span>
              {dayjs(orderDetail.created_at).format("YYYY-MM-DD")}
            </div>
          </div>
          <div className="flex justify-between mt-3">
            <div className="text-[16px] text-[#374151] font-medium">Name:</div>
            <div className="text-[#603813] text-[16px] font-semibold">
              {orderDetail.first_name + " " + orderDetail.last_name}
            </div>
          </div>
          <div className="flex justify-between mt-3">
            <div className="text-[16px] text-[#374151] font-medium">
              Name of company (optional):
            </div>
            <div className="text-[#603813] text-[16px] font-semibold">
              {orderDetail.company_name}
            </div>
          </div>
          <div className="flex justify-between mt-3">
            <div className="text-[16px] text-[#374151] font-medium">Email:</div>
            <div className="text-[#603813] text-[16px] font-semibold">
              {orderDetail.email}
            </div>
          </div>
          <div className="flex justify-between mt-3">
            <div className="text-[16px] text-[#374151] font-medium">
              Address:
            </div>
            <div className="text-[#603813] text-[16px] font-semibold">
              {orderDetail.address}
            </div>
          </div>
          <div className="flex justify-between mt-3">
            <div className="text-[16px] text-[#374151] font-medium">City:</div>
            <div className="text-[#603813] text-[16px] font-semibold">
              {orderDetail.city}
            </div>
          </div>
          <div className="flex justify-between mt-3">
            <div className="text-[16px] text-[#374151] font-medium">
              Code Post:
            </div>
            <div className="text-[#603813] text-[16px] font-semibold">
              {orderDetail.postal_code}
            </div>
          </div>
          <div className="flex justify-between mt-3">
            <div className="text-[16px] text-[#374151] font-medium">
              Phone Number:
            </div>
            <div className="text-[#603813] text-[16px] font-semibold">
              {orderDetail.phone_number}
            </div>
          </div>
          {/* <div className="flex justify-between mt-3">
            <div className="text-[16px] text-[#374151] font-medium">
              Estimate time:
            </div>
            <div className="text-[#603813] text-[16px] font-semibold">
              <span className="mr-2">
                {dayjs(orderDetail.delivered_at).format("HH:MM")}
              </span>
              {dayjs(orderDetail.delivered_at).format("YYYY-MM-DD")}
            </div>
          </div> */}
          <div className="mt-8 mb-4 flex justify-center text-[20px] text-[#374151] font-bold">
            {orderDetail?.status === 5
              ? "The order has been canceled."
              : orderDetail?.status === 7
                ? "The order is on the way."
                : orderDetail?.status === 8
                  ? "The order has been completed."
                  : "We are preparing your order."}
          </div>
          <div className="text-[16px] text-[#374151] font-semibold mb-8">
            Orders ({totalOrder})
          </div>
          <div className="">
            {orderDetail?.items?.map((item: any, index: number) => (
              <div
                key={index}
                className="flex flex-row justify-between pb-5 pt-4"
                style={{
                  borderBottom:
                    index !== orderDetail?.items?.length - 1
                      ? "1px solid #E9E9E9"
                      : "none",
                }}
              >
                <div className="flex flex-row">
                  <Image
                    src={
                      item.product.thumbnail.url
                        ? item.product.thumbnail.url
                        : ""
                    }
                    alt="item"
                    width={"60px"}
                    height={"60px"}
                  />
                  <div className="flex flex-col ml-3">
                    <div className="flex flex-row gap-5 text-[16px] text-[#374151] font-medium mb-2">
                      <div>{item.product.name}</div>{" "}
                      <div>{"x" + item.quantity}</div>
                    </div>
                    <div className="text-[#ABABAB] text-[14px] font-medium">
                      {item.item_product_color.length > 0
                        ? item.item_product_color[0]?.product_color.name
                        : ""}
                      {item.item_product_color.length > 0 &&
                        item.item_product_capacity.length > 0 &&
                        ", "}
                      {item.item_product_capacity.length > 0
                        ? item.item_product_capacity[0]?.product_capacity
                        : ""}
                      {((item.item_product_package.length > 0 &&
                        item.item_product_capacity.length > 0) ||
                        (item.item_product_color.length > 0 &&
                          item.item_product_package.length > 0)) &&
                        ", "}
                      {item.item_product_package.length > 0
                        ? item.item_product_package[0]?.product_package.name
                        : ""}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#603813] text-[16px] font-bold mb-1">
                    {item.total}
                    {" $"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/3 border border-[#E9E9E9] p-6 flex flex-col h-fit ">
          <div className="flex justify-between mb-3">
            <div className="text-[16px] text-[#374151] font-medium">
              Sub-total
            </div>
            <div className="text-[#603813] text-[16px] font-semibold">
              {orderDetail.sub_total} $
            </div>
          </div>
          <div className="flex justify-between mb-1">
            <div className="text-[16px] text-[#374151] font-medium">
              Shipping
            </div>
            <div className="text-[#603813] text-[16px] font-semibold">
              {orderDetail.shipping_fee} $
            </div>
          </div>
          <div className="text-[12px] font-normal text-[#ABABAB] mb-6">
            Not included in the price but need to include in the final invoice
            (payment)
          </div>
          <div
            className="flex justify-between pb-6 mb-4 "
            style={{ borderBottom: "1px solid #E9E9E9" }}
          >
            <div className="text-[16px] text-[#374151] font-medium">VAT</div>
            <div className="text-[#603813] text-[16px] font-semibold">
              <span className="mr-3 font-semibold">(5%)</span>
              {orderDetail.tax_fee} $
            </div>
          </div>
          <div className="flex justify-between mb-8">
            <div className="text-[16px] text-[#374151] font-bold">Total</div>
            <div className="flex flex-row gap-8">
              {orderDetail?.status === 5 && (
                <img
                  src={"/images/refund.png"}
                  alt="refund"
                  className="mt-[-16px]"
                />
              )}
              <div className="text-[#603813] text-[20px] font-bold">
                {orderDetail.total} $
              </div>
            </div>
          </div>
          <button
            className="bg-[#603813] w-[184px] h-[48px] text-[16px] text-white font-bold rounded-lg mx-auto"
            onClick={() => {
              if (orderDetail?.status === 5 || orderDetail?.status === 8) {
                router.push("/");
              } else {
                setIsShowToast(true);
              }
            }}
          >
            {orderDetail?.status === 5 || orderDetail?.status === 8
              ? "Order again"
              : "Contact"}
          </button>
        </div>
        <div
          className={twMerge(
            "fixed inset-0 top-1/2 left-1/2 opacity-0 pointer-events-none scale-0 z-50 bg-white -translate-x-1/2 -translate-y-1/2 right-1/2 transition-all  duration-300 ease-in-out text-sm rounded-md h-fit px-5 py-4 w-[300px] ",
            isShowToast && "scale-100 opacity-100 pointer-events-auto"
          )}
          style={{
            boxShadow: "0px 2px 16px 0px #00000040",
            zIndex: 999999,
          }}
        >
          <div
            className="cursor-pointer float-right"
            onClick={() => setIsShowToast(false)}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.9998 8.40078L2.0998 13.3008C1.91647 13.4841 1.68314 13.5758 1.3998 13.5758C1.11647 13.5758 0.883138 13.4841 0.699804 13.3008C0.516471 13.1174 0.424805 12.8841 0.424805 12.6008C0.424805 12.3174 0.516471 12.0841 0.699804 11.9008L5.5998 7.00078L0.699804 2.10078C0.516471 1.91745 0.424805 1.68411 0.424805 1.40078C0.424805 1.11745 0.516471 0.884114 0.699804 0.700781C0.883138 0.517448 1.11647 0.425781 1.3998 0.425781C1.68314 0.425781 1.91647 0.517448 2.0998 0.700781L6.9998 5.60078L11.8998 0.700781C12.0831 0.517448 12.3165 0.425781 12.5998 0.425781C12.8831 0.425781 13.1165 0.517448 13.2998 0.700781C13.4831 0.884114 13.5748 1.11745 13.5748 1.40078C13.5748 1.68411 13.4831 1.91745 13.2998 2.10078L8.3998 7.00078L13.2998 11.9008C13.4831 12.0841 13.5748 12.3174 13.5748 12.6008C13.5748 12.8841 13.4831 13.1174 13.2998 13.3008C13.1165 13.4841 12.8831 13.5758 12.5998 13.5758C12.3165 13.5758 12.0831 13.4841 11.8998 13.3008L6.9998 8.40078Z"
                fill="#374151"
              />
            </svg>
          </div>
          <img
            src="/images/contact.png"
            className="mx-auto mt-7 mb-5"
            width={80}
            height={80}
            alt="contact"
          />
          <div className="text-center mb-3">
            <div className="font-medium">Please contact to our number</div>
            <div className="font-bold">0123456789</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
