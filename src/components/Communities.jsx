import StarField from "./StarField";
import Doginaldogs from "../assets/image/Doginaldogs.png";
import BMA from "../assets/image/BMA.png";
import Typemedia from "../assets/image/Typemedia.png";
import sevmedia from "../assets/image/sevmedia.png";
import { useI18n } from "../lib/i18n-context";

function CommunitiesCard({ title, img, href, description, buttonLabel, buttonHref }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white/5 p-6 backdrop-blur transition hover:bg-white/10">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <img src={img} alt={title} className="mx-auto mb-4 block h-20 w-20 rounded-xl object-cover" />
        <h3 className="text-xl font-semibold text-white text-center">{title}</h3>
      </a>

      <p className="mt-3 text-sm text-gray-300">{description}</p>

      <a href={buttonHref} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block rounded-full bg-purple-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-purple-700">{buttonLabel}</a>
    </div>
  );
}

export default function Communities() {
  const { t } = useI18n();
  const descriptions = t("communities.descriptions");

  return (
    <section id="communities" className="relative py-24">
      <StarField />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.25),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
          {t("communities.title").split(" ")[0]} <span className="text-purple-500">{t("communities.title").split(" ").slice(1).join(" ")}</span>
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-300">{t("communities.description")}</p>
      </div>

      <div className="relative mt-10 flex justify-center items-center gap-6">
        {[sevmedia, BMA, Typemedia, Doginaldogs].map((logo, i) => (
          <div key={i} className="flex items-center justify-center hover:scale-110 transition-transform duration-300">
            <img src={logo} alt="Community logo" className="mx-auto h-12 w-12 rounded-lg object-cover" />
          </div>
        ))}
      </div>

      <div className="relative mx-auto mt-16 max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <CommunitiesCard title="Sevmedia" img={sevmedia} href="https://www.sevmedia.com/" description={descriptions[0]} buttonLabel="@sevmedia" buttonHref="https://x.com/i/communities/2016109529386160574" />
          <CommunitiesCard title="BMA" img={BMA} href="https://barkmediaafrica.com/" description={descriptions[1]} buttonLabel="@BarkMediaAfrica" buttonHref="https://x.com/BarkMediaAfrica?s=20" />
          <CommunitiesCard title="Doginal Dogs" img={Doginaldogs} href="https://doginaldogs.com/" description={descriptions[2]} buttonLabel="@doginaldogs" buttonHref="https://x.com/doginaldogs?s=20" />
          <CommunitiesCard title="Type Media" img={Typemedia} href="https://www.typebrand.net/" description={descriptions[3]} buttonLabel="@Typemedia" buttonHref="https://x.com/typemedia?s=20" />
        </div>
      </div>
    </section>
  );
}
