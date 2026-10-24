import { Code2, Brain, Rocket } from "lucide-react";
import StarField from "./StarField";
import simon from "../assets/image/simon.png";
import { useI18n } from "../lib/i18n-context";

export default function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="relative py-24">
      <StarField />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.25),transparent_60%)]"/>

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl text-center">
          {t("about.title")} <span className="text-purple-500">Sevmeta</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-purple-200 md:text-base">
          {t("about.description")}
        </p>

        <div className="mx-auto mt-10 max-w-5xl flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-full md:w-1/2 rounded-3xl overflow-hidden border-4 border-purple-500/30 shadow-lg shadow-purple-500/20 transition-transform duration-300 hover:scale-105">
            <img src={simon} alt="simon" className="w-full h-auto object-contain bg-black/5" />
            <a
              href="https://x.com/sevmeta?s=20"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent font-semibold hover:bg-pink-400"
            >
              {t("about.follow")}
            </a>
          </div>

          <div className="w-full md:w-1/2">
            <p className="mx-auto max-w-xl text-lg text-gray-300 leading-relaxed md:mx-0 text-left">
              {t("about.intro")} <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent font-semibold">SEV</span>.
              {t("about.builds")}

              <span>
                <br />
                <br />
                {t("about.story")}
                <br />
                <br />
                {t("about.focus")}
                <br />
                <br />
                {t("about.degree")}
                <br />
                <br />
                <div className="text-lg font-semibold">{t("about.building")}</div>
                <br />
                <div className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent font-semibold"><a href="https://kelucalls.com" target="_blank" rel="noopener noreferrer">{t("about.web3")}</a></div>
                <br />
                <div className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent font-semibold"><a href="https://sevmeta.xyz/sevlab" target="_blank" rel="noopener noreferrer">{t("about.ai")}</a></div>
                <br />
                <div className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent font-semibold"><a href="https://sevmeta.xyz/sevlab" target="_blank" rel="noopener noreferrer">{t("about.growth")}</a></div>
                <br />
                <div className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent font-semibold"><a href="https://sevlabx.xyz" target="_blank" rel="noopener noreferrer">{t("about.community")}</a></div>
                <br />
                <br />
                <span className="bg-gradient-to-r from-pink-400 to-indigo-500 bg-clip-text text-transparent font-semibold">{t("about.closing")}</span>
              </span>
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <AboutCard icon={<Code2 className="h-6 w-6 text-purple-400" />} title={t("about.cardEngineer")} description={t("about.cardEngineerDescription")} delay="0" />
          <AboutCard icon={<Brain className="h-6 w-6 text-green-400" />} title={t("about.cardAi")} description={t("about.cardAiDescription")} delay="200" />
          <AboutCard icon={<Rocket className="h-6 w-6 text-purple-400" />} title={t("about.cardWeb3")} description={t("about.cardWeb3Description")} delay="400" />
        </div>

        <div className="mt-10"></div>
        <div className="col-span-full rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur transition-all duration-500 hover:border-purple-500/40 hover:bg-white/10 hover:shadow-xl hover:shadow-purple-500/20 animate-fade-in-up" style={{ animationDelay: '600ms', animationFillMode: 'both' }}>
          <p className="text-gray-300 leading-relaxed">
            {t("about.personal")} {" "}
            <a href="https://x.com/sevmetaX?s=20" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 text-primary font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current transition group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]">
                <path d="M18.901 1.153h3.68l-8.04 9.19 9.46 12.504h-7.41l-5.8-7.584-6.64 7.584H.47l8.6-9.83L0 1.153h7.6l5.24 6.932z"/>
              </svg>
            </a>{" "}
            {t("about.personalEnd")}
          </p>
        </div>
      </div>
    </section>
  );
}

function AboutCard({ icon, title, description, delay }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-left backdrop-blur transition-all duration-500 hover:border-purple-500/40 hover:bg-white/10 hover:scale-95 hover:shadow-2xl hover:shadow-purple-500/30 hover:brightness-110 animate-fade-in-up" style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}>
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 transition-transform duration-300 hover:scale-110 hover:rotate-12">{icon}</div>
      <h3 className="text-xl font-semibold text-white transition-colors duration-300 hover:text-purple-400">{title}</h3>
      <p className="mt-3 text-gray-400 transition-colors duration-300 hover:text-gray-300">{description}</p>
    </div>
  );
}