
import { products, Product } from '@/app/ecommerce/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    return products.map((product) => ({
      id: product.id,
    }));
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container py-12">
        <Button asChild variant="ghost" className="mb-8">
            <Link href="/ecommerce">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
            </Link>
        </Button>
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="grid gap-4">
            <Image
                src={product.image}
                alt={product.name}
                width={800}
                height={800}
                className="w-full aspect-square object-cover border rounded-lg shadow-lg"
                data-ai-hint={product.imageHint}
            />
        </div>
        <div className="grid gap-4">
          <div>
            <Badge variant="outline">{product.category}</Badge>
            <h1 className="text-3xl lg:text-4xl font-bold mt-2">{product.name}</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
                {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.round(product.rating.rate) ? 'text-accent fill-accent' : 'text-muted-foreground'}`}/>
                ))}
            </div>
            <span className="text-muted-foreground text-sm">{product.rating.rate} ({product.rating.count} reviews)</span>
          </div>
          <p className="text-muted-foreground text-lg">{product.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
          </div>
            <Button size="lg" className="w-full">Add to Cart</Button>
        </div>
      </div>
    </div>
  );
}
