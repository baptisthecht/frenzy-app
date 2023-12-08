import CompanyData from '../../data.json'
import CategoryCard from './CategoryCard'

export default function CategoryCarousel() {
            
    const categories = CompanyData.categories

  return (
    <div className='w-1/5 overflow-scroll h-full py-3 noscrollbar'>
        {categories.map((category: any) => (
            <CategoryCard category={category} key={categories.findIndex((cat) => cat === category)}/>
        ))}
    </div>
  )
}
