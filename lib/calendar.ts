import type { InvitationConfig } from "@/lib/invitation-config";
import { couple, site } from "@/lib/invitation-config";

function compactStamp(date: Date) {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;
}

function localStamp(time: string) {
  return `20261101T${time.replace(":", "")}00`;
}

export function googleCalendarUrl(config: InvitationConfig) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: config.calendarTitle,
    dates: `${localStamp(config.startTime)}/${localStamp(config.endTime)}`,
    ctz: site.timezone,
    location: `${config.venue}, ${config.location}`,
    details: `${couple.displayEn}\n${config.title}\n${config.venue}, ${config.location}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function icsContent(config: InvitationConfig) {
  const uid = `${config.type}-jubin-anagha@invitation`;
  const stamp = compactStamp(new Date());
  const location = `${config.venue}, ${config.location}`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Jubin Weds Anagha//Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VTIMEZONE",
    `TZID:${site.timezone}`,
    "BEGIN:STANDARD",
    "DTSTART:19700101T000000",
    "TZOFFSETFROM:+0530",
    "TZOFFSETTO:+0530",
    "TZNAME:IST",
    "END:STANDARD",
    "END:VTIMEZONE",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=${site.timezone}:${localStamp(config.startTime)}`,
    `DTEND;TZID=${site.timezone}:${localStamp(config.endTime)}`,
    `SUMMARY:${config.calendarTitle}`,
    `LOCATION:${location}`,
    `DESCRIPTION:Celebrate with ${couple.displayEn}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadIcs(config: InvitationConfig) {
  const blob = new Blob([icsContent(config)], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `jubin-anagha-${config.type}.ics`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
