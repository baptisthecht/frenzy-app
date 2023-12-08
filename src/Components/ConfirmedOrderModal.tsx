import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect, useRef } from "react"
import { useSelector } from "react-redux";
import CompanyData from "../../data.json";

export default function test() {

    const cancelButtonRef = useRef(null)

    const paymentCompleted = useSelector((state: any) => state.payment.paymentCompleted);
    const paymentBorne = useSelector((state: any) => state.payment.paymentBorne);
    const bringsToTable = CompanyData.company.brings_to_table;
    const whereToEat = useSelector((state: any) => state.whereToEat.whereToEat);
    const hereChoice = useSelector((state: any) => state.whereToEat.hereChoice);
    
    useEffect(() => {
      if(paymentCompleted){
        setTimeout(() => {
          window.location.href = '/';
        }, 15000);
      }
    }, [paymentCompleted])


    return (
        <Transition.Root show={paymentCompleted} as={Fragment}>
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
                          Commande confirmée
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-2xl text-gray-500 pb-20">
                            Bonne dégustation !
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center h-[900px] justify-center overflow-y-scroll scroll-gray">
                       <span className="text-2xl">Votre numéro de commande est le :</span>
                       <span className="text-[10rem] font-bold text-primary/70">405</span>
                    </div>

                    <div className="flex flex-col w-full justify-center items-center">
                      <span className="text-2xl">
                      {paymentBorne === false ? "Dirigez vous vers le comptoir pour régler votre commande" : ""}
                      {bringsToTable === false || whereToEat == "À emporter" && paymentBorne === true ? "Dirigez vous vers le comptoir pour récuperer votre commande" : ""}
                      {bringsToTable === true && paymentBorne === true && whereToEat == "Sur place" && hereChoice == "En salle" ? "Installez vous en salle, on s'occupe de tout !" : ""}
                      {bringsToTable === true && paymentBorne === true && whereToEat == "Sur place" && hereChoice == "En terrasse" ? "Installez vous en terrasse, on s'occupe de tout !" : ""}
                      </span>
                      <br/>
                      <span className="text-2xl">N'oubliez pas votre ticket !</span> 
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )
    }
    