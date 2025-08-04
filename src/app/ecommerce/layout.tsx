
import { EcommerceHeader } from "@/components/ecommerce-header";
import { EcommerceFooter } from "@/components/ecommerce-footer";

export default function EcommerceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <EcommerceHeader />
      <main className="flex-1">{children}</main>
      <EcommerceFooter />
    </div>
  );
}
