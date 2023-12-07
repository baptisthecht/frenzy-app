import { Link } from "react-router-dom";
import CompanyData from '../../data.json'

export default function CategoryCard(props: any) {

    const cat = props.category
    const index = CompanyData.categories.findIndex((category: any) => category === cat)
    const link = `/cat/${index}`

  return (
    <Link to={link} className="bg-gray-100 flex flex-col items-center justify-center rounded-xl w-48 h-48 ml-3 mb-3 gap-3 cursor-pointer">
        <img src="/img_menu.png" alt="img_menu"/>
        <h1 className="font-semibold">
            {cat.name.toUpperCase()}
            {cat.index}
        </h1>
    </Link>
  )
}
