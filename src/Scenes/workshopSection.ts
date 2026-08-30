export const MIN_WORKSHOP_SECTION = 1;
export const MAX_WORKSHOP_SECTION = 7;

export type WorkshopSection = 1 | 2 | 3 | 4 | 5 | 6 | 7;

const FALLBACK_SECTION: WorkshopSection = 7;

function toWorkshopSection(value: number): WorkshopSection {
  if (value <= MIN_WORKSHOP_SECTION) return 1;
  if (value >= MAX_WORKSHOP_SECTION) return 7;
  return value as WorkshopSection;
}

export function resolveWorkshopSection(): WorkshopSection {
  let sectionCandidate: number | null = null;

  if (typeof window !== "undefined") {
    const sectionParam = new URLSearchParams(window.location.search).get(
      "section",
    );
    if (sectionParam) sectionCandidate = Number.parseInt(sectionParam, 10);
  }

  if (!sectionCandidate || Number.isNaN(sectionCandidate)) {
    const envSection = import.meta.env.VITE_WORKSHOP_SECTION;
    if (envSection) sectionCandidate = Number.parseInt(envSection, 10);
  }

  if (!sectionCandidate || Number.isNaN(sectionCandidate)) {
    return FALLBACK_SECTION;
  }

  return toWorkshopSection(sectionCandidate);
}

export function shouldEnableInspector(section: WorkshopSection): boolean {
  if (section < 6 || typeof window === "undefined") {
    return false;
  }

  const value =
    new URLSearchParams(window.location.search).get("inspector") ?? "";

  return value === "1" || value.toLowerCase() === "true";
}
