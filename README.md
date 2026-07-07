# ZaraiLink: Demo

A fabricated, interactive walkthrough of ZaraiLink's actual screens (the
post-login search dashboard, search results with a token-gated trade
dashboard, the Trade Directory, a company profile with contact unlocking, and
subscription plans), built so the product can be seen working without
exposing the real system, which is private.

## Why this exists

ZaraiLink is a three-person final-year team project: a Django/DRF backend and
React frontend with an NLU pipeline, hybrid retrieval, and a learning-to-rank
model over real Pakistani customs trade data. Salman Adnan led it (64 of 97
commits), but Umar Kashif and Fahad Nadeem wrote real, substantial parts of it
too, so publishing the full source isn't a call one team member can make
alone without the others' consent. This demo exists to give hiring panels
something real to click through in the meantime: the actual screens and
interaction patterns, replayed against fabricated companies and contacts.

## What it is

A multi-screen static page that reproduces the real app's actual navigation
and component structure, read directly from its source, not a single linear
flow:

- **Dashboard**: the real post-login search home (`components/Dashboard/
  Dashboard.js`): the "4 Ways to Search" method card, a live search-mode
  detector (HS code / product / AI query), an Import/Export scope toggle,
  quick-suggestion pills, a stats strip, and a features grid.
- **Search results** (`components/Search/DataDashboard.js`): a sticky dark
  header, a "Refine by Product" sidebar, four trade-direction pills (Foreign
  Suppliers / Foreign Buyers / Pakistani Buyers / Pakistani Suppliers), result
  cards with locked/blurred actions, and a token-gated "Unlock Category
  Intelligence" paywall banner.
- **Trade Directory** (`components/TradeDirectory/FindSuppliers.js`/
  `FindBuyers.js`): a searchable grid of company cards with country/sector/
  type badges, a "Verified Contacts" badge, and a watchlist star toggle.
- **Company Profile** (`components/TradeDirectory/CompanyProfile.js`): stats
  grid, products dealt in, and the real contact-unlock UI: masked/blurred
  phone, email, and WhatsApp rows per contact, a seniority badge derived from
  each contact's title, and a confirm → success modal flow that spends one
  token and reveals the real fabricated fields.
- **Watchlist**: starred companies from the Trade Directory.
- **Subscription** (`components/Subscriptions/Subscription.js`): plan cards
  with token allotments and feature lists.

Nothing here is computed or called over a network.

## Features

- **Dark slate navbar** matching the real `Navbar.js`: emerald logo mark, an
  "Intelligence" dropdown with Find Suppliers/Find Buyers, a token-balance
  pill, and a gradient user avatar.
- **Live search-mode detection**: typing a query flips a colored pill between
  HS Code Mode, Product Search, and AI Query Mode using the same detection
  logic as the real Dashboard (numeric input → HS code; scope selected → AI
  query; otherwise product search).
- **Token-gated unlocking at two levels**, matching the real app: unlocking a
  whole result category in Search Results, and unlocking one contact at a
  time in a Company Profile, each with its own confirm/success modal and real
  token deduction.
- **Masked contact data**: locked phone numbers and emails render through the
  same masking pattern as the real `maskValue()` (`x•••••@domain`,
  `+xx ••••-•••••••`) plus a CSS blur, and flip to real fabricated values only
  after unlocking that specific contact.
- **Trade-direction pills** that filter the same fabricated company set by
  country, mirroring the real Import/Export × Foreign/Pakistani logic.

## Architecture

Plain HTML, CSS, and vanilla JavaScript. No build step, no framework, no
backend, no network calls. `demo-data.js` holds the fabricated companies (each
with products, trade stats, and contacts), subscription plans, and search
metadata; `app.js` drives view routing, the search-mode detector, the
trade-direction pill filtering, the contact-unlock modal flow, and the
watchlist; `styles.css` reproduces the real app's actual color tokens (from
its `index.css` `:root` block) and component layouts (navbar, Dashboard
hero, Data Dashboard, company cards, contact cards) read directly from its
React source, not just its colors. This is visual design language any
browser loading the real app already renders, not its private backend logic.
The real app loads 'Inter' from Google Fonts; this demo stays fully
self-contained and offline, so it falls back to the closest system font
instead of fetching that externally.

## Setup

None. Open `index.html` in a browser, or serve the folder with any static
file server.

## Usage

Start on the Dashboard, type a query (try a number to see HS Code Mode) and
search, or jump straight to the Trade Directory from the nav. From a company
card, click "View Profile & Contacts" to see the real unlock flow: click
"Unlock Contact Details," confirm, and watch that one contact's masked rows
turn into real fabricated data while every other contact on the page stays
locked.

## Challenges

- **Rebuilding from a first pass that only matched colors.** An earlier
  version of this demo reused the real app's palette but invented its own,
  much simpler layout (a single search-to-ledger flow). Once it was clear
  that didn't read as the real product, this version was rebuilt screen by
  screen from the actual component source instead: the real navbar
  structure, the real Dashboard's method card and mode detection, the real
  Data Dashboard's sidebar and pills, and the real Company Profile's
  masked-contact pattern.
- **Reproducing per-contact unlock state, not a single locked/unlocked
  toggle.** The real `CompanyProfile.js` unlocks contacts individually; a
  demo that unlocked "the company" as one unit would misrepresent the actual
  token economy. Each contact in `demo-data.js` carries its own `unlocked`
  flag, and only the confirmed contact flips.
- **Representing a team project's feature honestly.** The unlock mechanics,
  the Data Dashboard's trade-direction pills, and the masking pattern are
  real, named parts of the shared codebase; this demo shows them working
  without claiming sole authorship of the parts built by the other two team
  members.

## What I learned

Matching a product's color palette is a much lower bar than matching its
actual information architecture: the real signal of "this looks like the
real thing" comes from screen structure and interaction state (what's locked,
what's masked, what a pill filter actually does), not from get the right blue.

## What I'd do differently

The real app's Trade Intelligence cluster (link prediction, node2vec
similar-company matching, the GNN graph work the source README highlights)
isn't represented here; only the search, directory, profile, and
subscription screens are. That cluster is the product's most technically
distinctive piece and would be the natural next screen to add.
