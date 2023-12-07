import { Fragment, useEffect, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addVariant, hideCancelOrderModal, resetActualVariants } from '../redux';

export default function Example(props: any) {
  const dispatch = useDispatch();

  const cancelButtonRef = useRef(null)
  const variant = props.variant;
  const product = props.product;
  const actualVariants = useSelector((state: any) => state.actualVariants);

  const handleClick = (option: any) => {
    const newvariant = {'name' : variant.name, 'choice' : option.name, 'price': option.supplement, "product_id": product.id}
    dispatch(addVariant(newvariant))
    setTimeout(() => {
      props.increment();
      console.log(actualVariants.actualVariants)
    }, 1);
  }

  useEffect(() => {
      setTimeout(() => {
        if(actualVariants.actualVariants.length-1 === product.variants.length) {
          const productToAdd = {
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "price": product.price,
            "image": product.image, 
            "variants": actualVariants.actualVariants,
          }
          dispatch(addToCart({product: productToAdd, number: 1}));
          dispatch(resetActualVariants());
          props.resetStep();
        }
      }, 100);
  }, [actualVariants.actualVariants.length])



  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => dispatch(hideCancelOrderModal())}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
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
                <div className='flex flex-col justify-between h-full'>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="font-semibold leading-6 text-gray-900 text-4xl pb-5">
                      {product.name}
                      <img src={product.image} alt="" />
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-2xl text-gray-500 pb-3">
                        Choisissez votre {variant.name.toLowerCase()} :
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  { variant.options?.map((option: any) => (
                    <button onClick={() => {handleClick(option)}} key={option.name}><span className='text-2xl flex flex-col gap-5 items-center'><img className="w-44" src={option.image}></img>{option.name}</span><span className='ml-1 text-md text-primary whitespace-nowrap'>{option.supplement > 0 ? '(+ ' + option.supplement.toFixed(2) + "€)" : ""}</span></button>
                  ))}
                  </div>
                  <div className="flex justify-center w-full">
                    <div className='h-32 w-[90%]'>
                      <div className="w-full h-2 bg-primary rounded-xl flex justify-evenly relative">
                        <div className="absolute bottom-0 flex w-full">
                          {product.variants.map((variant:any, index: number) => (
                          <div key={variant.name} className={`w-full h-2 rounded-xl ${index <= props.step ? "bg-primary" : "bg-gray-400"}`}></div>
                          ))}
                        </div>
                        {product.variants.map((variant: any, index: number) => (
                          <div className='flex flex-col h-32 gap-3 -translate-y-12 w-full items-end'>
                            <div className="flex flex-col items-center translate-x-1/2 translate-y-1 gap-2">
                              <div className={`text-lg font-medium ${index <= props.step ? "text-primary" : "text-gray-400"}`}> {variant.name} </div> 
                              <div className={`h-6 w-6 rounded-full ${index <= props.step ? "bg-primary" : "bg-gray-400"}`}></div>
                            </div>
                          </div> ))}
                      </div>
                    </div>
                  </div>
                  
                </div>

              
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
