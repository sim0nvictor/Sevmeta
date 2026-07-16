import StarField from "./StarField";
import Doginaldogs from "../assets/image/Doginaldogs.png";
import BMA from "../assets/image/BMA.png";
import Typemedia from "../assets/image/Typemedia.png";
import sevmedia from "../assets/image/sevmedia.png";

/* Reusable Card Component */
function CommunitiesCard({
  title,
  img,
  href,
  description,
  buttonLabel,
  buttonHref,
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white/5 p-6 backdrop-blur transition hover:bg-white/10">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <img
          src={img}
          alt={title}
          className="mx-auto mb-4 block h-20 w-20 rounded-xl object-cover"
        />
        <h3 className="text-xl font-semibold text-white text-center">{title}</h3>
      </a>

      <p className="mt-3 text-sm text-gray-300">{description}</p>

      <a
        href={buttonHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block rounded-full bg-purple-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-purple-700"
      >
        {buttonLabel}
      </a>
    </div>
  );
}

export default function Communities() {
  return (
    <section id="communities" className="relative py-24">
      {/* Background */}
      <StarField />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.25),transparent_60%)]" />

      {/* Header */}
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
          Sevmeta <span className="text-purple-500">Communities</span>
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-300">
          Communities and collaborators that power Sevmeta’s Web3, growth, and creator work.
        </p>
      </div>

      {/* Logos */}
      <div className="relative mt-10 flex justify-center items-center gap-6">
        {[Doginaldogs, BMA, Typemedia, sevmedia].map((logo, i) => (
          <div
            key={i}
            className="flex items-center justify-center hover:scale-110 transition-transform duration-300"
          >
            <img
              src={logo}
              alt="Community logo"
              className="mx-auto h-12 w-12 rounded-lg object-cover"
            />
          </div>
        ))}
      </div>

      {/* Cards */}
      <div className="relative mx-auto mt-16 max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <CommunitiesCard
            title="Doginal Dogs"
            img={Doginaldogs}
            href="https://doginaldogs.com/"
            description="A Web3 community for founders and creators, helping drive engagement and distribution for Sevmeta projects."
            buttonLabel="@doginaldogs"
            buttonHref="https://x.com/doginaldogs?s=20"
          />

          <CommunitiesCard
            title="BMA"
            img={BMA}
            href="https://barkmediaafrica.com/"
            description="A community network supporting African builders, creators, and Web3 growth projects aligned with Sevmeta’s mission."
            buttonLabel="@BarkMediaAfrica"
            buttonHref="https://x.com/BarkMediaAfrica?s=20"
          />

          <CommunitiesCard
            title="Type Media"
            img={Typemedia}
            href="https://www.typebrand.net/"
            description="A creative network for brand, community, and product storytelling that supports Sevmeta’s creative growth work."
            buttonLabel="@Typemedia"
            buttonHref="https://x.com/typemedia?s=20"
          />

          <CommunitiesCard
            title="Sevmedia"
            img={sevmedia}
            href="https://www.sevmedia.com/"
            description="The creative and growth hub for Sevmeta, focusing on personal brand, product launches, and audience development."
            buttonLabel="@sevmedia"
            buttonHref="https://x.com/i/communities/2016109529386160574"
          />
        </div>
      </div>
    </section>
  );
}

