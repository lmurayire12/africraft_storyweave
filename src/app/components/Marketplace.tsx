import { useState } from "react";
import { Link } from "react-router-dom";
import { products, artisans } from "../data/mockData";
import { Search, Filter, BadgeCheck, Star } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useLanguage } from "../i18n/LanguageContext";
import { getAllProducts } from "../data/catalogStore";

export function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { t } = useLanguage();
  const allProducts = getAllProducts();

  const categories = ["all", ...Array.from(new Set(allProducts.map((p) => p.category)))];

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.story.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getArtisan = (artisanId: string) => artisans.find((a) => a.id === artisanId);

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

  return (
    <div className="min-h-screen">
      <div className="border-b border-slate-200 bg-gradient-to-br from-amber-50 via-orange-50 to-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl">{t("heroTitle")}</h1>
            <p className="mb-8 text-lg text-slate-600">{t("heroDescription")}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm">
                <BadgeCheck className="h-5 w-5 text-green-600" />
                <span className="text-slate-700">{t("artisansVerified")}</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm">
                <Star className="h-5 w-5 text-amber-500" />
                <span className="text-slate-700">{t("authenticProducts")}</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm">
                <BadgeCheck className="h-5 w-5 text-blue-600" />
                <span className="text-slate-700">{t("globalShipping")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-16 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                type="text"
                placeholder={t("searchPlaceholder")}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="h-10 w-[180px] rounded-md border border-slate-300 bg-white px-3 text-sm"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat === "all" ? "All Categories" : translateCategory(cat)}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-sm text-slate-600">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => {
            const artisan = getArtisan(product.artisanId);
            return (
              <Link key={product.id} to={`/product/${product.id}`}>
                <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="relative aspect-square overflow-hidden bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {product.featured && (
                      <Badge className="absolute right-2 top-2 bg-amber-500 hover:bg-amber-600">Featured</Badge>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <div className="mb-2">
                      <Badge variant="outline" className="text-xs">
                        {translateCategory(product.category)}
                      </Badge>
                    </div>
                    <h3 className="mb-2 line-clamp-2 font-semibold text-slate-900">{product.name}</h3>
                    <p className="mb-3 line-clamp-2 flex-1 text-sm text-slate-600">{product.story}</p>

                    {artisan && (
                      <div className="mb-3 flex items-center gap-2 border-b border-slate-100 pb-3">
                        <img src={artisan.avatar} alt={artisan.name} className="h-6 w-6 rounded-full object-cover" />
                        <div className="flex min-w-0 flex-1 items-center gap-1">
                          <span className="truncate text-xs text-slate-600">{t("by")} {artisan.name}</span>
                          {artisan.verified && <BadgeCheck className="h-3 w-3 flex-shrink-0 text-green-600" />}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-slate-900">${product.price}</span>
                      {product.inStock ? (
                        <span className="text-xs font-medium text-green-600">{t("inStock")}</span>
                      ) : (
                        <span className="text-xs text-slate-400">Out of Stock</span>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-slate-600">No products found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setCategoryFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
