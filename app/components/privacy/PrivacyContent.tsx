import type { Lang } from "../../lib/lang";
import { CONTACT } from "../../lib/seo";
import CookieChoiceButton from "./CookieChoiceButton";

const UPDATED = "2026-11-20";

type Section = { id: string; heading: string; body: string[]; list?: string[] };

const CONTENT: Record<
  Lang,
  { label: string; title: string; updated: string; intro: string; sections: Section[]; choiceHeading: string; choiceText: string; choiceButton: string }
> = {
  en: {
    label: "Legal",
    title: "Privacy policy and cookies",
    updated: "Last updated: November 20, 2026",
    intro:
      "Nuba Studio is a software studio based in Córdoba, Argentina. This page explains what data this website collects, why, and the choices you have.",
    sections: [
      {
        id: "who",
        heading: "Who is responsible",
        body: [
          "Nuba Studio, Córdoba, Argentina, is responsible for this website. You can reach us on WhatsApp (+54 9 351 347 1844) or through our LinkedIn page for any question about your data.",
        ],
      },
      {
        id: "measure",
        heading: "What we measure",
        body: ["We measure how the site is used to improve it. We do it in two ways:"],
        list: [
          "Without cookies: Vercel Web Analytics and Speed Insights count visits, pages, country, referrer, device type and loading performance. The data is aggregated and does not identify you.",
          "Only if you accept: Google Analytics 4 and Google Tag Manager record pages viewed, time on site, approximate location and device. Google sets cookies to tell visits apart. We may also use Microsoft Clarity through Tag Manager to see heatmaps and session recordings. None of these load unless you press Accept.",
        ],
      },
      {
        id: "contact",
        heading: "Contact form and AI helper",
        body: [
          "The message you write on the contact page is not stored on our servers. When you press send, your browser opens WhatsApp with the message ready, and WhatsApp's own privacy policy applies from there.",
          "If you use the AI writing helper, the text you typed is sent to Google's Gemini API to rewrite it, and we do not keep it. Please do not include sensitive personal data in that text.",
        ],
      },
      {
        id: "providers",
        heading: "Who else processes data",
        body: [
          "The site is hosted on Vercel. Google (Analytics, Tag Manager and Gemini), Microsoft (Clarity, if enabled) and Meta (WhatsApp) process data under their own policies. Some of them operate outside your country, including the United States.",
          "Google Analytics keeps data for the period set in our account, never more than 14 months.",
        ],
      },
      {
        id: "rights",
        heading: "Your rights",
        body: [
          "You can ask to access, correct or delete the data we hold about you. In Argentina this is protected by Law 25,326, and if you are in the European Union, by the GDPR. Write to us through the channels above and we will reply.",
          "In Argentina, the authority that oversees data protection is the Agencia de Acceso a la Información Pública.",
        ],
      },
      {
        id: "changes",
        heading: "Changes to this policy",
        body: ["If we change how we handle data, we will update this page and the date at the top."],
      },
    ],
    choiceHeading: "Your cookie choice",
    choiceText:
      "You can change your decision at any time. The banner will show again and, if you reject, nothing from Google or Microsoft loads. To remove cookies already set, clear them in your browser settings.",
    choiceButton: "Change cookie choice",
  },
  es: {
    label: "Legal",
    title: "Política de privacidad y cookies",
    updated: "Última actualización: 20 de noviembre de 2026",
    intro:
      "Nuba Studio es un estudio de software de Córdoba, Argentina. Esta página explica qué datos recoge este sitio, para qué y qué podés decidir vos.",
    sections: [
      {
        id: "who",
        heading: "Quién es responsable",
        body: [
          "Nuba Studio, Córdoba, Argentina, es responsable de este sitio. Para cualquier consulta sobre tus datos podés escribirnos por WhatsApp (+54 9 351 347 1844) o por nuestra página de LinkedIn.",
        ],
      },
      {
        id: "measure",
        heading: "Qué medimos",
        body: ["Medimos cómo se usa el sitio para mejorarlo. Lo hacemos de dos maneras:"],
        list: [
          "Sin cookies: Vercel Web Analytics y Speed Insights cuentan visitas, páginas, país, de dónde llegás, tipo de dispositivo y velocidad de carga. Los datos son agregados y no te identifican.",
          "Solo si aceptás: Google Analytics 4 y Google Tag Manager registran páginas vistas, tiempo en el sitio, ubicación aproximada y dispositivo. Google usa cookies para distinguir visitas. También podemos usar Microsoft Clarity a través de Tag Manager para ver mapas de calor y grabaciones de sesiones. Nada de esto se carga si no tocás Aceptar.",
        ],
      },
      {
        id: "contact",
        heading: "Formulario de contacto y asistente de IA",
        body: [
          "El mensaje que escribís en la página de contacto no se guarda en nuestros servidores. Al enviarlo, tu navegador abre WhatsApp con el mensaje listo, y desde ahí rige la política de privacidad de WhatsApp.",
          "Si usás el asistente de redacción con IA, el texto que escribiste se envía a la API Gemini de Google para reescribirlo, y nosotros no lo guardamos. Te pedimos que no incluyas datos personales sensibles en ese texto.",
        ],
      },
      {
        id: "providers",
        heading: "Quién más procesa datos",
        body: [
          "El sitio está alojado en Vercel. Google (Analytics, Tag Manager y Gemini), Microsoft (Clarity, si se activa) y Meta (WhatsApp) procesan datos según sus propias políticas. Algunos operan fuera de tu país, incluido Estados Unidos.",
          "Google Analytics conserva los datos durante el período configurado en nuestra cuenta, nunca más de 14 meses.",
        ],
      },
      {
        id: "rights",
        heading: "Tus derechos",
        body: [
          "Podés pedir acceso, rectificación o eliminación de los datos que tengamos sobre vos. En Argentina lo protege la Ley 25.326 y, si estás en la Unión Europea, el RGPD. Escribinos por los canales de arriba y te respondemos.",
          "En Argentina, la autoridad que controla la protección de datos es la Agencia de Acceso a la Información Pública.",
        ],
      },
      {
        id: "changes",
        heading: "Cambios en esta política",
        body: ["Si cambiamos cómo tratamos los datos, actualizamos esta página y la fecha de arriba."],
      },
    ],
    choiceHeading: "Tu elección de cookies",
    choiceText:
      "Podés cambiar tu decisión cuando quieras. El aviso vuelve a aparecer y, si rechazás, no se carga nada de Google ni de Microsoft. Para borrar las cookies que ya se guardaron, eliminalas desde la configuración de tu navegador.",
    choiceButton: "Cambiar elección de cookies",
  },
};

export default function PrivacyContent({ lang }: { lang: Lang }) {
  const t = CONTENT[lang];

  return (
    <section aria-labelledby="privacy-title" className="bg-black font-display text-[#EDEDED]">
      <div className="mx-auto max-w-[900px] px-5 pb-24 pt-36 sm:px-8 lg:px-10 lg:pb-32 lg:pt-44">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/55">{t.label}</p>
        <h1 id="privacy-title" className="mt-5 text-[clamp(2.2rem,5vw,4rem)] font-[450] leading-[1.02] tracking-[-0.05em]">
          {t.title}
        </h1>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-white/55">
          <time dateTime={UPDATED}>{t.updated}</time>
        </p>
        <p className="mt-8 max-w-[60ch] text-[17px] leading-[1.65] text-white/75">{t.intro}</p>

        <div className="mt-14 flex flex-col gap-12">
          {t.sections.map((s) => (
            <div key={s.id} className="border-t border-white/[0.07] pt-8">
              <h2 className="text-[clamp(1.4rem,2.4vw,1.9rem)] font-[450] leading-[1.1] tracking-[-0.04em]">{s.heading}</h2>
              <div className="mt-5 flex max-w-[65ch] flex-col gap-4 text-[16px] leading-[1.7] text-white/70">
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {s.list ? (
                  <ul className="flex list-disc flex-col gap-3 pl-5 marker:text-[#C6FF00]">
                    {s.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {s.id === "who" ? (
                  <p>
                    <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="text-[#C6FF00] underline-offset-4 hover:underline">
                      WhatsApp
                    </a>
                    {" · "}
                    <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#C6FF00] underline-offset-4 hover:underline">
                      LinkedIn
                    </a>
                  </p>
                ) : null}
              </div>
            </div>
          ))}

          <div className="border-t border-white/[0.07] pt-8">
            <h2 className="text-[clamp(1.4rem,2.4vw,1.9rem)] font-[450] leading-[1.1] tracking-[-0.04em]">{t.choiceHeading}</h2>
            <p className="mt-5 max-w-[65ch] text-[16px] leading-[1.7] text-white/70">{t.choiceText}</p>
            <div className="mt-6">
              <CookieChoiceButton label={t.choiceButton} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
