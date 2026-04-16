import type { ProjectMediaItem } from "@/features/admin-project-media/types/media.types";

type MediaThumbnailProps = {
  item: ProjectMediaItem;
  isActive: boolean;
  onClick: () => void;
  onRemove: () => void;
};

export function MediaThumbnail({
  item,
  isActive,
  onClick,
  onRemove,
}: MediaThumbnailProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.25rem] border p-2 ${
        isActive ? "border-[var(--color-accent-coral)]" : "hairline-card"
      }`}
    >
      <button
        type="button"
        onClick={onClick}
        className="block h-24 w-24 overflow-hidden rounded-[0.9rem] bg-[rgba(17,24,39,0.08)]"
      >
        {item.type === "image" ? (
          <img src={item.previewUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <video src={item.previewUrl} className="h-full w-full object-cover" muted playsInline />
        )}
      </button>

      <button
        type="button"
        onClick={onRemove}
        className="absolute right-3 top-3 rounded-full bg-black/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white"
      >
        Remove
      </button>
    </div>
  );
}
