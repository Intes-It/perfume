
import en from "../locales/en.json";
import vi from "../locales/vi.json";
import { useRouter } from "next/router";
const useLocale = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : vi;
  return t;
};

export default useLocale;
