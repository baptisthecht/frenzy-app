import TopBanner from "../Components/TopBanner";
import { useParams } from "react-router-dom";
import CompanyData from "../../data.json";
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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
	setCommandNumber,
	setError,
	setMessage,
	setPaymentCompleted,
} from "../redux";
import ErrorModal from "../Components/ErrorModal";

export default function CategoryPage() {
	const index = useParams().id;
	const indexNumber = index ? +index : 0;
	if (!CompanyData.categories[indexNumber]) window.location.href = "/cat/0";

	const paymentCompleted = useSelector(
		(state: any) => state.payment.paymentCompleted
	);
	const TotalCart = useSelector((state: any) => state.cart.total);
	const Items = useSelector((state: any) => state.cart.items);
	const PaidOnBorne = useSelector((state: any) => state.payment.paymentBorne);
	const WhereToEat = useSelector((state: any) => state.whereToEat.whereToEat);
	const EatHereChoice = useSelector(
		(state: any) => state.whereToEat.hereChoice
	);
	const API_KEY = import.meta.env.VITE_API_KEY;

	const dispatch = useDispatch();

	const sendOrderToAPI = async () => {
		const order = {
			items: Items,
			total: TotalCart.toFixed(2),
			paid: PaidOnBorne,
			paidOnBorne: PaidOnBorne,
			whereToEat: WhereToEat,
			created_at: Date.now(),
			eatHereChoice: EatHereChoice,
			API_KEY: API_KEY,
		};
		await axios
			.post(import.meta.env.VITE_API_URL + "/api/neworder", order)
			.then((res) => {
				dispatch(setCommandNumber(res.data.command_number));
			})
			.catch((err: any) => {
				dispatch(setPaymentCompleted(false));
				dispatch(setError(true));
				dispatch(setMessage(err.message));
			});
	};

	useEffect(() => {
		if (paymentCompleted) {
			sendOrderToAPI();
		}
	}, [paymentCompleted]);

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
			<ErrorModal />
		</div>
	);
}
