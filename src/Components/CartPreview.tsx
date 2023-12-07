import { useDispatch, useSelector } from "react-redux";
import { decrementItemQuantity, incrementItemQuantity } from "../redux";

export default function CartPreview() {

    const cartitems = useSelector((state: any) => state.cart.items);
    const filteredCartItems: Array<any> = cartitems.filter((item: any) => item.quantity > 0);
    const dispatch = useDispatch();
    const handleDecrease = (product: any) => {
        dispatch(decrementItemQuantity(product));
      };
    
      const handleIncrease = (product: any) => {
        dispatch(incrementItemQuantity(product));
      };

  return (
    <div className="bg-gray-50 h-[358px] px-8 py-3">
        <h1 className="text-xl font-semibold uppercase mb-2">Mon panier</h1>
        <div className="grid grid-cols-2 max-h-64 overflow-y-scroll scroll-gray">
        {filteredCartItems.reverse().map((item: any, index: number) => (
            <div className="mb-2">
                <div className="px-5 flex justify-between items-center ">                        
                    <span className="font-semibold text-lg">{item.product.name}</span>
                    <div className="flex gap-5">
                        <div className="flex gap-2 text-lg items-center">
                            { item.quantity > 1 ? <span className="whitespace-nowrap text-gray-600 ">({(item.product.price).toFixed(2)} €)</span> : <></> }
                            <span className="whitespace-nowrap font-semibold">{(item.product.price * item.quantity).toFixed(2)} €</span>
                        </div>
                        <div className="flex gap-1 bg-gray-200 p-1 rounded-full h-8">
                            <button onClick={() => handleDecrease(item.product)} className="cursor-pointer w-5 h-5 flex items-center justify-center text-2xl font-semibold text-black">-</button>
                            <span className="w-5 h-5 flex items-center justify-center font-semibold text-black text-xl">{item.quantity}</span>
                            <button onClick={() => handleIncrease(item.product)}  className="cursor-pointer w-5 h-5 flex items-center justify-center text-2xl font-semibold text-black">+</button>
                        </div> 
                    </div>
                </div>
                <div className="flex justify-between gap-5 px-5 text-lg" key={index}>
                    <div className="flex flex-col">
                        { item.product.variants ? 
                            item.product.variants.map((variant: any, index: number) => (
                                variant.name !== undefined && (
                                    <span className="pl-6" key={index}>
                                        {variant.choice}
                                        <span className="text-gray-500 text-[1rem] ml-2 whitespace-nowrap">
                                            {variant.price > 0 ? "(+ " + variant.price.toFixed(2) + " €)" : ""}
                                        </span>
                                    </span>
                                )
                            ))
                        : <></>}
                    </div>
                </div>
            </div>
        ))}
        </div>
        
    </div>
  )
}
