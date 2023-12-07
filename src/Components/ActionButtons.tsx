import { useDispatch, useSelector } from "react-redux";
import { setConfirmCart, showCancelOrderModal } from "../redux";

export default function ActionButtons() {

  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);

  return (
    <div className="w-full flex items-center justify-center gap-5 py-3 border-t-2 border-primary">
        <button onClick={() => dispatch(showCancelOrderModal())} className="uppercase text-xl font-semibold w-96 py-3 px-2 bg-gray-200 rounded-full">Annuler ma commande</button>
        <button onClick={() => dispatch(setConfirmCart(true))} className="uppercase text-xl font-semibold w-96 py-3 px-2 bg-primary disabled:bg-primary/60 text-white rounded-full" disabled={cart.items.length <= 1 } >Continuer</button>
    </div>
  )
}
