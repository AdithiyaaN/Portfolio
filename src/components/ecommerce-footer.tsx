
import Link from "next/link";
import { Store } from "lucide-react";

export function EcommerceFooter() {
  return (
    <footer className="border-t">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Link href="/ecommerce" className="flex items-center gap-2">
                <Store className="h-6 w-6 text-accent"/>
                <span className="font-bold">Adi's Store</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your one-stop shop for quality products.
            </p>
          </div>
          <div className="grid grid-cols-2 md:col-span-2 gap-8 text-sm">
            <div>
              <h4 className="font-semibold mb-3">Shop</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">New Arrivals</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Best Sellers</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Sale</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Customer Service</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Contact Us</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Shipping & Returns</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Adi's Store. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-foreground">Terms of Service</Link>
            <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
