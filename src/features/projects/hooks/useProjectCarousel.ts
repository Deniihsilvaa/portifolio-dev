import { useState, useCallback, useEffect } from "react";

export function useProjectCarousel(images: string[]) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openModal = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const handleNext = useCallback(() => {
    setSelectedIndex((prevIndex) => {
      if (prevIndex === null) return null;
      return prevIndex === images.length - 1 ? 0 : prevIndex + 1;
    });
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prevIndex) => {
      if (prevIndex === null) return null;
      return prevIndex === 0 ? images.length - 1 : prevIndex - 1;
    });
  }, [images.length]);

  useEffect(() => {
    if (selectedIndex === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeModal();
      } else if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrev();
      }
    }

    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, closeModal, handleNext, handlePrev]);

  // Derived state to get the currently selected image URL
  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

  return {
    selectedIndex,
    selectedImage,
    openModal,
    closeModal,
    handleNext,
    handlePrev,
  };
}
