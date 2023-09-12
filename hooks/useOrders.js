const { ADD_ORDERS, REMOVE_ORDER } = require("@/features/orders/orders.slice");
const { useDispatch, useSelector } = require("react-redux");

export const useOrders = (property = "") => {
  const state = useSelector((state) =>
    property.length < 1 ? state.orders : state.orders[property]
  );

  return state;
};

export const useOrdersActions = () => {
  const dispatch = useDispatch();

  const addOrders = (newOrders = []) => {
    dispatch(ADD_ORDERS(newOrders));
  };

  const removeOrder = (orderId) => {
    dispatch(REMOVE_ORDER(orderId));
  };

  return {
    addOrders,
    removeOrder,
  };
};
