import type { Metadata } from "next";
import { getSiteUrl, type InvitationConfig } from "@/lib/invitation-config";

export function invitationMetadata(config: InvitationConfig): Metadata {
  const url = `${getSiteUrl()}${config.route}`;
  const image = `${getSiteUrl()}${config.coupleIllustration}`;

  return {
    title: config.seoTitle,
    description: config.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      title: config.seoTitle,
      description: config.seoDescription,
      url,
      siteName: "Jubin & Anagha",
      type: "website",
      locale: "en_IN",
      images: [{ url: image, width: 1200, height: 1600, alt: "Jubin & Anagha" }],
    },
    twitter: {
      card: "summary_large_image",
      title: config.seoTitle,
      description: config.seoDescription,
      images: [image],
    },
  };
}
