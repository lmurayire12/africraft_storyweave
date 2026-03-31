import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BadgeCheck, MapPin, Star } from "lucide-react";
import { artisans } from "../data/mockData";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithLoading } from "./ui/image-with-loading";
import { getAllProducts } from "../data/catalogStore";

export function ArtisanProfile() {
  const { id } = useParams();
  const artisan = artisans.find((a) => a.id === id);

  if (!artisan) {
    return <div className="mx-auto max-w-7xl px-4 py-12 text-center text-slate-600">Artisan not found.</div>;
  }

  const artisanProducts = getAllProducts().filter((p) => p.artisanId === artisan.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
        <ArrowLeft className="h-4 w-4" />
        Back to Marketplace
      </Link>

      <Card className="mb-8 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <ImageWithLoading src={artisan.avatar} alt={artisan.name} className="h-20 w-20 rounded-full object-cover" />
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900">{artisan.name}</h1>
              {artisan.verified && <BadgeCheck className="h-5 w-5 text-green-600" />}
            </div>
            <div className="mb-2 flex items-center gap-1 text-sm text-slate-600">
              <MapPin className="h-4 w-4" />
              {artisan.location}
            </div>
            <p className="text-slate-700">{artisan.bio}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4 text-sm">
            <div className="mb-1 flex items-center gap-1"><Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {artisan.rating}</div>
            <div>{artisan.totalSales} sales</div>
            <Badge variant="outline" className="mt-2">{artisan.specialty}</Badge>
          </div>
        </div>
      </Card>

      <h2 className="mb-4 text-xl font-bold text-slate-900">Products by {artisan.name}</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {artisanProducts.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <Card className="overflow-hidden transition-shadow hover:shadow-md">
              <ImageWithLoading src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-slate-900">{product.name}</h3>
                <p className="mt-1 text-sm text-slate-600">${product.price}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
