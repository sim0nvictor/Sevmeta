import StarField from "./StarField";
import Doginaldogs from "../assets/image/Doginaldogs.png";
import BMA from "../assets/image/BMA.png";
import Typemedia from "../assets/image/Typemedia.png";

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
          className="mb-4 h-20 w-20 rounded-xl object-cover"
        />
        <h3 className="text-xl font-semibold text-white">{title}</h3>
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
          The Best <span className="text-purple-500">Communities</span>
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-300">
          Join the best Web3 communities building the future together.
        </p>
      </div>

      {/* Logos */}
      <div className="relative mt-10 flex justify-center gap-6">
        {[Doginaldogs, BMA, Typemedia].map((logo, i) => (
          <div
            key={i}
            className="hover:scale-110 transition-transform duration-300"
          >
            <img
              src={logo}
              alt="Community logo"
              className="h-12 w-12 rounded-lg object-cover"
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
            description="A collection of 10,000 pixel art digitally inscribed on the Dogecoin blockchain."
            buttonLabel="@doginaldogs"
            buttonHref="https://x.com/doginaldogs?s=20"
          />

          <CommunitiesCard
            title="BMA"
            img={BMA}
            href="https://barkmediaafrica.com/"
            description="A Doginal Dogs sub-community focused on building and supporting Africa’s Web3 ecosystem."
            buttonLabel="@BarkMediaAfrica"
            buttonHref="https://x.com/BarkMediaAfrica?s=20"
          />

          <CommunitiesCard
            title="Type Media"
            img={Typemedia}
            href="https://www.typebrand.xyz/"
            description="A Doginal Dogs sub-community, DAO, and marketing brand with top Web3 creators."
            buttonLabel="@Typemedia"
            buttonHref="https://x.com/typemedia?s=20"
          />
        </div>
      </div>
    </section>
  );
}
