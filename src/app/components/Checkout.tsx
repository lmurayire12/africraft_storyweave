import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ImageWithLoading } from "./ui/image-with-loading";
import { getAllProducts } from "../data/catalogStore";

export function Checkout() {
  const { id } = useParams();
  const product = useMemo(() => getAllProducts().find((p) => p.id === id), [id]);
  const [submitted, setSubmitted] = useState(false);

  if (!product) {
    return <div className="mx-auto max-w-7xl px-4 py-12 text-center text-slate-600">Product not found.</div>;
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <h1 className="mb-3 text-3xl font-bold text-slate-900">Order Confirmed</h1>
        <p className="text-slate-600">Your order for {product.name} was placed successfully.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-3">
      <Card className="p-6 lg:col-span-2">
        <h1 className="mb-6 text-2xl font-bold text-slate-900">Checkout</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input placeholder="First name" />
          <Input placeholder="Last name" />
          <Input placeholder="Email" type="email" className="sm:col-span-2" />
          <Input placeholder="Address" className="sm:col-span-2" />
          <Input placeholder="City" />
          <Input placeholder="Country" />
        </div>
        <Button className="mt-6 w-full bg-amber-600 hover:bg-amber-700" onClick={() => setSubmitted(true)}>
          Place Order
        </Button>
      </Card>

      <Card className="h-fit p-6">
        <h2 className="mb-4 font-bold text-slate-900">Order Summary</h2>
        <ImageWithLoading src={product.image} alt={product.name} className="mb-4 aspect-square w-full rounded-md object-cover" />
        <div className="mb-2 text-sm text-slate-600">{product.name}</div>
        <div className="text-xl font-bold text-slate-900">${product.price}</div>
      </Card>
    </div>
  );
}
