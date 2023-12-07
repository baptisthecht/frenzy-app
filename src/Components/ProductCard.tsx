import { useDispatch } from "react-redux";
import { addToCart } from "../redux";
import VariantModal from "./VariantModal";
import { useState } from "react";

export default function ProductCard(props: any) {

    const dispatch = useDispatch();

    const product = props.product;
    const variants = product.variants;
    const [step, setStep] = useState(-1)

    const addItemToCart = () => {
        if(variants) {
            setStep((previous) => previous + 1)
            console.log(step)
        }else{
            dispatch(addToCart({product, number: 1}));
        }
    }

    return (
        <div>
            <div onClick={() => addItemToCart()} className="bg-gray-100 flex flex-col items-center justify-center rounded-xl h-64 gap-3 cursor-pointer">
                <img src="/img_menu.png" alt="img_menu" className="w-48"/>
                <div className="flex flex-col items-center">
                    <h1 className="font-medium text-lg text-center px-5">
                        {product.name.toUpperCase()}
                    </h1>
                    <h1 className="font-semibold text-lg">
                        {product.price.toFixed(2).toUpperCase()} €
                    </h1>
                </div>
            </div>
            { variants ? variants.map((variant: any, index: number) => (
                step === variant.id && <VariantModal key={index} variant={variant} step={step} product={product} increment={() => setStep((previous) => previous + 1)} resetStep={() => {setStep(-1)}} />
            )) : <></>}

        </div>
        
      )
}
