import { useRef } from "react";

export function useDoubleTap(callback: () => void, delay = 300) {
  const lastTap = useRef<number | null>(null);

  return () => {
    const now = Date.now();
    if (lastTap.current && now - lastTap.current < delay) {
      callback(); // Вызываем callback, если это второе нажатие
    } else {
      lastTap.current = now; // Сохраняем время первого нажатия
    }
  };
}
