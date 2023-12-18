import CompanyData from "../../data.json";

export default function PauseScreenPage() {
	const startOrder = () => {
		window.location.href = "/cat/0";
	};

	return (
		<img
			src={CompanyData.company.pause_screen}
			alt="Pause Screen"
			onClick={startOrder}
			className="w-[1080px] h-[1920px] object-contain"
		/>
	);
}
