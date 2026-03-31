import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { orders, artisans, products, Product } from "../data/mockData";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ImageWithLoading } from "./ui/image-with-loading";
import { addCustomProduct, deleteCustomProduct, getOnlyCustomProducts } from "../data/catalogStore";
import { getCurrentAdmin, signOutAdmin } from "../auth/adminAuth";

export function AdminDashboard() {
  const navigate = useNavigate();
  const revenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const currentAdmin = getCurrentAdmin();

  const [customProducts, setCustomProducts] = useState<Product[]>(() => getOnlyCustomProducts());

  const [name, setName] = useState("");
  const [category, setCategory] = useState("baskets");
  const [artisanId, setArtisanId] = useState(artisans[0]?.id ?? "");
  const [price, setPrice] = useState("");
  const [story, setStory] = useState("");
  const [culturalSignificance, setCulturalSignificance] = useState("");
  const [craftingTime, setCraftingTime] = useState("3-5 days");
  const [dimensions, setDimensions] = useState("30cm x 30cm");
  const [materials, setMaterials] = useState("Sisal");
  const [inStock, setInStock] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [imageDataUrl, setImageDataUrl] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const productCount = useMemo(() => products.length + customProducts.length, [customProducts.length]);

  useEffect(() => {
    setCustomProducts(getOnlyCustomProducts());
  }, []);

  function handleSignOut() {
    signOutAdmin();
    navigate("/admin/auth", { replace: true });
  }

  function readFileAsDataUrl(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("Failed to read file."));
      reader.readAsDataURL(file);
    });
  }

  async function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const dataUrl = await readFileAsDataUrl(file);
    setImageDataUrl(dataUrl);
  }

  function resetForm() {
    setName("");
    setCategory("baskets");
    setArtisanId(artisans[0]?.id ?? "");
    setPrice("");
    setStory("");
    setCulturalSignificance("");
    setCraftingTime("3-5 days");
    setDimensions("30cm x 30cm");
    setMaterials("Sisal");
    setInStock(true);
    setFeatured(false);
    setImageDataUrl("");
  }

  function handleAddProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatusMessage("");

    if (!name.trim() || !price.trim() || !story.trim() || !imageDataUrl) {
      setStatusMessage("Please fill required fields and upload an image.");
      return;
    }

    const nextProduct: Product = {
      id: `custom-${Date.now()}`,
      artisanId,
      name: name.trim(),
      category,
      image: imageDataUrl,
      story: story.trim(),
      culturalSignificance: culturalSignificance.trim() || "Shared by the artisan.",
      price: Number(price),
      inStock,
      featured,
      craftingTime: craftingTime.trim(),
      dimensions: dimensions.trim(),
      materials: materials.split(",").map((item) => item.trim()).filter(Boolean),
    };

    addCustomProduct(nextProduct);
    setCustomProducts(getOnlyCustomProducts());
    resetForm();
    setStatusMessage("Product added successfully.");
  }

  function handleDeleteCustomProduct(productId: string) {
    deleteCustomProduct(productId);
    setCustomProducts(getOnlyCustomProducts());
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-sm text-slate-600">Signed in as {currentAdmin?.email ?? "admin"}</p>
        </div>
        <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="p-4"><div className="text-sm text-slate-600">Revenue</div><div className="text-2xl font-bold">${revenue}</div></Card>
        <Card className="p-4"><div className="text-sm text-slate-600">Orders</div><div className="text-2xl font-bold">{orders.length}</div></Card>
        <Card className="p-4"><div className="text-sm text-slate-600">Artisans</div><div className="text-2xl font-bold">{artisans.length}</div></Card>
        <Card className="p-4"><div className="text-sm text-slate-600">Products</div><div className="text-2xl font-bold">{productCount}</div></Card>
      </div>

      <Card className="mb-8 p-4">
        <h2 className="mb-4 text-lg font-semibold">Add New Product</h2>
        <form className="grid grid-cols-1 gap-3 md:grid-cols-2" onSubmit={handleAddProduct}>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Product name" required />
          <Input
            type="number"
            min="1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price in USD"
            required
          />

          <select className="h-10 rounded-md border border-slate-300 px-3 text-sm" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="baskets">Baskets</option>
            <option value="pottery">Pottery</option>
            <option value="jewelry">Jewelry</option>
            <option value="textiles">Textiles</option>
            <option value="woodwork">Woodwork</option>
            <option value="paintings">Paintings</option>
          </select>

          <select className="h-10 rounded-md border border-slate-300 px-3 text-sm" value={artisanId} onChange={(e) => setArtisanId(e.target.value)}>
            {artisans.map((artisan) => (
              <option key={artisan.id} value={artisan.id}>{artisan.name}</option>
            ))}
          </select>

          <Input value={craftingTime} onChange={(e) => setCraftingTime(e.target.value)} placeholder="Crafting time" />
          <Input value={dimensions} onChange={(e) => setDimensions(e.target.value)} placeholder="Dimensions" />
          <Input value={materials} onChange={(e) => setMaterials(e.target.value)} placeholder="Materials (comma separated)" className="md:col-span-2" />

          <textarea
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Product story"
            className="min-h-24 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-amber-500 focus:ring-2 md:col-span-2"
            required
          />
          <textarea
            value={culturalSignificance}
            onChange={(e) => setCulturalSignificance(e.target.value)}
            placeholder="Cultural significance"
            className="min-h-24 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-amber-500 focus:ring-2 md:col-span-2"
          />

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm text-slate-700">Upload product picture</label>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-slate-700"
              onChange={handleImageChange}
              required={!imageDataUrl}
            />
            {imageDataUrl && (
              <ImageWithLoading src={imageDataUrl} alt="Preview" className="mt-3 h-28 w-28 rounded-md border border-slate-200 object-cover" />
            )}
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} /> In Stock
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} /> Featured
          </label>

          <Button type="submit" className="bg-amber-600 hover:bg-amber-700 md:col-span-2">Add Product</Button>
        </form>
        {statusMessage && <p className="mt-3 text-sm text-slate-700">{statusMessage}</p>}
      </Card>

      <Card className="overflow-auto p-4">
        <h2 className="mb-4 text-lg font-semibold">Recent Orders</h2>
        <table className="w-full min-w-[500px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-600">
              <th className="py-2">Order</th>
              <th className="py-2">Customer</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-slate-100">
                <td className="py-2">{order.id}</td>
                <td className="py-2">{order.customer}</td>
                <td className="py-2">${order.amount}</td>
                <td className="py-2 capitalize">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="mt-8 overflow-auto p-4">
        <h2 className="mb-4 text-lg font-semibold">Custom Products</h2>
        {customProducts.length === 0 ? (
          <p className="text-sm text-slate-600">No custom products added yet.</p>
        ) : (
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600">
                <th className="py-2">Image</th>
                <th className="py-2">Name</th>
                <th className="py-2">Category</th>
                <th className="py-2">Price</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {customProducts.map((product) => (
                <tr key={product.id} className="border-b border-slate-100">
                  <td className="py-2"><ImageWithLoading src={product.image} alt={product.name} className="h-10 w-10 rounded object-cover" /></td>
                  <td className="py-2">{product.name}</td>
                  <td className="py-2 capitalize">{product.category}</td>
                  <td className="py-2">${product.price}</td>
                  <td className="py-2">
                    <Button variant="outline" onClick={() => handleDeleteCustomProduct(product.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
