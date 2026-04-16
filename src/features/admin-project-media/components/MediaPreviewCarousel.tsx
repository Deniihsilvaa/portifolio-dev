import { SortableMediaItem } from "@/features/admin-project-media/components/SortableMediaItem";
import type { ProjectMediaItem } from "@/features/admin-project-media/types/media.types";

type MediaPreviewCarouselProps = {
  items: ProjectMediaItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onRemove: (localId: string) => void;
  onMove: (fromIndex: number, toIndex: number) => void;
  onNext: () => void;
  onPrevious: () => void;
};

export function MediaPreviewCarousel({
  items,
  activeIndex,
  onSelect,
  onRemove,
  onMove,
  onNext,
  onPrevious,
}: MediaPreviewCarouselProps) {
  const activeItem = items[activeIndex] ?? null;

  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-[2rem] bg-[rgba(17,24,39,0.05)] p-4">
        <div className="flex items-center justify-between pb-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-on-card">
            Preview Carousel
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onPrevious}
              disabled={items.length < 2}
              className="rounded-full border hairline-card px-3 py-2 text-xs font-semibold text-on-card disabled:opacity-50"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={items.length < 2}
              className="rounded-full border hairline-card px-3 py-2 text-xs font-semibold text-on-card disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        <div className="flex min-h-[20rem] items-center justify-center rounded-[1.5rem] bg-black/90">
          {activeItem ? (
            activeItem.type === "image" ? (
              <img
                src={activeItem.previewUrl}
                alt=""
                className="max-h-[30rem] w-full rounded-[1.25rem] object-contain"
              />
            ) : (
              <video
                src={activeItem.previewUrl}
                className="max-h-[30rem] w-full rounded-[1.25rem]"
                controls
              />
            )
          ) : (
            <div className="text-sm text-white/70">Add media to preview the carousel.</div>
          )}
        </div>
      </div>

      {items.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {items.map((item, index) => (
            <SortableMediaItem
              key={item.localId}
              item={item}
              index={index}
              isActive={index === activeIndex}
              onSelect={() => onSelect(index)}
              onRemove={() => onRemove(item.localId)}
              onMove={onMove}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
