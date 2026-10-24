import { useForm, ValidationError } from "@formspree/react";
import {
  XIcon,
  InstagramIcon,
  YouTubeIcon,
  LinkedInIcon,
  GitHubIcon,
} from "../assets/icons.jsx";
import { useI18n } from "../lib/i18n-context";

export default function Contact() {
  const { t } = useI18n();

  return (
    <section id="contacts" className="relative py-24 bg-black">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold text-white md:text-5xl">{t("contact.title")}</h2>
          <p className="mt-3 text-gray-400">{t("contact.description")}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <ContactsConnect />
          <ContactsForm />
        </div>
      </div>
    </section>
  );
}

function ContactsConnect() {
  const { t } = useI18n();

  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900/80 p-6 shadow-lg">
      <h3 className="mb-2 text-xl font-semibold text-purple-400">{t("contact.connect")}</h3>
      <p className="mb-6 text-gray-400">{t("contact.project")}</p>

      <a
        href="https://wa.me/22872959459"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${t("contact.whatsapp")}: +228 72 95 94 59`}
        className="group mb-6 flex items-center gap-4 rounded-lg bg-zinc-800 p-4 transition hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
      >
        <span className="text-xl text-green-400">📱</span>
        <div>
          <p className="font-medium text-white">{t("contact.whatsapp")}</p>
          <p className="text-sm text-gray-400">+228 72 95 94 59</p>
        </div>
      </a>

      <div>
        <h3 className="mb-3 font-medium text-white">{t("contact.follow")}</h3>

        <div className="space-y-3">
          <SocialItem label="X (Twitter)" sub={t("contact.x")} icon={<XIcon className="h-5 w-5" />} href="https://x.com/sevmetaX?s=20" />
          <SocialItem label="Instagram" sub={t("contact.instagram")} icon={<InstagramIcon className="h-5 w-5 text-pink-500" />} href="https://www.instagram.com/sevmeta/" />
          <SocialItem label="YouTube" sub={t("contact.youtube")} icon={<YouTubeIcon className="h-5 w-5 text-red-500" />} href="https://www.youtube.com/@Sevmediax" />
          <SocialItem label="LinkedIn" sub={t("contact.linkedin")} icon={<LinkedInIcon className="h-5 w-5" />} href="https://linkedin.com/in/your-profile" />
          <SocialItem label="GitHub" sub={t("contact.github")} icon={<GitHubIcon className="h-5 w-5" />} href="https://github.com/sim0nvictor" />
        </div>
      </div>
    </div>
  );
}

function ContactsForm() {
  const { t } = useI18n();
  const [state, handleSubmit] = useForm("xlgraoqe");

  if (state.succeeded) {
    return (
      <div className="rounded-xl border border-white/10 bg-zinc-900/80 p-6 text-center shadow-lg">
        <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent font-semibold">{t("contact.sent")}</span>
        <p className="mt-2 text-gray-400">{t("contact.thanks")}</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900/80 p-6 shadow-lg">
      <h3 className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent font-semibold text-xl mb-4">{t("contact.sendTitle")}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" required placeholder={t("contact.name")} className="w-full rounded-md border border-white/10 bg-zinc-800 px-4 py-3 text-white focus:border-yellow-400 focus:outline-none" />
        <input type="email" name="email" required placeholder={t("contact.email")} className="w-full rounded-md border border-white/10 bg-zinc-800 px-4 py-3 text-white focus:border-yellow-400 focus:outline-none" />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        <textarea name="message" rows="4" required placeholder={t("contact.message")} className="w-full rounded-md border border-white/10 bg-zinc-800 px-4 py-3 text-white focus:border-yellow-400 focus:outline-none" />
        <button type="submit" disabled={state.submitting} className="w-full rounded-md bg-gradient-to-r from-purple-400 to-indigo-500 py-3 font-semibold text-black transition hover:opacity-90 disabled:opacity-50">{t("contact.send")}</button>
      </form>
    </div>
  );
}

function SocialItem({ label, sub, icon, href }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-lg bg-zinc-800 p-4 transition hover:bg-zinc-700">
      <span className="text-gray-400 transition group-hover:text-white">{icon}</span>
      <div>
        <p className="text-white">{label}</p>
        <p className="text-sm text-gray-400">{sub}</p>
      </div>
    </a>
  );
}
