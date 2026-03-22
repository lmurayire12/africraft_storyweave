type AdminAccount = {
  name: string;
  email: string;
  password: string;
};

const ADMIN_ACCOUNTS_KEY = "africraft_admin_accounts";
const ADMIN_SESSION_KEY = "africraft_admin_session";

function getStorage() {
  return window.localStorage;
}

function getDefaultAdmin(): AdminAccount {
  return {
    name: "System Admin",
    email: "admin@123.com",
    password: "12345678",
  };
}

export function getAdminAccounts(): AdminAccount[] {
  const raw = getStorage().getItem(ADMIN_ACCOUNTS_KEY);
  if (!raw) {
    const defaultAdmin = getDefaultAdmin();
    getStorage().setItem(ADMIN_ACCOUNTS_KEY, JSON.stringify([defaultAdmin]));
    return [defaultAdmin];
  }

  try {
    const parsed = JSON.parse(raw) as AdminAccount[];
    const accounts = Array.isArray(parsed) ? parsed : [];
    const defaultAdminExists = accounts.some((acc) => acc.email.toLowerCase() === "admin@123.com");

    if (defaultAdminExists) {
      return accounts;
    }

    const nextAccounts = [...accounts, getDefaultAdmin()];
    getStorage().setItem(ADMIN_ACCOUNTS_KEY, JSON.stringify(nextAccounts));
    return nextAccounts;
  } catch {
    const defaultAdmin = getDefaultAdmin();
    getStorage().setItem(ADMIN_ACCOUNTS_KEY, JSON.stringify([defaultAdmin]));
    return [defaultAdmin];
  }
}

export function createAdminAccount(account: AdminAccount) {
  const existing = getAdminAccounts();
  const emailExists = existing.some((item) => item.email.toLowerCase() === account.email.toLowerCase());

  if (emailExists) {
    return { ok: false as const, message: "An account with this email already exists." };
  }

  getStorage().setItem(ADMIN_ACCOUNTS_KEY, JSON.stringify([...existing, account]));
  return { ok: true as const };
}

export function signInAdmin(email: string, password: string) {
  const account = getAdminAccounts().find(
    (item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password
  );

  if (!account) {
    return { ok: false as const, message: "Invalid email or password." };
  }

  getStorage().setItem(ADMIN_SESSION_KEY, account.email);
  return { ok: true as const, account };
}

export function signOutAdmin() {
  getStorage().removeItem(ADMIN_SESSION_KEY);
  window.sessionStorage.removeItem("africraft_language");
}

export function getCurrentAdmin() {
  const currentEmail = getStorage().getItem(ADMIN_SESSION_KEY);
  if (!currentEmail) {
    return null;
  }

  return getAdminAccounts().find((item) => item.email.toLowerCase() === currentEmail.toLowerCase()) ?? null;
}

export function isAdminSignedIn() {
  return Boolean(getCurrentAdmin());
}
