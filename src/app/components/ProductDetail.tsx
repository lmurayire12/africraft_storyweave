import { useParams, Link } from "react-router-dom";
import { products, artisans } from "../data/mockData";
import { BadgeCheck, MapPin, Clock, Package, ArrowLeft, ShoppingCart, Star } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useLanguage } from "../i18n/LanguageContext";
import { getAllProducts } from "../data/catalogStore";

export function ProductDetail() {
  const { id } = useParams();
  const product = getAllProducts().find((p) => p.id === id);
  const artisan = product ? artisans.find((a) => a.id === product.artisanId) : null;
  const { t } = useLanguage();

  const translateCategory = (category: string) => {
    const categoryMap: Record<string, string> = {
      baskets: t("baskets"),
      pottery: t("pottery"),
      jewelry: t("jewelry"),
      textiles: t("textiles"),
      woodwork: t("woodwork"),
      paintings: t("paintings"),
    };
    return categoryMap[category.toLowerCase()] || category;
  };

  if (!product || !artisan) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-center text-slate-600">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
          <ArrowLeft className="h-4 w-4" />
          {t("backToMarketplace")}
        </Link>

        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="aspect-square">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="h-fit rounded-lg bg-white p-6 shadow-sm">
            <Badge className="mb-3">{translateCategory(product.category)}</Badge>
            <h1 className="mb-4 text-3xl font-bold text-slate-900">{product.name}</h1>
            <div className="mb-6 text-3xl font-bold text-amber-600">${product.price}</div>

            <Link to={`/artisan/${artisan.id}`}>
              <Card className="mb-6 cursor-pointer p-4 transition-shadow hover:shadow-md">
                <div className="flex items-start gap-3">
                  <img src={artisan.avatar} alt={artisan.name} className="h-12 w-12 rounded-full object-cover" />
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="font-semibold text-slate-900">{artisan.name}</span>
                      {artisan.verified && <BadgeCheck className="h-4 w-4 text-green-600" />}
                    </div>
                    <div className="mb-2 flex items-center gap-1 text-sm text-slate-600">
                      <MapPin className="h-3 w-3" />
                      {artisan.location}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        {artisan.rating} {t("rating")}
                      </div>
                      <div>{artisan.totalSales} sales</div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            <div className="mb-6 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-slate-400" />
                <div>
                  <div className="text-slate-600">Crafting Time</div>
                  <div className="font-medium">{product.craftingTime}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Package className="h-4 w-4 text-slate-400" />
                <div>
                  <div className="text-slate-600">Availability</div>
                  <div className={`font-medium ${product.inStock ? "text-green-600" : "text-slate-400"}`}>
                    {product.inStock ? t("inStock") : "Out of Stock"}
                  </div>
                </div>
              </div>
            </div>

            <Link to={`/checkout/${product.id}`}>
              <Button className="mb-4 w-full bg-amber-600 text-white hover:bg-amber-700" size="lg" disabled={!product.inStock}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                {product.inStock ? t("buyNow") : "Out of Stock"}
              </Button>
            </Link>

            <div className="text-sm">
              <div className="mb-2 font-medium text-slate-900">Materials:</div>
              <div className="flex flex-wrap gap-2">
                {product.materials.map((material, index) => (
                  <Badge key={index} variant="outline">{material}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card className="p-6">
              <h2 className="mb-4 text-xl font-bold text-slate-900">Artisan's Story</h2>
              <p className="leading-relaxed text-slate-700">{product.story}</p>
            </Card>

            <Card className="p-6">
              <h2 className="mb-4 text-xl font-bold text-slate-900">{t("culturalSignificance")}</h2>
              <p className="leading-relaxed text-slate-700">{product.culturalSignificance}</p>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="mb-4 font-bold text-slate-900">Product Details</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="mb-1 text-slate-600">Dimensions</div>
                  <div className="font-medium">{product.dimensions}</div>
                </div>
                <Separator />
                <div>
                  <div className="mb-1 text-slate-600">Crafting Time</div>
                  <div className="font-medium">{product.craftingTime}</div>
                </div>
                <Separator />
                <div>
                  <div className="mb-1 text-slate-600">Artisan {t("specialty")}</div>
                  <div className="font-medium">{artisan.specialty}</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
