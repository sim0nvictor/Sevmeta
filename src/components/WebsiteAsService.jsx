
import emenike from "../assets/image/emenike.png";
import "./WebsiteAsService.css";

export default function WebsiteAsAService() {
  function handleSubmit(event) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const name = form.get("name")?.toString().trim() || "";
    const business = form.get("business")?.toString().trim() || "";
    const what = form.get("what")?.toString().trim() || "";
    const plan = form.get("plan")?.toString().trim() || "Starter";
    const notes = form.get("notes")?.toString().trim() || "";

    const message = [
      "Hi Sev, I'd like a free sample website.",
      `Name: ${name}`,
      `Business: ${business}`,
      `What we do: ${what}`,
      `Plan: ${plan}`,
      ...(notes ? [`Notes: ${notes}`] : []),
    ].join("\n");

    // Replace with your WhatsApp number, including country code.
    const whatsappNumber = "+22872959459".replace(/\D/g, "");

    if (!/^\d+$/.test(whatsappNumber)) {
      alert("Please configure your WhatsApp number first.");
      return;
    }

    const url =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div id="website-as-service" className="website-service">
      <nav className="service-nav">
        <div className="wrap">
          <a className="brand" href="#service-top">Sevmeta</a>

          <div className="navr">
            <a className="link" href="#plans">Plans</a>
            <a className="link" href="#how">How it works</a>
            <a className="btn sm" href="#brief">
              Send a brief
            </a>
          </div>
        </div>
      </nav>

      <main id="service-top">
        <header className="hero">
          <div className="wrap">
            <div>
              <span className="pill mono">
                <i /> Website as a service
              </span>

              <h1>A website that works as hard as you do.</h1>

              <p className="sub">
                Skip the stress of building and maintaining a site.
                I design it, host it and look after it for one simple
                price, so you can focus on running your business.
              </p>

              <div className="cta">
                <a className="btn" href="#plans">View plans</a>
                <a className="btn plain" href="#brief">Send a brief</a>
              </div>

              <p className="trust mono">
                Free sample before you pay / Any business, any size
              </p>
            </div>

            <div className="dash">
              <div className="dh">
                <span className="mono">Sample dashboard</span>
                <span className="mono live">
                  Live · yourbusiness.com
                </span>
              </div>

              <div className="metrics">
                {[
                  ["Speed score", "98", "/100"],
                  ["Load time", "0.9", "s"],
                  ["Uptime", "99.9", "%"],
                  ["Support reply", "<24", "hrs"],
                ].map(([label, value, unit]) => (
                  <div key={label}>
                    <span className="mono">{label}</span>
                    <strong>{value}</strong>
                    <small>{unit}</small>
                  </div>
                ))}
              </div>

              <div className="spark">
                <div className="top mono">
                  <span>Visitors</span>
                  <em>growing</em>
                </div>

                <svg
                  viewBox="0 0 400 80"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient
                      id="g"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0"
                        stopColor="#8a45d6"
                        stopOpacity=".28"
                      />
                      <stop
                        offset="1"
                        stopColor="#8a45d6"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>

                  <path
                    d="M0 66 L40 62 L80 50 L120 52 L160 40 L200 44 L240 30 L280 34 L320 22 L360 26 L400 14 L400 80 L0 80Z"
                    fill="url(#g)"
                  />

                  <path
                    d="M0 66 L40 62 L80 50 L120 52 L160 40 L200 44 L240 30 L280 34 L320 22 L360 26 L400 14"
                    fill="none"
                    stroke="#8a45d6"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              <div className="dfoot">
                <b>Secure · Backed up · Monitored</b>
              </div>

              <p className="note">
                Illustrative example of what your care plan covers.
              </p>
            </div>
          </div>
        </header>

        <hr className="rule" />

        <section>
          <div className="wrap">
            <div className="head">
              <span className="mono">What you get</span>
              <h2>Everything handled, nothing to worry about</h2>
              <p>
                One person, one price, one place to send a message
                when something needs changing.
              </p>
            </div>

            <div className="cards">
              {[
                {
                  title: "Fast by design",
                  description:
                    "Lightweight pages that load quickly on any phone, so visitors stay instead of leaving.",
                  icon: "⚡",
                },
                {
                  title: "Secure and backed up",
                  description:
                    "Hosting, SSL certificate and regular backups are included, so your site stays online and safe.",
                  icon: "✓",
                },
                {
                  title: "Looks right on every screen",
                  description:
                    "Designed for phones first, then tablets and desktops, with your branding and your words.",
                  icon: "▯",
                },
                {
                  title: "Easy to find",
                  description:
                    "Clean structure and basic search setup, so people who look for your kind of business can find you.",
                  icon: "⌕",
                },
                {
                  title: "Contact that converts",
                  description:
                    "Call, WhatsApp and message buttons placed where customers actually tap, so enquiries reach you.",
                  icon: "◌",
                },
                {
                  title: "Ongoing support",
                  description:
                    "Need a new photo, price or page? Send a message and I update it. No tickets, no waiting weeks.",
                  icon: "⚙",
                },
              ].map((item) => (
                <article className="card" key={item.title}>
                  <div className="ico" aria-hidden="true">
                    {item.icon}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <hr className="rule" />

        <section>
          <div className="wrap">
            <div className="head">
              <span className="mono">Who it's for</span>
              <h2>If you run a business, you need a website</h2>
              <p>
                Whether you are just starting or have been trading
                for years, I build the site around what you do.
              </p>
            </div>

            <div className="who">
              {[
                "Restaurants and cafes",
                "Garages and car services",
                "Clinics and dentists",
                "Salons and barbers",
                "Shops and boutiques",
                "Schools and tutors",
                "Consultants and freelancers",
                "Real estate agents",
                "Hotels and guesthouses",
                "Startups and creators",
                "Anything else you do",
              ].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <hr className="rule" />

        <section id="plans">
          <div className="wrap">
            <div className="head">
              <span className="mono">Plans</span>
              <h2>Simple prices, no surprises</h2>
              <p>
                Pay once to get built, then choose the care plan
                if you want me to keep it running.
              </p>
            </div>

            <div className="plans">
              {[
                {
                  title: "Starter",
                  description: "A clean one-page site to get you online.",
                  price: "$500",
                  period: "one time",
                  features: [
                    "One-page custom design",
                    "Your branding, photos and text",
                    "Contact and WhatsApp buttons",
                    "Mobile friendly",
                    "Domain connected",
                    "1 round of changes",
                  ],
                },
                {
                  title: "Business",
                  description: "A fuller site for growing businesses.",
                  price: "$750",
                  period: "one time",
                  hot: true,
                  features: [
                    "Everything in Starter",
                    "Up to 5 pages",
                    "Second language version",
                    "Google Business Profile setup",
                    "Basic search setup",
                    "2 rounds of changes",
                  ],
                },
                {
                  title: "Care plan",
                  description: "Add to any site so you never worry about it.",
                  price: "$20",
                  period: "per month",
                  features: [
                    "Hosting and SSL included",
                    "Regular backups",
                    "Updates to text, photos and prices",
                    "Fixes if anything breaks",
                    "Cancel any time",
                  ],
                },
              ].map((plan) => (
                <article
                  className={`plan${plan.hot ? " hot" : ""}`}
                  key={plan.title}
                >
                  <h3>{plan.title}</h3>
                  <p className="for">{plan.description}</p>

                  <div className="price">
                    {plan.price} <small>{plan.period}</small>
                  </div>

                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>

                  <a className="btn sm" href="#brief">
                    {plan.title === "Care plan"
                      ? "Add care plan"
                      : `Choose ${plan.title}`}
                  </a>
                </article>
              ))}
            </div>

            <p className="fine">
              Need an online store, booking or something custom?
              Send a brief and I'll quote it.
            </p>
          </div>
        </section>

        <hr className="rule" />

        <section id="how">
          <div className="wrap">
            <div className="head">
              <span className="mono">How it works</span>
              <h2>You see it before you pay for it</h2>
            </div>

            <ol className="steps">
              {[
                [
                  "Send a brief",
                  "Tell me about your business and what you want your site to do.",
                ],
                [
                  "Get a free sample",
                  "I build a preview using your name and details so you can judge the result.",
                ],
                [
                  "Approve and start",
                  "Pay 50% to begin. I finish the site, usually within a few days.",
                ],
                [
                  "Go live",
                  "You approve, pay the rest, and your site launches on your own domain.",
                ],
              ].map(([title, description]) => (
                <li key={title}>
                  <b>{title}</b>
                  <span>{description}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <hr className="rule" />

        <section>
          <div className="wrap">
            <div className="about">
              <div className="photo">
                <img src={emenike} alt="Sev, web developer" />
              </div>
              <div>
                <h2>Hi, I'm Sev</h2>
                <p>
                  I'm a web developer who builds and launches my own
                  products, including Kelucalls, a live platform that
                  ranks Telegram signal channels by their real results.
                </p>
                <p>
                  I work remotely with clients around the world and
                  keep communication simple on WhatsApp and email.
                </p>
                <a href="/">See my full portfolio</a>
              </div>
            </div>
          </div>
        </section>

        <hr className="rule" />

        <section id="brief">
          <div className="wrap">
            <div className="head">
              <span className="mono">Send a brief</span>
              <h2>Tell me about your business</h2>
              <p>
                Fill this in and it opens a WhatsApp message to me.
                I'll reply with a free sample.
              </p>
            </div>

            <form className="form" onSubmit={handleSubmit}>
              <div className="two">
                <label>
                  Your name
                  <input name="name" required autoComplete="name" />
                </label>

                <label>
                  Business name
                  <input name="business" required />
                </label>
              </div>

              <div className="two">
                <label>
                  What do you do?
                  <input
                    name="what"
                    placeholder="e.g. restaurant, clinic, garage"
                    required
                  />
                </label>

                <label>
                  Plan
                  <select name="plan" defaultValue="Starter">
                    <option>Starter</option>
                    <option>Business</option>
                    <option>Not sure yet</option>
                  </select>
                </label>
              </div>

              <label>
                Anything I should know?
                <textarea
                  name="notes"
                  placeholder="Your city, existing links, colours you like, deadline"
                />
              </label>

              <button className="btn" type="submit">
                Send on WhatsApp
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <span>© Sevmeta</span>
          <span>Website as a service</span>
        </div>
      </footer>
    </div>
  );
}
