import type { DragEvent } from "react";
import { MediaThumbnail } from "@/features/admin-project-media/components/MediaThumbnail";
import type { ProjectMediaItem } from "@/features/admin-project-media/types/media.types";

type SortableMediaItemProps = {
  item: ProjectMediaItem;
  index: number;
  isActive: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onMove: (fromIndex: number, toIndex: number) => void;
};

export function SortableMediaItem({
  item,
  index,
  isActive,
  onSelect,
  onRemove,
  onMove,
}: SortableMediaItemProps) {
  function handleDragStart(event: DragEvent<HTMLDivElement>) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", String(index));
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const fromIndex = Number(event.dataTransfer.getData("text/plain"));

    if (!Number.isNaN(fromIndex)) {
      onMove(fromIndex, index);
    }
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
      className="flex flex-col gap-2"
    >
      <div className="pl-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-on-card">
        Drag
      </div>
      <MediaThumbnail
        item={item}
        isActive={isActive}
        onClick={onSelect}
        onRemove={onRemove}
      />
    </div>
  );
}
