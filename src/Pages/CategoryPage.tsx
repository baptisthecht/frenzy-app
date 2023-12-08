import TopBanner from "../Components/TopBanner";
import { useParams } from "react-router-dom";
import CompanyData from '../../data.json'
import ProductsCarousel from "../Components/ProductsCarousel";
import CategoryCarousel from "../Components/CategoryCarousel";
import TotalBar from "../Components/TotalBar";
import ActionButtons from "../Components/ActionButtons";
import CartPreview from "../Components/CartPreview";
import Modal from "../Components/Modal";
import WhereToEatModal from "../Components/WhereToEatModal";
import EatHereChoiceModal from "../Components/EatHereChoiceModal";
import ConfirmCartModal from "../Components/ConfirmCartModal";
import ChoosePaymentModal from "../Components/ChoosePaymentModal";
import ConfirmedOrderModal from "../Components/ConfirmedOrderModal";
import CBModal from "../Components/CBModal";

export default function CategoryPage() {

    const index = useParams().id;
    const indexNumber = index ? +index : 0;
    const categoryExists = CompanyData.categories[indexNumber] ? true : false;
    if (!categoryExists) {
        window.location.href = '/cat/0';
    }

  return (
    <div className="h-screen flex flex-col">
        <TopBanner />
        <div className="flex h-[1250px] divide-x-2">
          <CategoryCarousel />
          <ProductsCarousel id={indexNumber} />
        </div>
        <TotalBar />
        <CartPreview />
        <ActionButtons />
        {/* Modals : */}
        <Modal />
        <WhereToEatModal />
        <EatHereChoiceModal />
        <ConfirmCartModal />
        <ChoosePaymentModal />
        <ConfirmedOrderModal />
        <CBModal />
    </div>
  )
}
