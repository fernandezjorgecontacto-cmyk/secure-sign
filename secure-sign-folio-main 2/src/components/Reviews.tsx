import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { supabase } from "@/integrations/supabase/client";

type Review = {
  id: string;
  name: string;
  service: string | null;
  rating: number;
  comment: string;
  created_at: string;
};

const reviewSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Ingresá tu nombre (mínimo 2 caracteres)." })
    .max(60, { message: "El nombre es demasiado largo." }),
  service: z.string().trim().max(60, { message: "El trámite es demasiado largo." }).optional(),
  rating: z
    .number()
    .int()
    .min(1, { message: "Elegí una puntuación." })
    .max(5),
  comment: z
    .string()
    .trim()
    .min(5, { message: "Contanos un poco más sobre tu experiencia." })
    .max(800, { message: "La reseña es demasiado larga." }),
});

function Stars({ value, className = "h-4 w-4" }: { value: number; className?: string }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={className}
          style={
            i < value
              ? { color: "var(--gold)", fill: "var(--gold)" }
              : { color: "var(--gold)", opacity: 0.3 }
          }
        />
      ))}
    </div>
  );
}

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [comment, setComment] = useState("");

  async function load() {
    const { data, error } = await supabase
      .from("reviews")
      .select("id, name, service, rating, comment, created_at")
      .order("created_at", { ascending: false })
      .limit(30);
    if (!error && data) setReviews(data as Review[]);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = reviewSchema.safeParse({
      name,
      service: service.trim() || undefined,
      rating,
      comment,
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Revisá los datos ingresados.");
      return;
    }
    setSending(true);
    const { error } = await supabase.from("reviews").insert({
      name: parsed.data.name,
      service: parsed.data.service ?? null,
      rating: parsed.data.rating,
      comment: parsed.data.comment,
    });
    setSending(false);
    if (error) {
      toast.error("No pudimos enviar tu reseña. Intentá nuevamente.");
      return;
    }
    toast.success("¡Gracias por tu reseña!");
    setName("");
    setService("");
    setComment("");
    setRating(0);
    void load();
  }

  const average =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  return (
    <section id="opiniones" className="bg-secondary/60 py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center" data-reveal>
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10" style={{ background: "var(--gold)" }} />
            <span className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
              Opiniones
            </span>
            <span className="h-px w-10" style={{ background: "var(--gold)" }} />
          </div>
          <h2 className="font-serif text-4xl leading-tight text-ink lg:text-5xl">
            La confianza de quienes ya nos eligieron.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Todas las reseñas son dejadas por clientes reales del estudio.
          </p>
          {reviews.length > 0 && (
            <div className="mt-6 flex items-center justify-center gap-3">
              <Stars value={Math.round(average)} className="h-5 w-5" />
              <span className="text-sm text-muted-foreground">
                {average.toFixed(1)} · {reviews.length}{" "}
                {reviews.length === 1 ? "reseña" : "reseñas"}
              </span>
            </div>
          )}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.15fr_1fr]">
          {/* Listado */}
          <div className="space-y-6">
            {loading && (
              <p className="text-sm text-muted-foreground">Cargando reseñas…</p>
            )}
            {!loading && reviews.length === 0 && (
              <div className="rounded-sm border border-dashed border-border bg-background p-10 text-center">
                <p className="font-serif text-xl text-ink">
                  Todavía no hay reseñas publicadas.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Si ya fuiste cliente del estudio, sé la primera persona en dejar tu
                  opinión.
                </p>
              </div>
            )}
            {reviews.map((r) => (
              <figure
                key={r.id}
                className="rounded-sm border border-border bg-background p-8 transition-all hover:-translate-y-1 hover:shadow-[0_25px_60px_-25px_oklch(0.24_0.05_258_/_0.25)]"
              >
                <div className="mb-4">
                  <Stars value={r.rating} />
                </div>
                <blockquote className="font-serif text-lg italic leading-relaxed text-ink">
                  “{r.comment}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-navy/10 font-serif text-navy">
                    {r.name.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <div className="text-sm font-medium text-ink">{r.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {r.service ? `${r.service} · ` : ""}
                      {new Date(r.created_at).toLocaleDateString("es-UY", {
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Formulario */}
          <form
            onSubmit={handleSubmit}
            className="h-fit rounded-sm border border-border bg-background p-8 lg:sticky lg:top-28"
          >
            <h3 className="font-serif text-2xl text-ink">Dejá tu reseña</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Tu opinión nos ayuda a seguir mejorando.
            </p>

            <div className="mt-6">
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Puntuación
              </label>
              <div className="mt-2 flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    type="button"
                    aria-label={`${v} ${v === 1 ? "estrella" : "estrellas"}`}
                    onClick={() => setRating(v)}
                    onMouseEnter={() => setHover(v)}
                    onMouseLeave={() => setHover(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className="h-7 w-7"
                      style={
                        v <= (hover || rating)
                          ? { color: "var(--gold)", fill: "var(--gold)" }
                          : { color: "var(--gold)", opacity: 0.3 }
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="review-name"
                  className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Nombre
                </label>
                <input
                  id="review-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={60}
                  className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-ink outline-none transition focus:border-[var(--gold)]"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label
                  htmlFor="review-service"
                  className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Trámite (opcional)
                </label>
                <input
                  id="review-service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  maxLength={60}
                  className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-ink outline-none transition focus:border-[var(--gold)]"
                  placeholder="Compraventa, sucesión, poder…"
                />
              </div>
              <div>
                <label
                  htmlFor="review-comment"
                  className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Tu experiencia
                </label>
                <textarea
                  id="review-comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  maxLength={800}
                  rows={5}
                  className="mt-2 w-full resize-none rounded-sm border border-border bg-background px-4 py-3 text-sm text-ink outline-none transition focus:border-[var(--gold)]"
                  placeholder="Contanos cómo fue tu experiencia con el estudio…"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="mt-6 w-full rounded-sm bg-navy px-6 py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:opacity-90 disabled:opacity-60"
            >
              {sending ? "Enviando…" : "Publicar reseña"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}