import { faWindowMaximize } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showToast } from "@redux/slices/toast/toastSlice";
import { useAppDispatch } from "@redux/store";
import { GET } from "@utils/fetch";
import React, { useState } from "react";
import { useQuery } from "react-query";
import ListOrder from "./ListOrder";

const Order = () => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState({
    status: "",
  });
  const { data } = useQuery(["get-list-order", state.status], async () => {
    try {
      const res = await GET(`/api/orders/book/list${state.status}`);
      return res.data;
    } catch (error) {
      dispatch(() => showToast(String(error)));
    }
  });
  console.log(data);

  return (
    <div>
      {data?.data.results.length <= 0 ? (
        <div className="border-t-[3px] border-[#603813] bg-[#F7F6F7] p-5">
          <FontAwesomeIcon
            className="mr-3"
            fontSize={"1.2rem"}
            icon={faWindowMaximize}
          />
          <span>No Order</span>
        </div>
      ) : (
        <ListOrder
          totalPage={data?.data.total}
          data={data?.data.results}
          changeStatus={(v) => setState((p) => ({ ...p, status: v }))}
        />
      )}
    </div>
  );
};

export default Order;
