import { useI18n } from "../lib/i18n-context";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-[#0B0E14] py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-8 text-center">
        <p className="text-gray-200">
          {t("footer.built")} © 2026 | {t("footer.portfolio")} | <a href="https://x.com/sevmetaX" target="_blank" rel="noopener noreferrer" aria-label="Visit Sevmeta X profile" className="text-violet-300 hover:text-white">@sevmetaX</a> | <a href="https://kelucalls.com" target="_blank" rel="noopener noreferrer" aria-label="Visit Kelucalls website" className="text-violet-300 hover:text-white">kelucalls.com</a>
        </p>
      </div>
    </footer>
  );
}
