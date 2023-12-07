import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux';
import { setHereChoice } from '../redux';
import CompanyData from '../../data.json';

export default function Example() {
  const dispatch = useDispatch();

  const cancelButtonRef = useRef(null)
  const hereChoice = useSelector((state: any) => state.whereToEat.hereChoice);
  const whereToEat = useSelector((state: any) => state.whereToEat.whereToEat);

  const handleClick = (option: any) => {
    dispatch(setHereChoice(option))
  }


  return (
    <Transition.Root show={hereChoice == "" && whereToEat == "Sur place" && CompanyData.company.multiple_eat_here} as={Fragment}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-16">
                <div>

                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="font-semibold leading-6 text-gray-900 text-3xl pb-5">
                      Où manger ?
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-xl text-gray-500 pb-3">
                        Choisissez :
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  { CompanyData.company.eat_here_possibilities.map((option: any) => (
                    <button onClick={() => {handleClick(option)}} key={option}><span className='text-xl flex flex-col gap-5 items-center'>{option}</span></button>
                  ))}
                </div>
              
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
