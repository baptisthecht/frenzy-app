import { useDispatch, useSelector } from "react-redux";
import { addToCart, incrementStep } from "../redux";
import VariantModal from "./VariantModal";

export default function ProductCard(props: any) {

    const dispatch = useDispatch();

    const product = props.product;
    const variants = product.variants;
    const step = useSelector((state: any) => state.step);

    const addItemToCart = () => {
        if(variants) {
            dispatch(incrementStep(product.id));
        }else{
        dispatch(addToCart({product, number: 1}));
        }
    }

    return (
        <>
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
            { step.step === 0 && step.actualProductId === product.id ? <VariantModal variant={variants[0]} product={product} /> : <></>}
            { step.step === 1 && step.actualProductId === product.id ? <VariantModal variant={variants[1]} product={product} /> : <></>}
            { step.step === 2 && step.actualProductId === product.id ? <VariantModal variant={variants[2]} product={product} /> : <></>}
        </>
        
      )
}
