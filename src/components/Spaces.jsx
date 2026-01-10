import BmaSpaces from "../assets/image/BmaSpaces.png";
import TypeSpaces from "../assets/image/TypeSpaces.png";
import CsnSpaces from "../assets/image/CsnSpaces.png";

export default function Spaces() {
  return (
    <section id="spaces" className="relative py-24">
      {/* Header */}
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <h2 className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
          Join Live Spaces on Twitter
        </h2>
      </div>

      {/* Cards */}
      <div className="mt-16 space-y-10 px-6">
        <SpacesCard
          title="Crypto Spaces Network"
          description="Take your project to the next level with top Twitter Spaces hosts in Web3."
          image={CsnSpaces}
          buttonLabel="@CryptoSpacesNet"
          buttonHref="https://x.com/CryptoSpacesNet?s=20"
          href="https://cryptospaces.net/"
        />

        <SpacesCard
          title="Type Media Spaces"
          description="Engaging discussions on Web3, tech, AI, spirituality, and more with Type Media."
          image={TypeSpaces}
          buttonLabel="@Typemedia"
          buttonHref="https://x.com/typemedia/status/1999731536610861524?s=20"
        />

        <SpacesCard
          title="BMA Spaces"
          description="Diverse community discussions and podcasts featuring Africa’s top creators."
          image={BmaSpaces}
          buttonLabel="@BarkMediaAfrica"
          buttonHref="https://x.com/BarkMediaAfrica/status/1994478802672783381?s=20"
        />
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* Spaces Card */
/* ---------------------------------- */
function SpacesCard({
  title,
  description,
  image,
  buttonLabel,
  buttonHref,
  href,
}) {
  return (
    <div className="mx-auto max-w-4xl rounded-xl border border-yellow-400/20 bg-zinc-900/80 p-6 shadow-lg transition-shadow duration-500 hover:shadow-yellow-400/30">
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Image */}
        <div className="flex justify-center md:w-1/3">
          <img
            src={image}
            alt={title}
            className="
            h-auto w-full 
            rounded-lg 
            object-cover
            transition-transform duration-500 ease-out
            hover:scale-125
            cursor-zoom-in"
          />
        </div>

        {/* Content */}
        <div className="md:w-2/3">
          <h3 className="text-xl font-bold text-yellow-400">
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {title}
              </a>
            ) : (
              title
            )}
          </h3>

          <p className="mt-2 text-gray-300">{description}</p>
        </div>
      </div>

      {/* Button */}
      <div className="mt-6 flex justify-center">
        <a
          href={buttonHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-yellow-400 px-5 py-2 font-bold text-black transition hover:bg-yellow-500"
        >
          {buttonLabel}
        </a>
      </div>
    </div>
  );
}
