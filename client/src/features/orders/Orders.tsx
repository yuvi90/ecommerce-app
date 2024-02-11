import { useUserOrdersQuery } from "./orderAPI";
import { selectCurrentUser } from "../auth";
import { useAppSelector } from "../../redux/hooks";
import { Loader } from "../../components";

const Orders = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data, isLoading } = useUserOrdersQuery(user!);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full max-w-[1280px] mx-auto py-10 px-4">
          <h2 className="text-2xl font-bold mb-4">Your Orders</h2>

          {data?.orders.length === 0 && <p>Your order list is empty.</p>}

          {data?.orders.map((order, idx) => (
            <div
              key={idx}
              className="mb-8"
            >
              <h3 className="text-lg font-bold mb-2">Order Id {order._id}</h3>
              <table className="min-w-full text-left bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border w-2/3">Product Name</th>
                    <th className="py-2 px-4 border w-1/6">Quantity</th>
                    <th className="py-2 px-4 border w-1/6">Price</th>
                    <th className="py-2 px-4 border w-1/6">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((product, idx) => (
                    <tr key={idx}>
                      <td className="py-2 px-4 border w-2/3">{product.name}</td>
                      <td className="py-2 px-4 border w-1/6">{product.quantity}</td>
                      <td className="py-2 px-4 border w-1/6">&#8377;{product.price}</td>
                      <td className="py-2 px-4 border w-1/6">{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-2">Total Price: &#8377;{order.totalAmount}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Orders;
