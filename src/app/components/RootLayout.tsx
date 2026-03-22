import { Outlet, Link, useNavigate } from "react-router-dom";
import { ShoppingBag, User, LayoutDashboard, Globe } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { Language, languageNames } from "../i18n/translations";
import { useState, useRef, useEffect } from "react";
import { isUserSignedIn, getCurrentUser, signOutUser } from "../auth/userAuth";

export function RootLayout() {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const user = isUserSignedIn() ? getCurrentUser() : null;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSignOut() {
    signOutUser();
    setShowUserMenu(false);
    navigate("/");
  }

  const languageFlags: Record<Language, string> = {
    en: "EN",
    rw: "RW",
    fr: "FR",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900">{t("africraft")}</div>
              <div className="text-xs text-slate-600">{t("storyweave")}</div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center gap-2 rounded-lg p-2 transition-colors hover:bg-slate-100"
              >
                <span className="text-xs font-semibold text-slate-700">{languageFlags[language]}</span>
                <Globe className="h-4 w-4 text-slate-600" />
              </button>

              {showLanguageMenu && (
                <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                  {(Object.keys(languageNames) as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setShowLanguageMenu(false);
                      }}
                      className={`flex w-full items-center gap-3 px-4 py-2 text-left transition-colors hover:bg-slate-50 ${
                        language === lang ? "bg-amber-50 text-amber-900" : "text-slate-700"
                      }`}
                    >
                      <span className="text-xs font-semibold">{languageFlags[lang]}</span>
                      <span>{languageNames[lang]}</span>
                      {language === lang && <span className="ml-auto text-amber-600">OK</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="rounded-lg p-2 transition-colors hover:bg-slate-100"
                >
                  <User className="h-5 w-5 text-slate-600" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                    <div className="border-b border-slate-100 px-4 py-2">
                      <div className="text-sm font-semibold text-slate-900">{user.name}</div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="block px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full px-4 py-2 text-left text-sm text-rose-600 transition-colors hover:bg-rose-50"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate("/auth")}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
                >
                  Sign in
                </button>
                <button
                  onClick={() => navigate("/auth")}
                  className="rounded-lg bg-amber-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-700"
                >
                  Create account
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="mt-20 bg-slate-900 text-slate-300">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
                  <ShoppingBag className="h-5 w-5 text-white" />
                </div>
                <div className="font-bold text-white">{t("africraft")} {t("storyweave")}</div>
              </div>
              <p className="text-sm text-slate-400">{t("connectingArtisans")}</p>
            </div>
            <div>
              <h3 className="mb-3 font-semibold text-white">{t("forBuyers")}</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-amber-400">{t("browseProducts")}</Link></li>
                <li><a href="#" className="hover:text-amber-400">{t("howItWorks")}</a></li>
                <li><a href="#" className="hover:text-amber-400">{t("shippingReturns")}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-semibold text-white">{t("forArtisans")}</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-amber-400">{t("becomeSeller")}</a></li>
                <li><a href="#" className="hover:text-amber-400">{t("verificationProcess")}</a></li>
                <li><a href="#" className="hover:text-amber-400">{t("paymentMethods")}</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            {t("copyright")}
          </div>
        </div>
      </footer>
    </div>
  );
}
