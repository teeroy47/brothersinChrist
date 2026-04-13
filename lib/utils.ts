export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function formatDateLabel(value: string) {
  return new Intl.DateTimeFormat("en-ZA", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
}

export function percent(value: number, target: number) {
  return Math.max(0, Math.min(100, Math.round((value / target) * 100)));
}
