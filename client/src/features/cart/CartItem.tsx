import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAppDispatch } from "../../redux/hooks";
import { removeCartItem, updateQuantity, calculatePrice } from "./cartReducer";
import { capitalizeEveryFirstLetter } from "../../utils/features";
// Types
import { CartItem } from "../../types/types";
import { server } from "../../redux/store";
interface Props {
  data: CartItem;
}

const CartItem = ({ data }: Props) => {
  const p = data;
  const [selectedQuantity, setSelectedQuantity] = useState(p.quantity);
  const dispatch = useAppDispatch();

  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      {/* Product Image */}
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <img
          src={`${server}/uploads/${p.thumbnail}`}
          alt={p.name}
          width={120}
          height={120}
        />
      </div>

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Product Name */}
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">{p.name}</div>

          {/* Product Category below md breakpoint */}
          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
            {capitalizeEveryFirstLetter(p.category)}
          </div>

          {/* Product Price */}
          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
            Price : &#8377;{p.price}
          </div>
        </div>

        {/* Product Category above md breakpoint */}
        <div className="text-md font-medium text-black/[0.5] hidden md:block">
          {capitalizeEveryFirstLetter(p.category)}
        </div>

        {/* Quantity and Delete Button Wrapper Start */}
        <div className="flex items-center justify-between mt-4">
          {/* Select Quantity */}
          <div className="flex items-center gap-1">
            {/* Heading */}
            <div className="font-semibold">Quantity:</div>

            {/* Select Input */}
            <select
              className="hover:text-black"
              value={selectedQuantity}
              onChange={(event) => {
                const newQuantity = parseInt(event.target.value);
                dispatch(updateQuantity({ productId: p.productId, newQuantity }));
                dispatch(calculatePrice());
                setSelectedQuantity(newQuantity);
              }}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>

          {/* Delete Button */}
          <RiDeleteBin6Line
            className="cursor-pointer text-black/[0.5] hover:text-red-500 text-[16px] md:text-[20px]"
            onClick={() => {
              dispatch(removeCartItem(String(p.productId)));
              dispatch(calculatePrice());
            }}
          />
        </div>
        {/* Quantity and Delete Button Wrapper End */}
      </div>
    </div>
  );
};

export default CartItem;
