import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Loading } from "./app/components/ui/loading";
import { isAdminSignedIn } from "./app/auth/adminAuth";
import { isUserSignedIn } from "./app/auth/userAuth";

// Lazy load components
const RootLayout = lazy(() => import("./app/components/RootLayout").then(module => ({ default: module.RootLayout })));
const Marketplace = lazy(() => import("./app/components/Marketplace").then(module => ({ default: module.Marketplace })));
const ProductDetail = lazy(() => import("./app/components/ProductDetail").then(module => ({ default: module.ProductDetail })));
const ArtisanProfile = lazy(() => import("./app/components/ArtisanProfile").then(module => ({ default: module.ArtisanProfile })));
const Checkout = lazy(() => import("./app/components/Checkout").then(module => ({ default: module.Checkout })));
const AdminDashboard = lazy(() => import("./app/components/AdminDashboard").then(module => ({ default: module.AdminDashboard })));
const NotFound = lazy(() => import("./app/components/NotFound").then(module => ({ default: module.NotFound })));
const AdminAuth = lazy(() => import("./app/components/AdminAuth").then(module => ({ default: module.AdminAuth })));
const UserAuth = lazy(() => import("./app/components/UserAuth").then(module => ({ default: module.UserAuth })));
const UserProfile = lazy(() => import("./app/components/UserProfile").then(module => ({ default: module.UserProfile })));

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
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Marketplace />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="artisan/:id" element={<ArtisanProfile />} />
          <Route path="checkout/:id" element={<Checkout />} />
          <Route path="auth" element={<UserAuth />} />
          <Route path="profile" element={<UserProtectedRoute />} />
          <Route path="admin" element={<AdminProtectedRoute />} />
          <Route path="admin/auth" element={<AdminAuth />} />
        </Route>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
