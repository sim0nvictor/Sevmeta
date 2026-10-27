import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://sevmeta.xyz";
const DEFAULT_DESCRIPTION =
  "Sevmeta is the portfolio and product studio of SEV (Simon Emenike), building Web3 products, AI systems, and growth infrastructure.";

const pages = {
  "/": {
    title: "Sevmeta | Portfolio of SEV — Web3, AI & Growth Products",
    description: DEFAULT_DESCRIPTION,
  },
  "/blog": {
    title: "Articles & Updates | Sevmeta",
    description:
      "Read product updates, Web3 strategy, tutorials, and portfolio stories from SEV.",
  },
  "/website-as-service": {
    title: "Website as a Service | Sevmeta",
    description:
      "Get a professionally designed, hosted, and maintained website for your business with Sevmeta's website-as-a-service plans.",
  },
  "/sevlab": {
    title: "SEV Lab | Sevmeta",
    description:
      "Explore SEV Lab, a Sevmeta product platform for crypto projects, builders, and growth operators.",
  },
  "/contact": {
    title: "Contact | Sevmeta",
    description: "Get in touch with SEV about Sevmeta projects, services, and collaborations.",
  },
};

function setMetaTag(attribute, name, content) {
  let element = document.head.querySelector(`meta[${attribute}="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

export default function Seo({ title, description } = {}) {
  const { pathname } = useLocation();

  useEffect(() => {
    const normalizedPath =
      pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
    const isPrivatePage =
      normalizedPath === "/profile" || normalizedPath === "/create-post";
    const page =
      pages[normalizedPath] ||
      (normalizedPath.startsWith("/blog/")
        ? {
            title: "Articles by SEV | Sevmeta",
            description:
              "Read product updates, Web3 strategy, tutorials, and portfolio stories from SEV.",
          }
        : {
            title: "Sevmeta | Portfolio of SEV — Web3, AI & Growth Products",
            description: DEFAULT_DESCRIPTION,
          });
    const pageTitle = title || page.title;
    const pageDescription = description || page.description;
    const canonicalUrl = `${SITE_URL}${normalizedPath}`;

    document.title = pageTitle;
    setMetaTag("name", "description", pageDescription);
    setMetaTag("name", "robots", isPrivatePage ? "noindex, nofollow" : "index, follow");
    setMetaTag("property", "og:title", pageTitle);
    setMetaTag("property", "og:description", pageDescription);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("name", "twitter:title", pageTitle);
    setMetaTag("name", "twitter:description", pageDescription);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [pathname, title, description]);

  return null;
}
