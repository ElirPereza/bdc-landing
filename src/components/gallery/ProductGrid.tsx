import { ProductCard } from "./ProductCard"

interface Product {
  id: number
  image: string
  name: string
  description: string
}

interface ProductGridProps {
  id: string
  title: string
  products: Product[]
}

export function ProductGrid({ id, title, products }: ProductGridProps) {
  return (
    <section id={id} className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">
            {title}
          </h2>
          <div className="w-16 h-0.5 bg-primary mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 slide-up">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              description={product.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
