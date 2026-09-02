# Gareth Reuben // Lapras — Portfolio Site

A retro PS1/PS2-style "file select" portfolio. No coding knowledge needed to
update it — just edit two spots and swap images.

## What's in this folder

```
index.html          the page itself (structure, bio, contact links)
css/style.css        all the colors, fonts, spacing
js/works-data.js     <-- your work entries live here (easiest file to edit)
js/main.js           the logic that builds the site (you shouldn't need to touch this)
assets/works/        your images and videos, sorted into subfolders:
  digital-art/               illustration, character art, 3D
  branding-merch-product/    branding, merch, product/graphic design
  music-band-merch/          band and music artwork
```

## The 3 things you'll actually want to edit

### 1. Add or edit a work in `js/works-data.js`
Open that file in any text editor (even Notepad or TextEdit). Each piece of
work looks like this:

```js
{
  id: 'watering',
  title: 'Watering',
  type: 'Digital art',
  client: 'Personal work',
  year: '2025',
  role: 'Digital painting',
  desc: 'A short description of the piece.',
  img: 'assets/works/digital-art/watering.jpg',
  vertical: true,           // true if the image is taller than it is wide
  link: '',                 // optional: ArtStation/Instagram url, or leave as ''
  linkLabel: '',             // optional: text on the link button, e.g. 'Band social — Instagram'
  video: ''                 // optional: path to a short mp4 (breakdown, flythrough), or leave as ''
}
```

`role` is what you actually did on the piece — modelling, texturing,
lighting, illustration, lettering, whatever applies. List as many as fit.

**On videos:** keep each `video` specific to the one piece it belongs to.
Don't point two entries at the same video file, or reuse one across
pieces — the popup only shows what's listed on that entry.

To add a new piece, copy one whole `{ ... }` block, paste it before the
closing `];`, and edit the values. Don't forget the comma between entries.

**How folders work:** the "Work" section automatically groups pieces by
their `type` field into clickable folder tiles — one tile per unique
`type` value, with a live count. Add a new `type` you haven't used before
(e.g. `'3D environments'`) and it becomes its own folder automatically,
no other edits needed. Click a folder to see everything inside it; click
"All categories" to go back.

### 2. Swap or add images in `assets/works/`
Just drop your image file in that folder, then point `img:` at it, e.g.
`img: 'assets/works/my-new-piece.jpg'`. Keep images under ~2MB each so the
site loads fast — most phone/export tools have a "compress" or "web"
export option.

**More than one image on a post?** Use `images` instead of `img`:
```js
images: [
  'assets/works/branding-merch-product/beauty_ashes_1.jpg',
  'assets/works/branding-merch-product/beauty_ashes_mockup.jpg'
],
```
The first image shown becomes the main one, and a row of clickable
thumbnails appears underneath for the rest — a click swaps the main
image without closing the popup. There's a ready commented-out example
on the Beauty For Ashes entry in `works-data.js` showing exactly this.

### 3. Your bio in `index.html`
Search `index.html` for `about__bio` — that's the paragraph with your bio.
Your email and Instagram links in the contact section are already filled
in, but you can change them any time (search for `mailto:` and
`instagram.com`).

## Previewing it before you publish

Just double-click `index.html` — it'll open in your browser. That's it,
no server or install needed.

## Publishing it for free with GitHub Pages

You don't need to know git or coding for this part either.

1. Go to [github.com](https://github.com) and create a free account if you
   don't have one.
2. Click the **+** icon top-right → **New repository**.
3. Name the repository exactly: `yourusername.github.io` (replace
   `yourusername` with your actual GitHub username — this exact naming is
   what makes GitHub host it as a live website).
4. Set it to **Public**, then click **Create repository**.
5. On the next page, click **uploading an existing file**.
6. Drag this entire `portfolio` folder's contents (index.html, css/, js/,
   assets/, README.md) into the upload box — make sure `index.html` ends up
   at the top level of the repo, not inside an extra folder.
7. Scroll down, click **Commit changes**.
8. Go to the repo's **Settings** tab → **Pages** (left sidebar) → under
   "Branch" choose `main` and `/ (root)` → **Save**.
9. Wait a minute or two, then visit `https://yourusername.github.io` —
   your site is live.

Any time you want to update it, go back to the repo, click a file, click
the pencil (edit) icon, make your change, and commit. For images, use
"Add file" → "Upload files".
