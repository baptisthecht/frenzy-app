import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { decrementItemQuantity, incrementItemQuantity, setConfirmCart } from "../redux";

export default function test() {

    const cancelButtonRef = useRef(null)
    const cartitems = useSelector((state: any) => state.cart.items);
    const filteredCartItems: Array<any> = cartitems.filter((item: any) => item.quantity > 0);
    const total = useSelector((state: any) => state.cart.total);
    const confirmCart = useSelector((state: any) => state.confirmCart);

    const dispatch = useDispatch();
    const handleDecrease = (product: any) => {
        dispatch(decrementItemQuantity(product));
      };
    
      const handleIncrease = (product: any) => {
        dispatch(incrementItemQuantity(product));
      };

    return (
        <Transition.Root show={confirmCart.confirmCart} as={Fragment}>
          <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => {}}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
    
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-3xl bg-white p-10 text-left shadow-xl transition-all h-[1400px] w-[800px] border-8 border-primary">
                    <div>
    
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title as="h3" className="font-semibold leading-6 text-gray-900 text-4xl pb-5">
                          Confirmer la commande
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-2xl text-gray-500 pb-20">
                            Voici un récapitulaif de votre commande :
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 h-[1000px] max-h-[1000px] overflow-y-scroll scroll-gray">
                    {filteredCartItems.reverse().map((item: any, index: number) => (
                        <div className="mb-2">
                            <div className="px-5 flex justify-between items-center ">                        
                                <span className="font-semibold text-xl">{item.product.name}</span>
                                <div className="flex gap-5">
                                    <div className="flex gap-2 text-xl items-center">
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
                            <div className="flex justify-between gap-5 px-5 py-2 text-xl" key={index}>
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
                    <div className="flex justify-between items-center px-5">
                        <span className="font-semibold text-2xl">Total</span>
                        <span className="font-semibold text-2xl">{total.toFixed(2)} €</span>
                    </div>
                    <div className="w-full flex items-center justify-center gap-5 py-3 pt-10">
                        <button onClick={() => { dispatch(setConfirmCart(false)) }} className="uppercase text-xl font-semibold w-96 py-3 px-2 bg-gray-200 rounded-full">Retour à ma commande</button>
                        <button className="uppercase text-xl font-semibold w-96 py-3 px-2 bg-primary text-white rounded-full">Passer au paiement</button>
                    </div>
                  
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )
    }
    