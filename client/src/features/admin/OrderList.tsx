import { useState } from "react";
import { Loader } from "../../components";
import {
  useAllOrdersQuery,
  useDeleteOrderMutation,
  useUpdateOrderMutation,
} from "../orders/orderAPI";

const OrderList = () => {
  const [deleteOrder] = useDeleteOrderMutation();
  const { data, isLoading } = useAllOrdersQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Orders</h2>
          {data?.orders.map((order, idx) => (
            <div
              key={idx}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold  ">Order Id {order._id} </h3>
                <span className="flex items-center gap-2">
                  Status:
                  <SelectStatusOption
                    orderId={order._id}
                    currentVal={order.status}
                  />
                </span>
              </div>
              <table className="min-w-full text-left bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border w-[30px]">S.No.</th>
                    <th className="py-2 px-4 border w-1/6">Customer Name</th>
                    <th className="py-2 px-4 border w-2/3">Product Name</th>
                    <th className="py-2 px-4 border w-1/6">Quantity</th>
                    <th className="py-2 px-4 border w-1/6">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((product, idx) => (
                    <tr key={idx}>
                      <td className="py-2 px-4 border w-[30px]">{idx + 1}</td>
                      <td className="py-2 px-4 border w-1/6">{order.customerName}</td>
                      <td className="py-2 px-4 border w-2/3">{product.name}</td>
                      <td className="py-2 px-4 border w-1/6">{product.quantity}</td>
                      <td className="py-2 px-4 border w-1/6">&#8377;{product.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-center justify-between">
                <p className="mt-2">Total Price: &#8377;{order.totalAmount}</p>
                <div className="flex gap-3">
                  <button className="py-2 px-4 rounded-full bg-slate-900 text-white text-sm font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-4">
                    Update
                  </button>
                  <button
                    className="py-2 px-4 rounded-full bg-red-500 text-white text-sm font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-4"
                    onClick={async () => {
                      await deleteOrder(order._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default OrderList;

const SelectStatusOption = ({ orderId, currentVal }: { orderId: string; currentVal: string }) => {
  const [selectedStatus, setSelectedStatus] = useState(currentVal);
  const [updateOrder] = useUpdateOrderMutation();

  return (
    <select
      className="border p-2 rounded-md bg-slate-100 cursor-pointer"
      value={selectedStatus}
      onChange={(e) => {
        const status = e.target.value;
        updateOrder({ id: orderId, order: { status: status } });
        setSelectedStatus(status);
      }}
    >
      <option value="Processing">Processing</option>
      <option value="Shipped">Shipped</option>
      <option value="Delivered">Delivered</option>
    </select>
  );
};
