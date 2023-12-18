import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setPaymentCompleted, setPaymentIntentId } from "../redux";

export default function test() {

    const cancelButtonRef = useRef(null)

    const dispatch = useDispatch();
    const paymentBorne = useSelector((state: any) => state.payment.paymentBorne);
    const paymentCompleted = useSelector((state: any) => state.payment.paymentCompleted);
    const totalCart = useSelector((state: any) => state.cart.total);
    // const paymentIntentId = useSelector((state: any) => state.payment.paymentIntentId);
    var PaymentIntentdata: any = undefined;
    const handleClick = () => {
      simulatePayment()
    }

    const createPaymentIntent = async () => {
      const response = await fetch('http://localhost:3000/api/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({amount: totalCart}),
      });
      PaymentIntentdata = await response.json();
      if(PaymentIntentdata.error){
        console.warn(PaymentIntentdata.error)
      }
    }

    const checkForPayment = async () => {
      const response = await fetch('http://localhost:3000/api/get-payment-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({PaymentIntentId: PaymentIntentdata.paymentIntent.id}),
      });
      const data = await response.json();
      if(data.paid === true && data.captured === true){
        dispatch(setPaymentCompleted(true))
        console.log('paid')
      }else{
        console.log(PaymentIntentdata.paymentIntent.id)
      }
      return data;
    } 

    const simulatePayment = async () => {
      const response = await fetch('http://localhost:3000/readers/simulate-payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({PaymentIntentId: PaymentIntentdata.paymentIntent.id}),
      });
      const data = await response.json();
      return data;
    }

    useEffect(() => {
      if(paymentBorne){
        createPaymentIntent()
        setTimeout(() => {
          const intervalID = setInterval(() => {
            checkForPayment();
          }, 1000);
          return () => clearInterval(intervalID);
        }, 1000);
      }
    }, [paymentBorne])

    return (
        <Transition.Root show={paymentBorne === true && paymentCompleted === false} as={Fragment}>
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
                          CB
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-2xl text-gray-500 pb-20">
                            Suivez les instructions sur le terminal de paiement
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 h-[1000px] max-h-[1000px] overflow-y-scroll scroll-gray">
                        <button onClick={() => handleClick()}>MARQUER COMME PAYÉ</button>
                    </div>
                    <div className="flex justify-between items-center px-5">
                        <span className="font-semibold text-2xl">Total</span>
                        <span className="font-semibold text-2xl"> €</span>
                    </div>
                  
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )
    }
    