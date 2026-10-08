export type InvitationType = "wedding" | "reception";

export type GalleryItem = {
  src: string;
  alt: string;
};

export type InvitationConfig = {
  type: InvitationType;
  route: `/${InvitationType}`;
  title: string;
  seoTitle: string;
  seoDescription: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  location: string;
  mapsUrl: string;
  calendarTitle: string;
  hashtags: string[];
  openingLine: string;
  heroLine: string;
  invitationEyebrow: string;
  invitationBody: string;
  guestbookTitle: string;
  guestbookTitleMl: string;
  closingMessage: string;
  musicPath: string;
  coupleIllustration: string;
  gallery: GalleryItem[];
};

export const couple = {
  groomEn: "Jubin",
  brideEn: "Anagha",
  groomMl: "ജുബിൻ",
  brideMl: "അനഘ",
  displayEn: "Jubin & Anagha",
  displayMl: "ജുബിൻ & അനഘ",
} as const;

export const site = {
  year: "2026",
  timezone: "Asia/Kolkata",
  shareMessage:
    "You're invited to celebrate the wedding of Jubin & Anagha ❤️\n\nJoin us for this beautiful celebration.",
} as const;

const gallery: GalleryItem[] = [
  { src: "/images/gallery/01.svg", alt: "Replace with a photo of Jubin and Anagha" },
  { src: "/images/gallery/02.svg", alt: "Replace with a photo of Jubin and Anagha" },
  { src: "/images/gallery/03.svg", alt: "Replace with a photo of Jubin and Anagha" },
  { src: "/images/gallery/04.svg", alt: "Replace with a photo of Jubin and Anagha" },
  { src: "/images/gallery/05.svg", alt: "Replace with a photo of Jubin and Anagha" },
  { src: "/images/gallery/06.svg", alt: "Replace with a photo of Jubin and Anagha" },
];

const shared = {
  date: "2026-11-01",
  openingLine: "With Love & Grace",
  heroLine: "A quiet kind of forever begins here.",
  invitationEyebrow: "With the blessings of our families",
  invitationBody:
    "we invite you to celebrate the beginning of a beautiful journey",
  guestbookTitle: "Share Your Blessings",
  closingMessage: "Thank you for being part of our journey.",
  musicPath: "/music/wedding-song.mp3",
  coupleIllustration: "/images/couple-palace.jpg",
  gallery,
  hashtags: [
    "#JubinWedsAnagha",
    "#JubinAndAnagha",
    "#JubinAnagha",
    "#JubinWedsAnagha2026",
    "#ജുബിനനഘ",
  ],
} satisfies Partial<InvitationConfig>;

export const invitationConfigs: Record<InvitationType, InvitationConfig> = {
  wedding: {
    ...shared,
    type: "wedding",
    route: "/wedding",
    title: "The Wedding",
    seoTitle: "Jubin & Anagha — Wedding Invitation",
    seoDescription:
      "You are invited to the wedding ceremony of Jubin and Anagha on 1 November 2026 at Prince Auditorium, Kakkodi.",
    startTime: "11:00",
    endTime: "11:30",
    venue: "Prince Auditorium",
    location: "Kakkodi",
    mapsUrl: "https://share.google/XFNsl2GVfrKfOfKlH",
    calendarTitle: "Jubin & Anagha — Wedding Ceremony",
  },
  reception: {
    ...shared,
    type: "reception",
    route: "/reception",
    title: "The Reception",
    seoTitle: "Jubin & Anagha — Wedding Reception",
    seoDescription:
      "You are invited to the wedding reception of Jubin and Anagha on 1 November 2026 at Ayzen Convention Center, Ambalapadi, Eranhikkal.",
    startTime: "17:30",
    endTime: "21:30",
    venue: "Ayzen Convention Center",
    location: "Ambalapadi, Eranhikkal",
    mapsUrl: "https://maps.app.goo.gl/3uG8zGXJrUch9epZ6",
    calendarTitle: "Jubin & Anagha — Wedding Reception",
  },
};

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
}

export function getEventDateTime(config: InvitationConfig) {
  return {
    start: new Date(`${config.date}T${config.startTime}:00+05:30`),
    end: new Date(`${config.date}T${config.endTime}:00+05:30`),
  };
}

export function formatEventDate() {
  return "Sunday, 01 November 2026";
}

export function formatTimeRange(config: InvitationConfig) {
  const format = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12;
    return `${hour12}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  return `${format(config.startTime)} – ${format(config.endTime)}`;
}
