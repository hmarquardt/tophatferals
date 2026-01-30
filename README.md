# 🐾 Top Hat Ferals

A lightweight, community-driven website documenting a neighborhood feral cat colony in **Princeton, Indiana**.

This project began the way many things do: with the suspicion that _one_ cat might be overnighting in an evergreen bush… and escalated into educational surveillance, a small cast of recurring characters, and eventually a website.

---

## 🌱 Mission

Top Hat Ferals exists to:

- Document sightings, interactions, and new arrivals in a local feral cat colony
- Share observations in a calm, factual, non-sensational way
- Provide a public, read-only log for neighborhood awareness
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

## 🧩 Technology Stack

This site is intentionally built using **minimal infrastructure**:

### Frontend

- **Static site** hosted on **GitHub Pages**
- **Tailwind CSS** for styling
- Vanilla JavaScript (no frameworks)
- Responsive, mobile-first layout with tab-based navigation

### Data Layer

- **Google Sheets** as a lightweight CMS
  - Tabs for:
    - Cats
    - Sightings
    - Interactions
    - New Arrivals
- **Google Apps Script** exposes a read-only JSON endpoint
- No authentication required for public data
- No private or personally identifying information stored

### Assets

- Images hosted directly in the GitHub repository
- Organized by category (`assets/images/cats`, `banners`, etc.)
- No third-party image hosting required

---

## 🔄 Data Flow (High Level)

Google Sheets
↓
Apps Script (JSON endpoint)
↓
GitHub Pages (fetch + render)
↓
Public Website

This approach keeps costs at **$0**, avoids backend servers, and allows non-technical updates via Google Sheets.

---

## 🐱 Content Model (Overview)

- **Cats** appear on the site once they have at least one confirmed sighting
- **Sightings** drive visibility and recency
- **Interactions** and **New Arrivals** provide narrative context
- The site updates automatically as the Sheet changes

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
- Google Sheets
- Google Apps Script
- Tailwind CSS

Maintained by neighbors.
Directed by cats.
