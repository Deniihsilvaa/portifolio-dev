type ProjectCarouselProps = {
  title: string;
  images: string[];
};

export function ProjectCarousel({ title, images }: ProjectCarouselProps) {
  return (
    <section className="space-y-4">
      <div className="surface-card flex items-end justify-between rounded-[2rem] p-8 shadow-card">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-coral">
            Project Gallery
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-on-card">
            {title} screens
          </h2>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {images.map((image) => (
          <div key={image} className="surface-card overflow-hidden rounded-[1.5rem] p-3 shadow-card">
            <img
              src={image}
              alt={title}
              className="h-72 w-full rounded-[1rem] object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
