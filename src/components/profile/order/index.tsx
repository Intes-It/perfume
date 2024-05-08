// import { faWindowMaximize } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { showToast } from "@redux/slices/toast/toastSlice";
// import { useAppDispatch } from "@redux/store";
// import { GET } from "@utils/fetch";
import React from "react";
// import { useQuery } from "react-query";
import ListOrder from "./ListOrder";
import { fakeList } from "@utils/fakeData";
import { IListOrder } from "@types";

const Order = () => {
  // const dispatch = useAppDispatch();
  // const { data } = useQuery("get-list-order", async () => {
  //   try {
  //     const res = await GET("/api/orders/book/list");
  //     return res.data;
  //   } catch (error) {
  //     dispatch(() => showToast(String(error)));
  //   }
  // });
  const fake:IListOrder[] = [];
  for (let i = 0; i < 20; i += 1) {
    fake.push(fakeList);
  }

  return (
    <div>
      {/* {data?.data.results.length <= 0 ? (
          
      <div className="border-t-[3px] border-[#603813] bg-[#F7F6F7] p-5">
            <FontAwesomeIcon
              className="mr-3"
              fontSize={"1.2rem"}
              icon={faWindowMaximize}
            />
            <span>No Order</span>
      </div>
          
        ) : (
        )} */}
      <ListOrder data={fake} changeStatus={v=>console.log(v)} />
    </div>
  );
};

export default Order;
