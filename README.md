# 🐾 Top Hat Ferals

A lightweight, community-driven website documenting a neighborhood feral cat colony in **Princeton, Indiana**.

This project began the way many things do: with the suspicion that _one_ cat might be overnighting in an evergreen bush, followed by educational surveillance, a small cast of recurring characters, and eventually a public website.

---

## 🌱 Mission

Top Hat Ferals exists to:

- Document sightings, interactions, and new arrivals in a local feral cat colony
- Share observations in a calm, factual, non-sensational way
- Provide a public log for neighborhood awareness
- Support humane, responsible care through observation and community discussion

This is **not** a rescue organization, enforcement body, or official authority.  
It is intentionally informal, observational, and evolutionary.

Cats are involved. Plans may change.

---

## 🧠 Philosophy

- Observe first, act thoughtfully
- Keep things simple and transparent
- Separate _discussion_ from _record keeping_
- Avoid collecting private or sensitive information
- Build tools that are easy to maintain and hard to break

The website serves as the **canonical log**.  
Conversation and participation happen primarily in the Facebook group.

---

## 🧩 Current Technology Stack

This site is intentionally built with simple, maintainable tooling.

### Frontend

- **Static site** hosted on **GitHub Pages**
- **Vanilla JavaScript** in `index.html`
- **Tailwind CSS** loaded by CDN
- Responsive, mobile-first layout
- Single-page tabbed interface
- Public feed, cats, and about views
- Admin tab for token-protected record creation and file uploads

### Backend / Data Layer

- **LabBox** backend at `https://lab.aismallbizguru.com/api`
- App/resource namespace: `top-hat-ferals`
- Resources currently used:
  - `cats`
  - `sightings`
  - `interactions`
- Public reads for displayed colony data
- Token-protected writes for admin actions
- File upload support through LabBox where applicable
- SQLite-backed records on the LabBox side
- Object/file storage handled by LabBox where applicable

### Analytics

- Anonymous pageview analytics through **Analytics Lite / JunkStats**
- Tracker script hosted from `https://hmarquardt.github.io/junkdrawer/analytics-lite.js`
- `site_id`: `top-hat-ferals`
- Collection endpoint: `https://lab.aismallbizguru.com/api/analytics/collect`
- No cookies
- No form-field collection
- No private user tracking
- Analytics dashboarding is handled separately by Junk Drawer / JunkStats, not in this repo

---

## 🔄 Data Flow

Public site:

```text
LabBox SQLite records + files
↓
LabBox API
↓
GitHub Pages frontend
↓
Public website
```

Admin actions:

```text
Admin tab + bearer token
↓
LabBox API
↓
SQLite records / file storage
```

Analytics:

```text
GitHub Pages frontend
↓
Analytics Lite / JunkStats tracker
↓
LabBox analytics collect endpoint
```

---

## 🐱 Content Model

- **Cats** represent known regulars and occasional visitors shown from recorded activity
- **Sightings** drive the public timeline, carousel, and cat roster recency
- **Interactions** provide additional narrative context around observed events
- Public views are rendered from LabBox resource records

---

## 🔐 Admin Workflow

The admin tab supports creating records and uploading files through LabBox. Admin actions require a LabBox bearer token.

The token is entered in the browser and stored locally in `localStorage` under this site's storage key. It is not committed to the repository and should not be used on shared or public computers.

Do not document or commit the actual token.

---

## 🔒 Privacy Notes

- Public-facing records should avoid private, sensitive, or personally identifying information
- Analytics is anonymous pageview analytics
- The analytics tracker does not create cookies
- The tracker does not collect form-field values
- Admin bearer tokens live only in local browser storage and should be treated carefully
- Photos and updates are shared for neighborhood awareness and humane observation

---

## 🌐 Community

Discussion, photos, and neighbor contributions happen in the Facebook group:

👉 https://www.facebook.com/groups/1221101296133898

The site logs what happens.  
The group talks about it.

---

## 🚧 Future Possibilities

This project may evolve to include:

- Improved data visualization
- Better tooling for submissions
- Educational resources
- Possibly a small, locally appropriate TNR effort

Or it may simply continue documenting what the cats decide to do next.

---

## ⚖️ Disclaimer

This site is provided for informational and community purposes only.
It does not represent professional advice, official policy, or authority.
All observations are community-sourced and informal.

---

## 🐾 Credits

Built with:

- GitHub Pages
- LabBox
- Tailwind CSS
- Analytics Lite / JunkStats

Maintained by neighbors.

Directed by cats.
