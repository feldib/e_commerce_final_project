const getStoredLocale = <T extends string>(): T | null => {
  if (typeof window === "undefined") return null;

  const storedLocale = localStorage.getItem("userLocale");
  return storedLocale && ["en", "he", "hu"].includes(storedLocale)
    ? (storedLocale as T)
    : null;
};

const setStoredLocale = <T extends string>(locale: T) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("userLocale", locale);
  }
};

export { getStoredLocale, setStoredLocale };
