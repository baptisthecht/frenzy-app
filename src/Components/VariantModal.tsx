import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addVariant, hideCancelOrderModal, incrementStep } from '../redux';

export default function Example(props: any) {
  const dispatch = useDispatch();

  const cancelButtonRef = useRef(null)
  const variant = props.variant;
  const product = props.product;
  // const step = useSelector((state: any) => state.step);
  const actualVariants = useSelector((state: any) => state.actualVariants);

  const handleClick = (option: any) => {
    // Inclure la variante dans le store provisoire
    dispatch(addVariant({'name' : variant.name, 'choice' : option.name, 'price': option.supplement}))

    dispatch(incrementStep(product.id));
    setTimeout(() => {
      console.log(actualVariants.actualVariants)
    }, 2000);
    // Vérifier si on est au dernier step, si oui on ajoute l'objet au panier, sinon on incrémente le step
    // if(step.step + 1 === product.variants.length) {
    //   const productToAdd = {
    //     "id": product.id,
    //     "name": product.name,
    //     "description": product.description,
    //     "price": product.price,
    //     "image": product.image, 
    //     "variants": actualVariants.actualVariants,
    //   }
    //   console.log(productToAdd);
    //   dispatch(addToCart({product: productToAdd, number: 1}));
    //   console.log(actualVariants.actualVariants)
    // }
  }

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
                      {variant.name}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-xl text-gray-500 pb-3">
                        Choisissez :
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  { variant.options?.map((option: any) => (
                    <button onClick={() => {handleClick(option)}} key={option.name}>{option.name}</button>
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
