import { useProjectCarousel } from "@/features/projects/hooks/useProjectCarousel";

type ProjectCarouselProps = {
  title: string;
  images: string[];
};

export function ProjectCarousel({ title, images }: ProjectCarouselProps) {
  const {
    selectedImage,
    openModal,
    closeModal,
    handleNext,
    handlePrev,
  } = useProjectCarousel(images);

  return (
    <>
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

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, idx) => (
            <div
              key={image}
              className="surface-card overflow-hidden rounded-[1.5rem] p-3 shadow-card cursor-pointer group"
              onClick={() => openModal(idx)}
            >
              <div className="overflow-hidden rounded-[1rem]">
                <img
                  src={image}
                  alt={`${title} screenshot ${idx + 1}`}
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL FULLSCREEN */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl"
          onClick={closeModal}
        >
          <div
            className="relative flex items-center justify-center max-h-[90vh] max-w-[95vw] lg:max-w-[85vw]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            {images.length > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-[-1rem] lg:left-[-4rem] z-[60] rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-110"
                aria-label="Previous image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
            )}

            <img
              src={selectedImage}
              alt="Project preview"
              className="max-h-[85vh] rounded-2xl object-contain shadow-2xl ring-1 ring-white/10"
            />

            {/* Next Button */}
            {images.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-[-1rem] lg:right-[-4rem] z-[60] rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-110"
                aria-label="Next image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-6 -right-6 lg:-top-10 lg:-right-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-md shadow-lg transition hover:bg-white/30 hover:scale-110"
              aria-label="Close modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          {/* Status Text (e.g. 1 / 3) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm font-medium text-white/50 tracking-widest">
            {images.indexOf(selectedImage) + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}