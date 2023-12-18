import CompanyData from "../../data.json";

export default function TopBanner() {
	return <img src={CompanyData.company.banner} alt="Company banner" />;
}
