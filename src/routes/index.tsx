import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  MessageCircle,
  Mail,
  MapPin,
  Phone,
  Clock,
  Zap,
  Handshake,
  Lock,
  FileText,
  Users,
  CalendarClock,
  Landmark,
  ChevronDown,
  ArrowRight,
  Home,
  Scale,
  ScrollText,
  Building2,
  Stamp,
  FileSignature,
  BookOpen,
  Briefcase,
  Sparkles,
} from "lucide-react";
import { Reviews } from "@/components/Reviews";
import heroImg from "@/assets/hero-notary.jpg";
import portraitAsset from "@/assets/escribano-araujo.jpg.asset.json";
import featherLogo from "@/assets/feather-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Estudio Notarial & Jurídico ARAÚJO — Escribanía en La Barra, Punta del Este" },
      {
        name: "description",
        content:
          "Estudio Notarial & Jurídico ARAÚJO en La Barra, Punta del Este. Compraventas, sucesiones, poderes, hipotecas y certificaciones con atención personalizada en Maldonado y para extranjeros.",
      },
      {
        name: "keywords",
        content:
          "escribanía, escribano público, trámites notariales, compraventas, sucesiones, poderes, hipotecas, certificaciones, contratos, protocolizaciones",
      },
      { property: "og:title", content: "Estudio Notarial & Jurídico ARAÚJO — Escribanía en La Barra" },
      {
        property: "og:description",
        content:
          "Asesoramiento claro, rapidez en la gestión y acompañamiento profesional en cada etapa del proceso notarial.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

const WHATSAPP_URL =
  "https://wa.me/59899852911?text=" + encodeURIComponent("Hola, quisiera realizar una consulta.");
const PHONE = "+598 99 852 911";
const EMAIL = "araujoescribania@gmail.com";
const ADDRESS = "Cayetano Silva casi Av. Juana de América, El Tesoro, La Barra, Punta del Este";
const MAPS_QUERY = encodeURIComponent(
  "Estudio Notarial & Jurídico ARAÚJO, Cayetano Silva, La Barra, Maldonado, Uruguay",
);
const MAPS_URL = "https://maps.app.goo.gl/Q9FoZGsA5qwLbzTD9";

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function IntroSplash() {
  const [phase, setPhase] = useState<"in" | "out" | "done">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("out"), 1400);
    const t2 = setTimeout(() => setPhase("done"), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[100] grid place-items-center transition-opacity duration-[900ms] ease-out"
      style={{
        background:
          "radial-gradient(circle at 50% 45%, color-mix(in oklab, var(--gold) 12%, white), var(--cream))",
        opacity: phase === "out" ? 0 : 1,
        pointerEvents: phase === "out" ? "none" : "auto",
      }}
    >
      <div className="flex flex-col items-center">
        <img
          src={featherLogo}
          alt=""
          className="object-contain"
          style={{
            width: phase === "out" ? "72px" : "150px",
            height: phase === "out" ? "72px" : "150px",
            opacity: phase === "out" ? 0 : 1,
            transform: phase === "out" ? "translateY(-24px)" : "translateY(0)",
            transition: "all 900ms cubic-bezier(.2,.7,.2,1)",
            animation: "introFeather 1.4s cubic-bezier(.2,.7,.2,1) both",
          }}
        />
        <span
          className="mt-6 font-serif text-lg tracking-[0.2em] text-ink"
          style={{
            opacity: phase === "out" ? 0 : 1,
            transition: "opacity 600ms ease-out",
            animation: "introFade 1.6s ease-out both",
          }}
        >
          ESTUDIO ARAÚJO
        </span>
        <span
          className="mt-2 text-[10px] uppercase tracking-[0.35em] text-muted-foreground"
          style={{
            opacity: phase === "out" ? 0 : 1,
            transition: "opacity 600ms ease-out",
            animation: "introFade 2s ease-out both",
          }}
        >
          Notarial &amp; Jurídico
        </span>
      </div>
      <style>{`
        @keyframes introFeather { 0% { opacity: 0; transform: translateY(18px) scale(.9) rotate(-6deg); } 100% { opacity: 1; transform: translateY(0) scale(1) rotate(0); } }
        @keyframes introFade { 0%, 35% { opacity: 0; } 100% { opacity: 1; } }
      `}</style>
    </div>
  );
}

function Index() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <IntroSplash />
      <style>{`
        html { scroll-behavior: smooth; }
        .font-serif { font-family: var(--font-serif); }
        .font-sans { font-family: var(--font-sans); }
        [data-reveal] { opacity: 0; transform: translateY(24px); transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1); }
        [data-reveal="left"] { transform: translateX(-32px); }
        [data-reveal="right"] { transform: translateX(32px); }
        [data-reveal="zoom"] { transform: scale(.96); }
        [data-reveal].is-visible { opacity: 1; transform: none; }
        .hairline { background: linear-gradient(90deg, transparent, oklch(0.72 0.11 82 / .55), transparent); }
        @keyframes floatPulse { 0%,100% { box-shadow: 0 10px 30px -8px oklch(0.55 0.14 155 / .5); } 50% { box-shadow: 0 14px 40px -6px oklch(0.55 0.14 155 / .8); } }
        .wa-float { animation: floatPulse 2.6s ease-in-out infinite; }
      `}</style>

      {/* Header */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-border shadow-[0_1px_20px_-10px_oklch(0.24_0.05_258_/_0.25)]"
            : "bg-white/60 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <a href="#inicio" className="flex items-center gap-3">
            <span
              className="grid h-14 w-14 place-items-center rounded-full"
              style={{ background: "color-mix(in oklab, var(--gold) 18%, white)" }}
            >
              <img src={featherLogo} alt="" className="h-9 w-9 object-contain" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-serif text-lg tracking-wide text-ink">
                Estudio ARAÚJO
              </span>
              <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                Notarial & Jurídico
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-9 lg:flex">
            {[
              ["Inicio", "#inicio"],
              ["Nosotros", "#nosotros"],
              ["Servicios", "#servicios"],
              ["Proceso", "#proceso"],
              ["Preguntas", "#faq"],
              ["Contacto", "#contacto"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="group relative text-sm font-medium text-foreground/80 transition-colors hover:text-navy"
              >
                {label}
                <span
                  className="absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
                  style={{ background: "var(--gold)" }}
                />
              </a>
            ))}
          </nav>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-navy-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg lg:inline-flex"
          >
            <MessageCircle className="h-4 w-4" style={{ color: "var(--gold)" }} />
            Escribinos por WhatsApp
          </a>

          <button
            aria-label="Menú"
            onClick={() => setMenuOpen((v) => !v)}
            className="text-ink lg:hidden"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-border bg-white lg:hidden">
            <nav className="flex flex-col p-6">
              {[
                ["Inicio", "#inicio"],
                ["Nosotros", "#nosotros"],
                ["Servicios", "#servicios"],
                ["Proceso", "#proceso"],
                ["Preguntas", "#faq"],
                ["Contacto", "#contacto"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-border py-3 text-sm font-medium text-foreground"
                >
                  {label}
                </a>
              ))}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-medium text-navy-foreground"
              >
                <MessageCircle className="h-4 w-4" style={{ color: "var(--gold)" }} />
                Escribinos por WhatsApp
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="inicio" className="relative isolate min-h-[100svh] overflow-hidden">
        <img
          src={heroImg}
          alt="Escribanía profesional — firma de escritura pública"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-cream/85 via-white/55 to-cream/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.72_0.11_82_/_0.25)_0%,transparent_55%)]" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 pt-32 pb-20 lg:px-10">
          <div className="max-w-3xl" data-reveal>
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-12" style={{ background: "var(--gold)" }} />
              <span className="text-[15px] uppercase tracking-[0.35em] text-navy/80">
                Estudio Notarial & Jurídico ARAÚJO
              </span>
            </div>
            <h1 className="font-serif text-5xl leading-[1.05] text-ink sm:text-6xl lg:text-7xl">
              Seguridad jurídica
              <br />
              con{" "}
              <span className="italic" style={{ color: "var(--gold)" }}>
                atención personalizada
              </span>
              .
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/80">
              Cada trámite representa una decisión importante. Nuestro compromiso es brindarle
              asesoramiento claro, rapidez en la gestión y un acompañamiento profesional en cada
              etapa del proceso.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[oklch(0.62_0.16_150)] px-6 py-3.5 text-sm font-medium text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[oklch(0.56_0.17_150)] hover:shadow-xl"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
                <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2.5 rounded-full bg-navy px-6 py-3.5 text-sm font-medium text-navy-foreground transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                <Mail className="h-4 w-4" style={{ color: "var(--gold)" }} />
                Enviar Email
              </a>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-white/95 px-6 py-3.5 text-sm font-medium text-ink shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white"
              >
                <MapPin className="h-4 w-4" />
                Cómo llegar
              </a>
            </div>

            <div className="mt-14 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
              {[
                "Atención personalizada",
                "Trámites ágiles",
                "Amplia experiencia",
                "Confidencialidad",
              ].map((t) => (
                <div key={t} className="flex items-center gap-2 text-xs text-ink/80 sm:text-sm">
                  <span
                    className="grid h-5 w-5 flex-none place-items-center rounded-full"
                    style={{ background: "oklch(0.72 0.11 82 / .22)" }}
                  >
                    <span
                      className="text-[11px] font-bold"
                      style={{ color: "var(--gold)" }}
                    >
                      ✓
                    </span>
                  </span>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>

        <a
          href="#nosotros"
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-navy/50 hover:text-navy lg:block"
          aria-label="Descubrir más"
        >
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </a>
      </section>

      {/* Nosotros */}
      <section id="nosotros" className="relative py-28 lg:py-36">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
          <div className="relative order-2 lg:order-1" data-reveal="left">
            <div
              className="absolute -left-4 -top-4 hidden h-full w-full rounded-sm lg:block"
              style={{ border: "1px solid var(--gold)", opacity: 0.5 }}
            />
            <img
              src={portraitAsset.url}
              alt="Escribano profesional"
              loading="lazy"
              width={1200}
              height={1408}
              className="relative w-full rounded-sm object-cover shadow-[0_30px_80px_-30px_oklch(0.24_0.05_258_/_0.35)]"
            />
          </div>
          <div className="order-1 flex flex-col justify-center lg:order-2" data-reveal="right">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10" style={{ background: "var(--gold)" }} />
              <span className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
                Quiénes somos
              </span>
            </div>
            <h2 className="font-serif text-4xl leading-tight text-ink lg:text-5xl">
              Una escribanía cercana,
              <br />
              <span className="italic text-navy">rigurosa y moderna.</span>
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                Nuestra escribanía trabaja cada día con un objetivo muy claro: ofrecer un servicio
                profesional, cercano y eficiente para que cada cliente pueda resolver sus trámites
                con tranquilidad.
              </p>
              <p>
                Entendemos que detrás de cada documento existe una decisión importante. Por eso
                brindamos atención personalizada, explicamos cada paso del proceso y acompañamos a
                nuestros clientes hasta finalizar cada gestión.
              </p>
              <p>
                Nuestra sede se encuentra en La Barra, Punta del Este, y atendemos clientes en
                Maldonado, La Barra de Maldonado y Punta del Este. También trabajamos con
                extranjeros y gestionamos trámites para el resto de países.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                ["7", "Años de trayectoria"],
                ["4.9★", "Valoración clientes"],
                ["100%", "Confidencialidad"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="font-serif text-3xl text-navy lg:text-4xl">{n}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="bg-secondary/60 py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center" data-reveal>
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-10" style={{ background: "var(--gold)" }} />
              <span className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
                Por qué elegirnos
              </span>
              <span className="h-px w-10" style={{ background: "var(--gold)" }} />
            </div>
            <h2 className="font-serif text-4xl leading-tight text-ink lg:text-5xl">
              Los pilares de nuestro trabajo
            </h2>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-2 lg:grid-cols-4">
            {[
              [Landmark, "Profesionalismo", "Rigor técnico y ética en cada actuación notarial."],
              [Zap, "Rapidez", "Gestiones ágiles sin comprometer la precisión."],
              [Handshake, "Atención personalizada", "Escuchamos y explicamos cada paso."],
              [Lock, "Confidencialidad", "Discreción absoluta con su información."],
              [FileText, "Asesoramiento integral", "Acompañamiento antes, durante y después."],
              [Users, "Amplia cartera", "Clientes particulares, empresas e instituciones."],
              [CalendarClock, "Cumplimiento de plazos", "Respetamos su tiempo y sus fechas."],
              [MapPin, "Sede en La Barra", "Atención en Maldonado, La Barra y Punta del Este."],
            ].map(([Icon, title, desc], i) => (
              <div
                key={title as string}
                data-reveal="zoom"
                style={{ transitionDelay: `${i * 60}ms` }}
                className="group relative bg-background p-8 transition-all hover:bg-white"
              >
                <span
                  className="absolute inset-x-8 top-0 h-px scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: "var(--gold)" }}
                />
                <div
                  className="mb-5 grid h-12 w-12 place-items-center rounded-sm bg-navy/5 transition-colors group-hover:bg-navy"
                  style={{}}
                >
                  
                  <Icon
                    className="h-5 w-5 text-navy transition-colors group-hover:text-[oklch(0.72_0.11_82)]"
                  />
                </div>
                <h3 className="font-serif text-lg text-ink">{title as string}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {desc as string}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end" data-reveal>
            <div className="max-w-xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-10" style={{ background: "var(--gold)" }} />
                <span className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
                  Servicios
                </span>
              </div>
              <h2 className="font-serif text-4xl leading-tight text-ink lg:text-5xl">
                Trámites notariales
                <br />
                <span className="italic text-navy">con respaldo integral.</span>
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground">
              Cubrimos la totalidad del ejercicio notarial: desde la compraventa de un inmueble
              hasta la constitución de sociedades y protocolizaciones.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              [Home, "Compraventas", "Escrituración de inmuebles con estudio de títulos completo."],
              [Landmark, "Hipotecas", "Constitución y cancelación de garantías reales."],
              [Scale, "Sucesiones", "Gestión integral de trámites sucesorios."],
              [ScrollText, "Testamentos", "Redacción y protocolización con máxima reserva."],
              [FileSignature, "Poderes", "Generales, especiales y para el extranjero."],
              [Stamp, "Certificaciones", "Firmas, fotocopias, existencia y supervivencia."],
              [Building2, "Constitución de sociedades", "SA, SRL, SAS y modificaciones estatutarias."],
              [Briefcase, "Contratos", "Redacción y asesoramiento contractual."],
              [BookOpen, "Protocolizaciones", "Incorporación de documentos al protocolo."],
              [Users, "Asesoramiento notarial", "Consultas previas y planificación patrimonial."],
              [Sparkles, "Otros trámites", "Consulte por gestiones fuera de esta lista."],
            ].map(([Icon, title, desc], i) => (
              <a
                key={title as string}
                href="#contacto"
                data-reveal
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
                className="group relative overflow-hidden rounded-sm border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:border-navy/20 hover:shadow-[0_25px_60px_-25px_oklch(0.24_0.05_258_/_0.3)]"
              >
                <span
                  className="absolute inset-y-0 left-0 w-0.5 scale-y-0 transition-transform duration-500 group-hover:scale-y-100"
                  style={{ background: "var(--gold)", transformOrigin: "top" }}
                />
                <div className="mb-5 flex items-center justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-sm bg-navy/5 text-navy transition-all group-hover:bg-navy group-hover:text-[oklch(0.72_0.11_82)]">
                    
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-4 w-4 -translate-x-2 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-navy" />
                </div>
                <h3 className="font-serif text-xl text-ink">{title as string}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {desc as string}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Compromiso */}
      <section className="relative overflow-hidden bg-navy py-28 lg:py-36">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(oklch(0.72 0.11 82) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10" data-reveal>
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-10" style={{ background: "var(--gold)" }} />
            <span className="text-[11px] uppercase tracking-[0.35em] text-white/60">
              Nuestro compromiso
            </span>
            <span className="h-px w-10" style={{ background: "var(--gold)" }} />
          </div>
          <h2 className="font-serif text-4xl leading-tight text-white lg:text-6xl">
            Más que un trámite,
            <br />
            <span className="italic" style={{ color: "var(--gold)" }}>
              una relación de confianza.
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/75">
            Trabajamos para que cada cliente reciba una atención clara, eficiente y profesional.
            Valoramos el tiempo de quienes nos eligen y nos esforzamos por brindar soluciones
            ágiles, con el respaldo y la seguridad jurídica que cada situación requiere.
          </p>
        </div>
      </section>

      {/* Proceso */}
      <section id="proceso" className="py-28 lg:py-36">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center" data-reveal>
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-10" style={{ background: "var(--gold)" }} />
              <span className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
                Proceso de trabajo
              </span>
              <span className="h-px w-10" style={{ background: "var(--gold)" }} />
            </div>
            <h2 className="font-serif text-4xl leading-tight text-ink lg:text-5xl">
              Un método claro, de principio a fin.
            </h2>
          </div>

          <div className="relative mt-20">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border lg:left-1/2 lg:-translate-x-1/2" />
            {[
              ["Contacto", "El cliente se comunica por WhatsApp, teléfono o correo."],
              ["Asesoramiento", "Analizamos el caso y explicamos el procedimiento."],
              ["Gestión", "Realizamos toda la documentación necesaria."],
              ["Firma", "Coordinamos la firma y entrega de la documentación."],
              ["Seguimiento", "Respondemos cualquier consulta posterior."],
            ].map(([title, desc], i) => {
              const left = i % 2 === 0;
              return (
                <div
                  key={title}
                  data-reveal={left ? "left" : "right"}
                  className={`relative mb-12 flex items-start gap-6 lg:mb-14 lg:w-1/2 lg:gap-10 ${
                    left ? "lg:pr-14" : "lg:ml-auto lg:pl-14"
                  }`}
                >
                  <div className="absolute left-8 -translate-x-1/2 lg:left-auto lg:right-auto lg:top-2 lg:h-4 lg:w-4">
                    <span
                      className={`relative z-10 grid h-16 w-16 place-items-center rounded-full bg-navy font-serif text-lg text-white shadow-lg lg:absolute lg:h-4 lg:w-4 lg:text-0 ${
                        left ? "lg:-right-14 lg:top-2" : "lg:-left-14 lg:top-2"
                      }`}
                      style={{ boxShadow: "0 0 0 6px var(--background), 0 0 0 7px var(--border)" }}
                    >
                      <span className="lg:hidden">{i + 1}</span>
                    </span>
                  </div>
                  <div className="ml-24 lg:ml-0">
                    <div className="mb-1 font-serif text-sm" style={{ color: "var(--gold)" }}>
                      Paso 0{i + 1}
                    </div>
                    <h3 className="font-serif text-2xl text-ink">{title}</h3>
                    <p className="mt-2 text-muted-foreground">{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Opiniones reales */}
      <Reviews />

      {/* FAQ */}
      <section id="faq" className="py-28 lg:py-36">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <div className="text-center" data-reveal>
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-10" style={{ background: "var(--gold)" }} />
              <span className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
                Preguntas frecuentes
              </span>
              <span className="h-px w-10" style={{ background: "var(--gold)" }} />
            </div>
            <h2 className="font-serif text-4xl leading-tight text-ink lg:text-5xl">
              Todo lo que quiere saber antes de consultarnos.
            </h2>
          </div>

          <div className="mt-14 divide-y divide-border rounded-sm border border-border bg-card">
            {[
              [
                "¿Qué documentación necesito?",
                "Depende del trámite. En una consulta inicial le indicaremos con exactitud los documentos requeridos y le enviaremos una lista personalizada.",
              ],
              [
                "¿Cuánto demora un trámite?",
                "Los plazos varían según la complejidad del acto. Trabajamos con calendarios claros y le informaremos la fecha estimada de firma desde el primer día.",
              ],
              [
                "¿Puedo hacer consultas antes de contratar?",
                "Sí. Ofrecemos una consulta previa sin compromiso para explicarle el procedimiento y despejar dudas.",
              ],
              [
                "¿Cómo coordino una reunión?",
                "Puede escribirnos por WhatsApp, correo o llamarnos. Le confirmaremos un horario dentro de las 24 horas.",
              ],
              [
                "¿Qué medios de pago aceptan?",
                "Aceptamos efectivo, transferencia bancaria y otros medios previamente acordados.",
              ],
            ].map(([q, a]) => (
              <FaqItem key={q} q={q} a={a} />
            ))}
          </div>
        </div>
      </section>

      {/* Contacto + Mapa + Formulario */}
      <section id="contacto" className="bg-secondary/60 py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center" data-reveal>
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-10" style={{ background: "var(--gold)" }} />
              <span className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
                Contacto
              </span>
              <span className="h-px w-10" style={{ background: "var(--gold)" }} />
            </div>
            <h2 className="font-serif text-4xl leading-tight text-ink lg:text-5xl">
              Estamos para asesorarlo.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Escríbanos por el canal que prefiera. Le responderemos a la brevedad.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {/* Info & Mapa */}
            <div className="space-y-6" data-reveal="left">
              <div className="rounded-sm border border-border bg-background p-8">
                <h3 className="font-serif text-xl text-ink">Datos de contacto</h3>
                <div className="mt-6 space-y-4 text-sm">
                  {(
                    [
                      [MapPin, ADDRESS, MAPS_URL],
                      [Phone, PHONE, `tel:${PHONE.replace(/\s/g, "")}`],
                      [Mail, EMAIL, `mailto:${EMAIL}`],
                      [MessageCircle, "WhatsApp directo", WHATSAPP_URL],
                      [Clock, "Lun a Vie · 09:30 – 18:30", null],
                    ] as [React.ElementType, string, string | null][]
                  ).map(([Icon, text, href]) => (
                    <div key={text as string} className="flex items-center gap-4">
                      <span className="grid h-10 w-10 flex-none place-items-center rounded-sm bg-navy/5 text-navy">
                        <Icon className="h-4 w-4" />
                      </span>
                      {href ? (
                        <a
                          href={href as string}
                          target={href === WHATSAPP_URL || href === MAPS_URL ? "_blank" : undefined}
                          rel={href === WHATSAPP_URL || href === MAPS_URL ? "noreferrer" : undefined}
                          className="text-foreground transition-colors hover:text-navy"
                        >
                          {text as string}
                        </a>
                      ) : (
                        <span className="text-foreground">{text as string}</span>
                      )}
                    </div>
                  ))}
                </div>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm text-navy-foreground transition-all hover:-translate-y-0.5"
                >
                  <MapPin className="h-4 w-4" style={{ color: "var(--gold)" }} />
                  Cómo llegar
                </a>
              </div>
              <div className="overflow-hidden rounded-sm border border-border">
                <iframe
                  title="Ubicación de la escribanía"
                  src={`https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`}
                  width="100%"
                  height="320"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block w-full grayscale-[0.3]"
                />
              </div>
            </div>

            {/* Formulario */}
            <form
              data-reveal="right"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget as HTMLFormElement);
                const body = `Nombre: ${fd.get("nombre")} ${fd.get("apellido")}%0D%0ATeléfono: ${fd.get(
                  "telefono",
                )}%0D%0AEmail: ${fd.get("email")}%0D%0ATrámite: ${fd.get(
                  "tramite",
                )}%0D%0A%0D%0A${fd.get("mensaje")}`;
                window.location.href = `mailto:${EMAIL}?subject=Consulta%20desde%20la%20web&body=${body}`;
              }}
              className="rounded-sm border border-border bg-background p-8"
            >
              <h3 className="font-serif text-xl text-ink">Solicitar consulta</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Complete el formulario y le responderemos dentro de las 24 hs.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field name="nombre" label="Nombre" required />
                <Field name="apellido" label="Apellido" required />
                <Field name="telefono" label="Teléfono" type="tel" />
                <Field name="email" label="Correo" type="email" required />
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
                    Tipo de trámite
                  </label>
                  <select
                    name="tramite"
                    className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-navy"
                  >
                    {[
                      "Consulta general",
                      "Compraventa",
                      "Hipoteca",
                      "Sucesión",
                      "Testamento",
                      "Poder",
                      "Certificación",
                      "Constitución de sociedad",
                      "Contrato",
                      "Otro",
                    ].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
                    Mensaje
                  </label>
                  <textarea
                    name="mensaje"
                    rows={4}
                    required
                    className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-navy"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-medium text-navy-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg sm:w-auto"
              >
                Solicitar consulta
                <ArrowRight className="h-4 w-4" style={{ color: "var(--gold)" }} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink text-white/70">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-white">
                  <img src={featherLogo} alt="" className="h-9 w-9 object-contain" />
                </span>
                <div>
                  <div className="font-serif text-lg text-white">Estudio ARAÚJO</div>
                  <div className="text-[10px] uppercase tracking-[0.28em] text-white/50">
                    Notarial & Jurídico
                  </div>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed">
                Servicio notarial profesional, cercano y eficiente. Trámites con seguridad jurídica
                y atención personalizada.
              </p>
            </div>
            <div>
              <div className="mb-4 text-xs uppercase tracking-[0.25em] text-white/50">Enlaces</div>
              <ul className="space-y-2 text-sm">
                {[
                  ["Inicio", "#inicio"],
                  ["Nosotros", "#nosotros"],
                  ["Servicios", "#servicios"],
                  ["Preguntas", "#faq"],
                  ["Contacto", "#contacto"],
                ].map(([l, h]) => (
                  <li key={h}>
                    <a href={h} className="transition-colors hover:text-white">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-4 text-xs uppercase tracking-[0.25em] text-white/50">Contacto</div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 flex-none" style={{ color: "var(--gold)" }} />
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    {ADDRESS}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" style={{ color: "var(--gold)" }} />
                  <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="transition-colors hover:text-white">
                    {PHONE}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" style={{ color: "var(--gold)" }} />
                  <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-white">
                    {EMAIL}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4" style={{ color: "var(--gold)" }} />
                  Lun a Vie · 09 – 18 hs
                </li>
              </ul>
            </div>
            <div>
              <div className="mb-4 text-xs uppercase tracking-[0.25em] text-white/50">
                Ubicación
              </div>
              <div className="overflow-hidden rounded-sm border border-white/10">
                <iframe
                  title="Mapa footer"
                  src={`https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`}
                  width="100%"
                  height="140"
                  loading="lazy"
                  className="block w-full grayscale opacity-90"
                />
              </div>
            </div>
          </div>
          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row">
            <div>© {new Date().getFullYear()} Estudio Notarial & Jurídico ARAÚJO. Todos los derechos reservados.</div>
            <div>Diseño y desarrollo con dedicación.</div>
          </div>
        </div>
      </footer>

      {/* WhatsApp flotante */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Escribinos por WhatsApp"
        className="wa-float fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[oklch(0.62_0.16_150)] text-white transition-transform hover:scale-110"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LegalService",
            name: "Estudio Notarial & Jurídico ARAÚJO",
            description:
              "Estudio Notarial & Jurídico ARAÚJO en La Barra, Punta del Este. Compraventas, sucesiones, poderes, hipotecas, certificaciones y asesoramiento notarial en Maldonado y para extranjeros.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Cayetano Silva y Av. Juana de América, El Tesoro, La Barra",
              addressLocality: "Punta del Este",
              addressRegion: "Maldonado",
              postalCode: "20000",
              addressCountry: "UY",
            },
            url: "https://maps.app.goo.gl/Q9FoZGsA5qwLbzTD9",
            telephone: PHONE,
            email: EMAIL,
            openingHours: "Mo-Fr 09:30-18:30",
          }),
        }}
      />
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-navy"
      />
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-secondary/40"
      >
        <span className="font-serif text-lg text-ink">{q}</span>
        <ChevronDown
          className={`h-5 w-5 flex-none text-navy transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className="grid overflow-hidden px-6 transition-all duration-500"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="min-h-0">
          <p className="pb-5 text-sm leading-relaxed text-muted-foreground">{a}</p>
        </div>
      </div>
    </div>
  );
}
