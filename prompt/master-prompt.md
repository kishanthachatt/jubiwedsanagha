Absolutely. Here is the **master prompt** I’d use for a coding agent such as Cursor, Claude Code, Lovable, Bolt, or similar. It is intentionally detailed so the generated application feels like a **real premium wedding invitation**, not a generic website.

---

# MASTER PROMPT — Jubin & Anagha Wedding Invitation

Build a premium, cinematic, mobile-first wedding invitation web application using **Next.js + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion**, with **Supabase** for the guestbook.

The website must feel like an **elegant Kerala wedding invitation brought to life digitally** — cinematic, emotional, sophisticated, warm, and luxurious without being overly flashy.

Do not create a generic wedding-template website. The design should feel custom-designed specifically for **Jubin & Anagha**.

---

## 1. Wedding Details

Use the following information as the source of truth.

### Couple

**Groom:** Jubin Anand  
**Bride:** Anagha

Malayalam names:

**ജുബിൻ**  
**അനഘ**

Primary couple display:

> ജുബിൻ  
> &  
> അനഘ

English:

> Jubin & Anagha

---

## 2. Two Routes

The application must have exactly two primary invitation routes:

```text
/wedding
/reception
```

These are two versions of the same invitation.

Do NOT create two completely different designs.

Build one reusable invitation system with configuration-driven content:

```ts
type InvitationConfig = {
  type: "wedding" | "reception"
  title: string
  date: string
  startTime: string
  endTime: string
  venue: string
  address: string
  mapsUrl: string
}
```

Then configure each route separately.

---

# 3. `/wedding`

### Event

**Wedding Ceremony**

**Date:** Sunday, 1 November 2026

**Muhurtham:** 11:00 AM – 11:30 AM

**Venue:** Prince Auditorium, Kakkodi

Google Maps:

```text
https://share.google/XFNsl2GVfrKfOfKlH
```

Use this route for the wedding ceremony invitation.

---

# 4. `/reception`

### Event

**Wedding Reception**

**Date:** Sunday, 1 November 2026

**Time:** 5:30 PM – 9:30 PM

**Venue:** Ayzen Convention Center

**Location:** Ambalapadi, Eranhikkal

Google Maps:

```text
https://maps.app.goo.gl/3uG8zGXJrUch9epZ6
```

---

# 5. Opening Experience

The opening screen is extremely important.

When the visitor lands on either route, do NOT immediately show the entire website.

Show a cinematic invitation cover.

Example concept:

```text
                    ✦

                  ജുബിൻ
                     &
                  അനഘ

              [couple illustration]

             With Love & Grace

          ┌─────────────────────┐
          │   OPEN INVITATION   │
          └─────────────────────┘
```

The interface should feel like opening a physical wedding invitation.

### Interaction

The user must explicitly click:

**OPEN INVITATION**

Only after this interaction should the main invitation experience begin.

On click:

1. Invitation cover gently opens.
2. Floral elements animate.
3. Couple illustration reveals.
4. Main invitation content transitions into view.
5. Background music begins.
6. Music control becomes visible.
7. Page smoothly scrolls/reveals the main content.

Do not force autoplay before user interaction.

---

# 6. Couple Illustration

Use the uploaded photograph of Jubin and Anagha as the visual reference.

Create a tasteful **premium cartoon/illustrated version of the couple** based on the supplied photograph.

The illustration should preserve recognizable characteristics such as:

- hairstyle
- facial structure
- beard
- overall appearance
- Anagha's curly hair
- clothing/color inspiration
- warm expressions

But it should NOT be photorealistic.

Style:

> elegant hand-drawn digital wedding illustration, sophisticated editorial illustration, soft textured brushwork, subtle Kerala wedding aesthetic, warm ivory background, dusty rose, plum, muted gold, soft botanical elements, romantic cinematic lighting, premium wedding stationery aesthetic

Avoid:

- childish cartoon style
- exaggerated anime
- overly saturated colors
- caricature
- cheap clip-art appearance

Create the asset as a replaceable image:

```text
/public/images/couple-cartoon.png
```

Use Malayalam names prominently with the illustration:

**ജുബിൻ & അനഘ**

---

# 7. Visual Direction

The entire website should use:

### Design style

**Elegant Kerala wedding + cinematic + subtle luxury**

Think:

- premium wedding invitation
- editorial photography
- traditional Kerala influences
- modern minimalist web design
- soft botanical details
- cinematic transitions
- luxurious typography
- generous whitespace
- emotional storytelling

Do NOT make it look like:

- a corporate website
- an Indian wedding template with excessive gold
- a colorful festival website
- a flashy animation demo

---

# 8. Color Palette

Build the complete design system around these colors:

```css
--ivory: #F2E7D8;
--cream: #FAF6EF;

--dusty-rose: #C07A67;
--deep-rose: #934E3B;
--soft-blush: #D39A88;

--champagne: #DDBD94;

--muted-mauve: #B8A0A0;

--plum: #5A3158;
--deep-plum: #3F203F;

--espresso: #3A241C;
--burgundy: #6F392E;
```

The **plum/purple** should subtly reference the bride's saree from the supplied couple photograph.

Primary background should be:

```text
warm ivory / champagne
```

Use deep brown/espresso for readable typography.

Use dusty rose, muted gold, and plum as accents.

Do not overuse gold.

---

# 9. Typography

Use a sophisticated pairing.

For display names/headings:

Elegant serif or high-contrast editorial font.

For body:

Clean readable serif/sans-serif combination.

The couple names should feel luxurious and romantic.

The Malayalam names should use a beautiful Malayalam-compatible font.

Ensure Malayalam rendering is excellent.

Do not use a font that causes broken Malayalam glyphs.

---

# 10. Main Page Structure

After opening the invitation, structure the page approximately as:

```text
Opening
↓
Couple
↓
Countdown
↓
Invitation message
↓
Event details
↓
Venue
↓
Calendar
↓
Our moments / album
↓
Hashtags
↓
Guestbook / wishes
↓
Share invitation
↓
Closing
```

Make every section transition naturally into the next.

---

# 11. Hero / Couple Section

Display:

```text
ജുബിൻ

&

അനഘ
```

Then:

```text
Jubin & Anagha
```

Include a subtle emotional invitation line.

Example:

> Two hearts, one beautiful beginning.

Do not copy this exact wording everywhere; create an elegant original message.

Use the generated illustrated couple as the primary visual.

Animation:

- slow fade
- slight scale
- floating botanical elements
- subtle parallax
- soft reveal of names

Avoid aggressive motion.

---

# 12. Countdown

Create a live countdown to:

```text
1 November 2026
```

For wedding route, the countdown should target:

```text
01 November 2026, 11:00 AM
```

For reception route:

```text
01 November 2026, 5:30 PM
```

Display:

```text
XX Days
XX Hours
XX Minutes
XX Seconds
```

Make it elegant rather than looking like a digital clock.

When the countdown reaches zero, replace it with an emotional message such as:

> The day has arrived. ❤️

Handle timezone correctly for India:

```text
Asia/Kolkata
```

---

# 13. Invitation Message

Use the emotional language of a traditional wedding invitation but modernize the presentation.

Possible structure:

```text
With the blessings of our families

we invite you to celebrate
the beginning of a beautiful journey

ജുബിൻ
&
അനഘ
```

Use animated text reveals.

Do not copy the printed invitation word-for-word.

---

# 14. Event Details

Create a premium event card.

### Wedding route

```text
THE WEDDING

Sunday
01 November 2026

11:00 AM – 11:30 AM

Prince Auditorium
Kakkodi
```

### Reception route

```text
THE RECEPTION

Sunday
01 November 2026

5:30 PM – 9:30 PM

Ayzen Convention Center
Ambalapadi, Eranhikkal
```

Include elegant icons, but keep them minimal.

---

# 15. Venue Section

Create a dedicated location section.

Show:

```text
Prince Auditorium
Kakkodi
```

for `/wedding`.

Show:

```text
Ayzen Convention Center
Ambalapadi, Eranhikkal
```

for `/reception`.

Buttons:

```text
VIEW ON GOOGLE MAPS
GET DIRECTIONS
```

Opening the buttons should use the provided Google Maps URLs.

Do not embed an ugly map iframe.

Use a premium location card with an elegant location illustration/icon.

---

# 16. Add to Calendar

Provide:

```text
Add to Calendar
```

with:

```text
Google Calendar
Apple Calendar
```

### Wedding event

```text
Title:
Jubin & Anagha — Wedding Ceremony

Date:
1 November 2026

Time:
11:00 AM – 11:30 AM

Location:
Prince Auditorium, Kakkodi
```

### Reception event

```text
Title:
Jubin & Anagha — Wedding Reception

Date:
1 November 2026

Time:
5:30 PM – 9:30 PM

Location:
Ayzen Convention Center, Ambalapadi, Eranhikkal
```

Google Calendar should generate the appropriate URL dynamically.

Apple Calendar should generate a downloadable `.ics` calendar file.

Do NOT create one static calendar file for both routes.

---

# 17. Background Music

The reference song is:

```text
https://www.youtube.com/watch?v=LRHSq0tTLB0
```

Do not scrape or download the YouTube audio.

Structure the application so the actual audio can be placed at:

```text
/public/music/wedding-song.mp3
```

Use an audio service/hook.

Behavior:

```text
Open Invitation
        ↓
User interaction
        ↓
Music begins
```

Add a subtle floating control:

```text
♪  /  🔇
```

Allow users to:

- play
- pause
- mute
- resume

Remember the music state during the session where appropriate.

Never force audio to play before the user clicks the invitation.

---

# 18. Album

Create a beautiful photo album section.

Initially use placeholders.

Expected structure:

```text
/public/images/gallery/
```

Allow placeholder images to be replaced without changing application code.

Create a responsive gallery:

Desktop:
- editorial masonry/grid layout

Mobile:
- elegant 2-column grid

Clicking an image opens a fullscreen lightbox.

Support:

- next/previous
- swipe gestures
- close
- smooth transitions

Do not use stock wedding photos.

Use neutral placeholders clearly marked for replacement.

---

# 19. Hashtags

Create a dedicated hashtag section.

Use elegant hashtags such as:

```text
#JubinWedsAnagha
#JubinAndAnagha
#JubinAnagha
#JubinWedsAnagha2026
```

Also include a Malayalam-inspired option where appropriate.

Make the hashtags configurable from the invitation configuration.

Clicking a hashtag should copy it to the clipboard.

Add a small visual feedback:

```text
Copied ✓
```

---

# 20. Guestbook / Wishes

There is NO RSVP form.

Instead create a real-time guestbook.

Section heading:

```text
Leave Us a Wish
```

Malayalam option:

```text
ഒരു ആശംസ കുറിക്കൂ
```

Form:

```text
Your Name *
Your Wishes *
```

Button:

```text
Send Wishes
```

Name must be mandatory.

Message must be mandatory.

On successful submission:

```text
Thank you for your lovely wishes ❤️
```

Display recently submitted wishes below the form.

Example:

```text
Rahul
Wishing you both a lifetime filled with happiness ❤️

Priya
Here's to a beautiful journey together!
```

Use Supabase as the backend.

Suggested table:

```sql
wishes
-------
id
name
message
created_at
```

Enable row-level security appropriately.

Public users should be able to:

- insert wishes
- read approved/public wishes

Users should NOT be able to modify or delete other people's wishes.

Add basic validation and rate limiting/anti-spam protection.

Use newest wishes first.

Animate new wishes gracefully into the list.

---

# 21. Share Invitation

Create a prominent final CTA:

```text
Share the Invitation
```

Use the Web Share API where supported.

Share message:

```text
You're invited to celebrate the wedding of Jubin & Anagha ❤️

Join us for this beautiful celebration.
```

Share the current route:

```text
/wedding
```

or

```text
/reception
```

depending on where the user is.

Fallback:

```text
Copy Invitation Link
```

Show:

```text
Link copied ✓
```

Also support WhatsApp sharing on mobile through a simple share option.

---

# 22. Closing Section

End with a beautiful emotional section.

Example:

```text
With love,
Jubin & Anagha

ജുബിൻ & അനഘ

Thank you for being part of our journey.
```

Use a subtle animated floral background.

Then:

```text
♥
```

and the wedding year:

```text
2026
```

---

# 23. Animation System

Animations are a major part of the experience.

Use **Framer Motion**.

Create a consistent animation language.

### Opening

- envelope/card opening
- floral reveal
- fade
- scale
- soft particles

### Scroll

Each section should animate when entering the viewport.

Use:

- opacity
- translateY
- scale
- blur-to-clear
- subtle parallax

Do NOT animate everything simultaneously.

### Images

Use:

- fade
- slight zoom
- clip-path reveal where appropriate

### Text

Use elegant staggered word/line reveals.

### Decorative elements

Use extremely subtle:

- floating petals
- botanical movement
- light grain
- glowing particles

Avoid excessive confetti.

---

# 24. Mobile First

This will primarily be shared through:

```text
WhatsApp
Instagram
SMS
```

and opened on mobile phones.

Mobile experience is therefore more important than desktop.

Optimize for:

- iPhone
- Android
- Safari
- Chrome mobile

The site should feel like a native invitation experience.

No horizontal scrolling.

Large touch targets.

Smooth scrolling.

Avoid tiny text.

Keep animations performant.

Respect:

```text
prefers-reduced-motion
```

and reduce animation for users who have enabled it.

---

# 25. Desktop

Desktop should still look beautiful.

Use a more cinematic composition:

```text
large couple illustration
large typography
floating botanical decorations
subtle layered backgrounds
```

But don't simply stretch the mobile layout.

Create a responsive editorial composition.

---

# 26. Image Treatment

Use the uploaded couple photograph as the reference for the couple illustration.

Do not expose the raw uploaded photo as the primary hero unless explicitly configured later.

The main experience should emphasize:

**illustration + typography + subtle photography**

rather than making the website feel like a photo gallery.

---

# 27. Floral / Decorative Design

Create subtle decorative motifs inspired by the printed invitation.

Use:

- rose petals
- muted roses
- botanical branches
- Kerala-inspired greenery
- subtle traditional decorative motifs

Do not use huge decorative flowers everywhere.

The decorations should appear to float naturally around content.

---

# 28. Navigation

Do not use a conventional large navbar.

This should feel like an invitation.

On mobile, provide a subtle floating menu if necessary:

```text
♡
```

or a minimal menu icon.

Navigation options can include:

```text
Home
Event
Venue
Album
Wishes
```

Keep it extremely subtle.

---

# 29. Technical Architecture

Use:

```text
Next.js
TypeScript
App Router
Tailwind CSS
shadcn/ui
Framer Motion
Supabase
Lucide Icons
```

Suggested structure:

```text
app/
  wedding/
    page.tsx

  reception/
    page.tsx

components/
  invitation/
    InvitationShell.tsx
    OpeningInvitation.tsx
    CoupleHero.tsx
    Countdown.tsx
    EventDetails.tsx
    VenueSection.tsx
    CalendarButtons.tsx
    MusicPlayer.tsx
    Gallery.tsx
    Hashtags.tsx
    Guestbook.tsx
    ShareInvitation.tsx
    ClosingSection.tsx

lib/
  invitation-config.ts
  calendar.ts
  share.ts
  music.ts
  utils.ts

public/
  images/
    couple-cartoon.png
    gallery/

  music/
    wedding-song.mp3
```

Use reusable components rather than duplicating `/wedding` and `/reception`.

---

# 30. Invitation Configuration

Create something like:

```ts
export const invitationConfigs = {
  wedding: {
    route: "/wedding",
    eventType: "wedding",
    title: "The Wedding",
    date: "2026-11-01",
    startTime: "11:00",
    endTime: "11:30",
    venue: "Prince Auditorium",
    location: "Kakkodi",
    mapsUrl:
      "https://share.google/XFNsl2GVfrKfOfKlH",
  },

  reception: {
    route: "/reception",
    eventType: "reception",
    title: "The Reception",
    date: "2026-11-01",
    startTime: "17:30",
    endTime: "21:30",
    venue: "Ayzen Convention Center",
    location: "Ambalapadi, Eranhikkal",
    mapsUrl:
      "https://maps.app.goo.gl/3uG8zGXJrUch9epZ6",
  },
}
```

All event-specific components should consume this configuration.

---

# 31. SEO / Sharing Metadata

Create dynamic metadata for each route.

Wedding:

```text
Jubin & Anagha — Wedding Invitation
```

Reception:

```text
Jubin & Anagha — Wedding Reception
```

Create appropriate Open Graph metadata.

Use the couple illustration as the social preview image where appropriate.

---

# 32. Performance

The website must feel extremely smooth.

Use:

- Next.js image optimization
- lazy loading for gallery images
- compressed assets
- minimal JavaScript where possible
- code splitting
- optimized animations
- no huge background video
- no unnecessarily large dependencies

The first screen should load quickly even on mobile networks.

---

# 33. Accessibility

Ensure:

- semantic HTML
- keyboard navigation
- sufficient contrast
- proper aria labels
- visible focus states
- reduced motion support
- accessible audio controls
- accessible form validation

---

# 34. Important Content Rules

Do NOT invent:

- additional wedding ceremonies
- additional dates
- additional venues
- family names
- timings
- religious rituals
- RSVP information

Use only the supplied event details.

Do not copy the physical invitation's entire text verbatim.

Use it as the reference for:

- names
- dates
- venue
- family/event context
- visual feeling

---

# 35. Final Emotional Tone

The website should communicate:

> **“This is not just a website. This feels like opening a beautiful wedding invitation.”**

The visitor should feel:

- warmth
- anticipation
- intimacy
- elegance
- celebration

The experience should be memorable but restrained.

Every animation should have a purpose.

Every section should feel connected.

---

# 36. Final Acceptance Criteria

The finished project should satisfy all of these:

```text
✓ /wedding route
✓ /reception route

✓ Opening Invitation interaction
✓ Cinematic opening animation
✓ Malayalam couple names
✓ English couple names
✓ Couple cartoon illustration
✓ Countdown
✓ Wedding/reception-specific event details
✓ Google Maps button
✓ Google Calendar
✓ Apple Calendar / .ics
✓ Background music
✓ Music play/pause/mute
✓ Album with placeholders
✓ Lightbox gallery
✓ Hashtags
✓ Copy hashtag
✓ Real Supabase guestbook
✓ Name + wishes form
✓ Public wishes display
✓ Share invitation
✓ Web Share API
✓ Copy link fallback
✓ WhatsApp share
✓ Responsive mobile-first design
✓ Desktop design
✓ Framer Motion animations
✓ Kerala-inspired visual language
✓ Ivory + dusty rose + plum + champagne palette
✓ Accessibility
✓ Reduced motion support
✓ SEO/Open Graph
✓ Performance optimization
```

---

## Couple Illustration Prompt

Use this as the **image-generation prompt** for the actual cartoon asset based on the uploaded couple photograph:

> Create an elegant premium wedding illustration of the couple shown in the reference photograph. Preserve their recognizable facial characteristics, hairstyle, beard, expressions, proportions and overall appearance while transforming them into a sophisticated hand-painted digital wedding illustration. The groom is Jubin and the bride is Anagha. Create a romantic Kerala wedding editorial aesthetic with soft textured brushwork, refined linework, warm ivory, dusty rose, muted champagne gold and deep plum accents inspired by the bride's saree. Include subtle botanical foliage, delicate flowers and a soft atmospheric glow. The couple should look natural, graceful and affectionate. Avoid childish cartoon styling, exaggerated facial features, anime styling, caricature, excessive saturation or generic stock wedding-art aesthetics. The final artwork should look like premium luxury wedding stationery and work beautifully on the opening screen of a modern cinematic wedding invitation. Include elegant Malayalam typography reading “ജുബിൻ & അനഘ” in a refined style. Vertical composition, clean background, transparent or ivory background, high resolution, web-ready.

**Reference image:** use the uploaded photograph of Jubin and Anagha as the visual reference.

---

### One thing I would keep intentionally configurable

Put these in a single configuration file so you can change them without touching the UI:

```text
Couple names
Event dates
Times
Venue
Google Maps URLs
Hashtags
Music path
Gallery images
Opening message
Guestbook title
Closing message
```

That way, this becomes a **proper reusable invitation engine**, not a one-off page.

The strongest visual direction for this particular couple is **ivory + dusty rose + deep plum + muted gold**, with the purple from Anagha's saree acting as the distinctive accent. That will tie the digital invitation directly to the photographs while still retaining the elegance of the physical invitation.