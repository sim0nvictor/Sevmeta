import { useI18n } from "../lib/i18n-context";

export default function Spaces() {
  const { t } = useI18n();

  return (
    <section id="spaces" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="mb-4 inline-block rounded-full border border-purple-400/20 bg-purple-500/10 px-4 py-2 text-sm font-semibold text-purple-300">
            {t("spaces.stayTuned")}
          </span>

          <h2 className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            {t("spaces.title")}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">{t("spaces.description")}</p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-purple-400/20 bg-zinc-900/80 px-6 py-16 text-center shadow-lg shadow-purple-950/20 md:px-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400" aria-hidden="true">
              <rect x="3" y="4" width="18" height="17" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
              <path d="m9 16 2 2 4-4" />
            </svg>
          </div>

          <h3 className="text-2xl font-bold text-white md:text-3xl">{t("spaces.coming")}</h3>
          <p className="mx-auto mt-4 max-w-lg leading-7 text-gray-400">{t("spaces.empty")}</p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-gray-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-purple-400" />
            {t("spaces.announced")}
          </div>
        </div>
      </div>
    </section>
  );
}
