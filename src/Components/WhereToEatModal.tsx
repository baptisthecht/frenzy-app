import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux';
import { setWhereToEat } from '../redux';
import CompanyData from '../../data.json';

export default function Example() {
  const dispatch = useDispatch();

  const cancelButtonRef = useRef(null)
  const whereToEat = useSelector((state: any) => state.whereToEat.whereToEat);

  const handleClick = (option: any) => {
    dispatch(setWhereToEat(option))
  }

  return (
     <Transition.Root show={whereToEat == ""} as={Fragment}>
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
                     Bienvenue chez {CompanyData.company.name}
                   </Dialog.Title>
                   <div className="mt-2">
                     <p className="text-2xl text-gray-500 pb-20">
                       Où souhaitez-vous manger ?
                     </p>
                   </div>
                 </div>
               </div>
               <div className="flex flex-col h-[1000px] max-h-[1000px] overflow-y-scroll scroll-gray items-center justify-center gap-10">
                  <button onClick={() => {handleClick('Sur place')}} ><span className='text-xl flex flex-col items-center justify-center h-80 w-[600px] rounded-xl bg-gray-100'><img className="w-36" src='/eathere.svg'></img><span className='text-2xl'>Sur place</span></span></button>
                  <button onClick={() => {handleClick('À emporter')}} ><span className='text-xl flex flex-col justify-center items-center h-80 w-[600px] rounded-xl bg-gray-100'><img className="w-36" src='/takeaway.svg'></img><span className='text-2xl'>À emporter</span></span></button>
               </div>
             
             </Dialog.Panel>
           </Transition.Child>
         </div>
       </div>
     </Dialog>
   </Transition.Root>
  )
}
