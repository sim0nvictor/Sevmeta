import { Code2, Brain, TrendingUp, Layers, Megaphone, Wrench } from "lucide-react";
import StarField from "./StarField";
import sevmetax from "../assets/image/sevmetax.png";
import { useI18n } from "../lib/i18n-context";

export default function Skills() {
  const { t } = useI18n();

  return (
    <section id="skills" className="relative py-24">
      <StarField />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.25),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
          {t("skills.title").split(" ")[0]} <span className="text-purple-500">{t("skills.title").split(" ").slice(1).join(" ") || "Skills"}</span>
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-300">
          {t("skills.description")}
          <br />
          <br />
          <span className="text-pink-400">{t("skills.quote")}</span>
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <SkillsCard icon={<Code2 className="h-6 w-6 text-purple-400" />} title={t("skills.building")} tags={t("skills.tags").slice(0, 4)} />
          <SkillsCard icon={<TrendingUp className="h-6 w-6 text-green-400" />} title={t("skills.growth")} tags={t("skills.tags").slice(4, 8)} />
          <SkillsCard icon={<Layers className="h-6 w-6 text-pink-400" />} title={t("skills.scale")} tags={t("skills.tags").slice(8, 12)} />

          <SkillsCard
            icon={<Megaphone className="h-6 w-6 text-blue-400" />}
            title={t("skills.brand")}
            image={sevmetax}
            buttonList={[
              { label: "@sevmetaX", href: "https://x.com/sevmetaX?s=20" },
              { label: "@sevmeta", href: "https://instagram.com/sevmeta" },
            ]}
            text={t("skills.brandDescription")}
          />

          <SkillsCard
            icon={<Wrench className="h-6 w-6 text-purple-400" />}
            title={t("skills.capabilities")}
            text={t("skills.capabilitiesDescription")}
          />
        </div>
      </div>
    </section>
  );
}

function SkillsCard({ icon, title, buttonLabel, buttonHref, buttonList = [], tags = [], image, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-left backdrop-blur transition hover:border-purple-500/40 hover:bg-white/10">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">{icon}</div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>

      <div className="mt-4 flex flex-wrap gap-3">
        {tags.map((tag, index) => (
          <span key={index} className="rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1 text-sm text-purple-300 transition hover:bg-purple-500/20 hover:text-purple-200">{tag}</span>
        ))}
      </div>

      {image && (
        <div className="mb-6 overflow-hidden rounded-xl flex justify-center">
          <img src={image} alt={title} className="h-10 w-10 object-cover transition-transform duration-300 hover:scale-105 rounded-full object-cover" />
        </div>
      )}

      {(buttonList.length > 0 || buttonLabel) && (
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {buttonList.length > 0
            ? buttonList.map((button, index) => (
                <a key={index} href={button.href} className="inline-flex w-fit items-center justify-center rounded-lg border border-yellow-500/40 bg-yellow-500/10 px-4 py-2 text-sm font-medium text-yellow-300 transition hover:bg-yellow-500/20 hover:text-yellow-200">{button.label}</a>
              ))
            : buttonLabel && (
                <a href={buttonHref} className="inline-flex w-fit items-center justify-center rounded-lg border border-yellow-500/40 bg-yellow-500/10 px-4 py-2 text-sm font-medium text-yellow-300 transition hover:bg-yellow-500/20 hover:text-yellow-200">{buttonLabel}</a>
              )}
        </div>
      )}

      {text && <p className="mt-4 text-gray-300 text-sm">{text}</p>}
    </div>
  );
}
