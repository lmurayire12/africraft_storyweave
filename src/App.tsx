import { Navigate, Route, Routes } from "react-router-dom";
import { RootLayout } from "./app/components/RootLayout";
import { Marketplace } from "./app/components/Marketplace";
import { ProductDetail } from "./app/components/ProductDetail";
import { ArtisanProfile } from "./app/components/ArtisanProfile";
import { Checkout } from "./app/components/Checkout";
import { AdminDashboard } from "./app/components/AdminDashboard";
import { NotFound } from "./app/components/NotFound";
import { AdminAuth } from "./app/components/AdminAuth";
import { UserAuth } from "./app/components/UserAuth";
import { UserProfile } from "./app/components/UserProfile";
import { isAdminSignedIn } from "./app/auth/adminAuth";
import { isUserSignedIn } from "./app/auth/userAuth";

function AdminProtectedRoute() {
  if (!isAdminSignedIn()) {
    return <Navigate to="/admin/auth" replace />;
  }

  return <AdminDashboard />;
}

function UserProtectedRoute() {
  if (!isUserSignedIn()) {
    return <Navigate to="/auth" replace />;
  }

  return <UserProfile />;
}

export function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Marketplace />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/artisan/:id" element={<ArtisanProfile />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/auth" element={<UserAuth />} />
        <Route path="/profile" element={<UserProtectedRoute />} />
        <Route path="/admin" element={<AdminProtectedRoute />} />
        <Route path="/admin/auth" element={<AdminAuth />} />
      </Route>
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
