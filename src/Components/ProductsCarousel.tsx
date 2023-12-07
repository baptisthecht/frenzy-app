import CompanyData from '../../data.json'
import ProductCard from '../Components/ProductCard';

export default function ProductsCarousel(props: any) {

  const category = CompanyData.categories[props.id]

  return (
    <div className='w-4/5 overflow-scroll px-3 noscrollbar'>
        <div className='text-4xl uppercase font-semibold py-5'>{category.name}</div>
        <div className='grid grid-cols-3 gap-3 pb-5'>
            {category.products.map((product: any, index: number) => (
               <ProductCard product={product} idcat={props.id} key={index} />
            ))}
                        {category.products.map((product: any, index: number) => (
               <ProductCard product={product} idcat={props.id} key={index} />
            ))}
                        {category.products.map((product: any, index: number) => (
               <ProductCard product={product} idcat={props.id} key={index} />
            ))}
        </div>
    </div>
  )
}
