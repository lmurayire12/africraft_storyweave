type UserAccount = {
  name: string;
  email: string;
  password: string;
  phone: string;
  preferredAuthMethod: "email" | "phone";
};

const USER_ACCOUNTS_KEY = "africraft_user_accounts";
const USER_SESSION_KEY = "africraft_user_session";

function getStorage() {
  return window.localStorage;
}

export function getUserAccounts(): UserAccount[] {
  const raw = getStorage().getItem(USER_ACCOUNTS_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as UserAccount[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function createUserAccount(account: UserAccount) {
  const existing = getUserAccounts();
  const emailExists = existing.some((item) => item.email.toLowerCase() === account.email.toLowerCase());

  if (emailExists) {
    return { ok: false as const, message: "An account with this email already exists." };
  }

  getStorage().setItem(USER_ACCOUNTS_KEY, JSON.stringify([...existing, account]));
  return { ok: true as const };
}

export function signInUser(email: string, password: string) {
  const account = getUserAccounts().find(
    (item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password
  );

  if (!account) {
    return { ok: false as const, message: "Invalid email or password." };
  }

  getStorage().setItem(USER_SESSION_KEY, account.email);
  return { ok: true as const, account };
}

export function signOutUser() {
  getStorage().removeItem(USER_SESSION_KEY);
  window.sessionStorage.removeItem("africraft_language");
}

export function getCurrentUser() {
  const currentEmail = getStorage().getItem(USER_SESSION_KEY);
  if (!currentEmail) {
    return null;
  }

  return getUserAccounts().find((item) => item.email.toLowerCase() === currentEmail.toLowerCase()) ?? null;
}

export function isUserSignedIn() {
  return Boolean(getCurrentUser());
}
