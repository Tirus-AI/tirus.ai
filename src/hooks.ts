import { useEffect } from "react";

export function useDocumentTitle(title: string, suffix = "Tirus AI") {
  useEffect(() => {
    document.title = title ? `${title} · ${suffix}` : suffix;
  }, [title, suffix]);
}