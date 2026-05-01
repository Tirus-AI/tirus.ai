import type { NavigateFunction } from "react-router-dom";

export function scrollToId(
  id: string,
  navigate?: NavigateFunction,
  updateUrl: "replace" | "push" | false = "replace"
) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });

    if (updateUrl) {
      const url = `${window.location.pathname}#${id}`;
      if (updateUrl === "replace") history.replaceState(null, "", url);
      else history.pushState(null, "", url);
    }
    return;
  }

  if (navigate && window.location.pathname !== "/") {
    navigate(`/#${id}`);
  } else if (window.location.pathname !== "/") {
    window.location.href = `/#${id}`;
  }
}

export function navigateTop(navigate: NavigateFunction, path: string) {
  const [base, hash] = path.split("#");
  const currentBase = window.location.pathname || "/";
  const hasCurrentHash = !!window.location.hash;

  if (!hash && currentBase === (base || "/") && hasCurrentHash) {
    navigate(base || "/", { replace: true });
  } else {
    navigate(path);
  }

  requestAnimationFrame(() => {
    if (hash) {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  });
}

export const TARGETS_BY_LABEL: Record<string, string> = {
  Possibility: "smart",
  Solutions: "feature",
  "About Us": "about",
  "Privacy": "privacy",
  "Terms": "term",
  "Contact Us": "contact",
  Contact: "contact",
};

export const fallbackToId = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");