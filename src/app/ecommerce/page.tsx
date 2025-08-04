
import Link from 'next/link';
import Image from 'next/image';
import { products, Product } from './products';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="flex flex-col overflow-hidden h-full">
      <Link href={`/ecommerce/products/${product.id}`} className="block">
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={600}
          className="object-cover w-full aspect-square"
          data-ai-hint={product.imageHint}
        />
      </Link>
      <CardContent className="p-4 flex-grow">
        {product.category && <Badge variant="outline" className="mb-2">{product.category}</Badge>}
        <h3 className="font-semibold text-lg">
          <Link href={`/ecommerce/products/${product.id}`} className="hover:text-accent">{product.name}</Link>
        </h3>
        <div className="flex items-center gap-1 mt-2">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="text-sm text-muted-foreground">{product.rating.rate} ({product.rating.count} reviews)</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="font-bold text-xl">${product.price.toFixed(2)}</p>
        <Button size="sm">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}


export default function EcommercePage() {
  return (
    <div>
        <section className="bg-card py-20">
            <div className="container text-center">
                <h1 className="text-4xl font-bold tracking-tight lg:text-5xl text-accent">Discover Our Collection</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Browse through our curated selection of high-quality products. We have something for everyone.</p>
            </div>
        </section>
      <div className="container py-12">
        <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
