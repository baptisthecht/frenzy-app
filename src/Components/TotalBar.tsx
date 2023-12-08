import { useSelector } from 'react-redux';
import CompanyData from '../../data.json';

export default function TotalBar() {

    const cartTotal = useSelector((state: any) => state.cart.total);
    const whereToEat = useSelector((state: any) => state.whereToEat.whereToEat);
    const eatHereChoice = useSelector((state: any) => state.whereToEat.hereChoice);

  return (
    <div className="w-full flex justify-between bg-primary py-2 px-8 font-semibold uppercase text-white text-xl">
        <div className="flex gap-5">
            <span>Ma commande</span>
            <span className="flex gap-2">
            <span>{whereToEat} </span>
              { whereToEat == 'Sur place' && CompanyData.company.multiple_eat_here && eatHereChoice != "" && <span>({eatHereChoice})</span>}
           </span>
        </div>
        <div className="flex gap-5">
            <span>Total :</span>
            <span>{cartTotal.toFixed(2)} €</span>
        </div>
    </div>
  )
}
