# Jubin & Anagha — Wedding Invitation

A cinematic, mobile-first invitation with two routes:

- `/wedding` — ceremony at Prince Auditorium, Kakkodi
- `/reception` — reception at Ayzen Convention Center

`/` redirects to `/wedding`.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Replaceable assets

| Asset | Path |
| --- | --- |
| Couple illustration | `public/images/couple-cartoon.png` |
| Gallery photos | `public/images/gallery/01.svg` … `06.svg` (same filenames) |
| Music | `public/music/wedding-song.mp3` |
| Names, times, venues, hashtags, copy | `lib/invitation-config.ts` |

## Guestbook (Supabase)

1. Copy `.env.example` to `.env.local` and add your project URL and anon key.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Enable Realtime for the `wishes` table if the SQL publication step is skipped.
