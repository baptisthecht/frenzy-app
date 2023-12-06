import { useDispatch } from "react-redux";
import { showCancelOrderModal } from "../redux";

export default function ActionButtons() {

  const dispatch = useDispatch();

  return (
    <div className="w-full flex items-center justify-center gap-5 py-3 border-t-2 border-orange-600">
        <button onClick={() => dispatch(showCancelOrderModal())} className="uppercase text-xl font-semibold w-96 py-2 bg-gray-200 rounded-full">Annuler ma commande</button>
        <button className="uppercase text-xl font-semibold w-96 py-2 bg-orange-600 text-white rounded-full">Continuer</button>
    </div>
  )
}
