import { useSelector } from "react-redux";

export default function TotalBar() {

    const carttotal = useSelector((state: any) => state.cart.total);

  return (
    <div className="w-full flex justify-between bg-orange-600 py-2 px-8 font-semibold uppercase text-white text-xl">
        <div className="flex gap-5">
            <span>Ma commande</span>
            <span>Sur place</span>
        </div>
        <div className="flex gap-5">
            <span>Total :</span>
            <span>{carttotal.toFixed(2)} €</span>
        </div>
    </div>
  )
}
