# ZaraiLink — Demo

A fabricated, interactive walkthrough of ZaraiLink's core search-to-ledger
flow, built so the product can be seen working without exposing the real
system, which is private.

## Why this exists

ZaraiLink is a three-person final-year team project: a Django/DRF backend and
React frontend with an NLU pipeline, hybrid retrieval, and a learning-to-rank
model over real Pakistani customs trade data. Salman Adnan led it (64 of 97
commits), but Umar Kashif and Fahad Nadeem wrote real, substantial parts of it
too, so publishing the full source isn't a call one team member can make
alone without the others' consent. This demo exists to give hiring panels
something real to click through in the meantime: the actual search, ranking,
and trade ledger flow, replayed against fabricated companies.

## What it is

A single static page. The search box is pre-filled with the same example
query style used in the real project's own README ("find me dextrose
suppliers from Brazil under $800/MT"). Clicking "Search" reveals, in
sequence: the parsed intent and extracted entities, a ranked list of three
fabricated companies with trade-history stats, a token-gated contact unlock
per company, and a Trade Ledger detail view for one of them. Nothing here is
computed or called over a network.

## Features

- Query understanding stage showing intent classification (BUY/SELL) and
  entity extraction (product, origin country, price constraint), matching
  the real pipeline's actual output shape.
- Ranked company results with trade volume, average price, partner count,
  and growth, plus a "similar company" tag matching the real system's
  node2vec-based matching feature.
- A working token-gated "Unlock contact" button per company: clicking it
  spends one fabricated token and reveals a fabricated contact, matching the
  real product's token-economy mechanic.
- A Trade Ledger card aggregating one company's fabricated activity, matching
  the real feature's real name and purpose.
- Styled with the real, public design tokens (emerald primary color, card
  radius, shadows, Inter font) read directly off this project's own
  frontend static CSS, since that's the visual design any browser loading
  the real app already renders, not its private backend logic.

## Architecture

Plain HTML, CSS, and vanilla JavaScript. No build step, no framework, no
backend, no network calls. `demo-data.js` holds the fabricated query, parse
result, companies, and ledger data; `app.js` drives the staged reveal and the
token-unlock interaction; `styles.css` uses the real app's own color, radius,
and shadow values (copied from its `:root` block) so the demo reads as a
genuine preview of the real product, not a generic mockup. The real app loads
'Inter' from Google Fonts; this demo stays fully self-contained and offline,
so it falls back to the closest system font instead of fetching that
externally.

## Setup

None. Open `index.html` in a browser, or serve the folder with any static
file server.

## Usage

Click "Search" and watch the query-understanding, ranked-results, and
trade-ledger sections reveal in sequence. Click "Unlock contact" on any
company to spend a token and reveal a fabricated contact.

## Challenges

- **Reusing a real example query without reusing real data.** The search
  query itself is the exact style used in the real project's own public
  README, since that's already disclosed and safe; the companies it returns
  had to be entirely invented instead of drawn from the real customs dataset.
- **Representing a team project's feature honestly.** The token-unlock and
  Trade Ledger mechanics are real, named features from the shared codebase;
  this demo shows them working without claiming sole authorship of the parts
  built by the other two team members.

## What I learned

A team project's consent problem is different from a solo production
project's confidentiality problem, and the fix looks different too: here, the
same UI mechanics could be shown safely because the risk was attribution, not
secrecy, so the demo could stay closer to the real feature set than a
demo built for a live production system would.

## What I'd do differently

The real system's HS-code search and admin dashboard aren't represented here;
only the natural-language search-to-ledger path is. Skipped to keep one flow
complete rather than three flows partially built.
