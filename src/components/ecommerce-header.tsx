
import Link from "next/link";
import { Button } from "./ui/button";
import { ShoppingCart, User, Search, Store } from "lucide-react";

export function EcommerceHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/ecommerce" className="mr-6 flex items-center gap-2">
            <Store className="h-6 w-6 text-accent"/>
            <span className="font-bold">Adi's Store</span>
        </Link>
        <nav className="hidden md:flex gap-6 items-center flex-1">
          <Link href="/ecommerce/products?category=Apparel" className="font-medium text-sm text-muted-foreground hover:text-foreground">Apparel</Link>
          <Link href="/ecommerce/products?category=Electronics" className="font-medium text-sm text-muted-foreground hover:text-foreground">Electronics</Link>
          <Link href="/ecommerce/products?category=Accessories" className="font-medium text-sm text-muted-foreground hover:text-foreground">Accessories</Link>
          <Link href="/ecommerce/products?category=Furniture" className="font-medium text-sm text-muted-foreground hover:text-foreground">Furniture</Link>
        </nav>
        <div className="flex items-center justify-end flex-1 gap-4">
            <Button variant="ghost" size="icon">
                <Search className="h-5 w-5"/>
                <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5"/>
                <span className="sr-only">Cart</span>
            </Button>
            <Button variant="ghost" size="icon">
                <User className="h-5 w-5"/>
                <span className="sr-only">Account</span>
            </Button>
        </div>
      </div>
    </header>
  );
}
