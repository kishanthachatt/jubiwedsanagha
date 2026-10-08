import { site } from "@/lib/invitation-config";

export function invitationUrl(route: string) {
  if (typeof window === "undefined") return route;
  return `${window.location.origin}${route}`;
}

export async function shareInvitation(route: string) {
  const url = invitationUrl(route);
  const payload = {
    title: "Jubin & Anagha",
    text: site.shareMessage,
    url,
  };

  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share(payload);
      return "shared" as const;
    } catch {
      return "cancelled" as const;
    }
  }

  await navigator.clipboard.writeText(url);
  return "copied" as const;
}

export function whatsappShareUrl(route: string) {
  const url = invitationUrl(route);
  const text = `${site.shareMessage}\n\n${url}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export async function copyText(value: string) {
  await navigator.clipboard.writeText(value);
}
