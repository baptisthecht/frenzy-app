import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux";

export default function CartPreview() {

    const cartitems = useSelector((state: any) => state.cart.items);
    const filteredCartItems = cartitems.filter((item: any) => item.quantity > 0);
    const dispatch = useDispatch();
    const handleDecrease = (product: any) => {
        dispatch(removeFromCart({ product: product, number: 1 }));
      };
    
      const handleIncrease = (product: any) => {
        dispatch(addToCart({ product: product, number: 1 }));
      };

  return (
    <div className="bg-gray-50 h-[358px] px-8 py-3">
        <h1 className="text-xl font-semibold uppercase mb-2">Mon panier</h1>
        <div className="grid grid-cols-2 max-h-64 overflow-y-scroll scroll-gray">
        {filteredCartItems.reverse().map((item: any) => (
            <div className="flex justify-between gap-5 py-2 px-5 text-lg" key={item.product.id}>
                <div className="flex flex-col">
                    <span className="font-semibold ">{item.product.name}</span>
                    { item.product.variants ? 
                        item.product.variants.map((variant: any) => (
                            <span className="pl-6" key={variant.choice}>{variant.choice}</span>
                        ))
                    : <></>}
                </div>
                <div className="flex gap-5">
                    <div className="flex gap-2">
                        { item.quantity > 1 ? <span className="whitespace-nowrap text-gray-600">({(item.product.price).toFixed(2)} €)</span> : <></> }
                        <span className="whitespace-nowrap font-semibold">{(item.product.price * item.quantity).toFixed(2)} €</span>
                    </div>
                    <div className="flex gap-1 bg-gray-200 p-1 rounded-full h-8">
                        <button onClick={() => handleDecrease(item.product)} className="cursor-pointer w-5 h-5 flex items-center justify-center text-2xl font-semibold text-black">-</button>
                        <span className="w-5 h-5 flex items-center justify-center font-semibold text-black text-xl">{item.quantity}</span>
                        <button onClick={() => handleIncrease(item.product)}  className="cursor-pointer w-5 h-5 flex items-center justify-center text-2xl font-semibold text-black">+</button>
                    </div> 
                </div>
            </div>
        ))}
        </div>
        
    </div>
  )
}
