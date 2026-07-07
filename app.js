// Scripted search-to-ledger walkthrough. No network calls anywhere in this file.

function escapeHtml(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

let tokenBalance = DEMO.tokens.balance;

function renderTokenBalance() {
  document.getElementById("token-balance").textContent = tokenBalance;
  document.getElementById("token-balance-2").textContent = tokenBalance;
}

function renderParse() {
  const el = document.getElementById("parse-body");
  const p = DEMO.parse;
  el.innerHTML = `
    <div class="intent-row">
      <span class="pill is-intent">Intent: ${escapeHtml(p.intent)}</span>
    </div>
    <div class="entity-grid">
      ${Object.entries(p.entities).map(([k, v]) => `
        <div class="entity">
          <div class="k">${escapeHtml(k.replace(/_/g, " "))}</div>
          <div class="v">${escapeHtml(v)}</div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderCompanies() {
  const el = document.getElementById("company-list");
  el.innerHTML = DEMO.companies.map((c, i) => `
    <div class="company" id="company-${i}">
      <div class="company__body">
        <div class="company__head">
          <span class="company__avatar" aria-hidden="true">${escapeHtml(c.name.charAt(0))}</span>
        </div>
        <div class="company__name">${escapeHtml(c.name)}</div>
        <div class="company__badges">
          <span class="badge">&#128205; ${escapeHtml(c.country)}</span>
          <span class="badge">&#127991; ${escapeHtml(c.sector)}</span>
          <span class="badge">&#127970; ${escapeHtml(c.type)}</span>
          ${c.verified ? `<span class="badge is-verified">&#9989; Verified</span>` : ""}
          <span class="badge">${escapeHtml(c.tag)}</span>
        </div>
        <div class="company__stats">
          <div class="company__stat"><b>${escapeHtml(c.volume)}</b><span>Volume</span></div>
          <div class="company__stat"><b>${escapeHtml(c.avg_price)}</b><span>Avg. price</span></div>
          <div class="company__stat"><b>${escapeHtml(c.partners)}</b><span>Partners</span></div>
          <div class="company__stat"><b>${escapeHtml(c.growth)}</b><span>Growth</span></div>
        </div>
      </div>
      <div class="company__footer">
        <div class="company__contact-info" id="contact-${i}">
          ${c.unlocked
            ? `<b>${escapeHtml(c.contact.name)}</b><br>${escapeHtml(c.contact.email)} &middot; ${escapeHtml(c.contact.phone)}`
            : `Contact details locked`}
        </div>
        <button class="company__view-btn" data-unlock="${i}" ${c.unlocked ? "disabled" : ""}>
          ${c.unlocked ? "Contacts Unlocked" : "View Profile & Contacts (1 token)"}
        </button>
      </div>
    </div>
  `).join("");
}

function renderLedger() {
  const l = DEMO.ledger;
  document.getElementById("ledger-title").textContent = "Trade Ledger: " + l.company;
  document.getElementById("ledger-sub").textContent = "Aggregated from customs transaction history (fabricated for this demo).";
  document.getElementById("ledger-body").innerHTML = `
    <div class="ledger-grid">
      <div class="ledger-stat"><b>${escapeHtml(l.total_volume)}</b><span>Total volume</span></div>
      <div class="ledger-stat"><b>${escapeHtml(l.avg_price_trend)}</b><span>Avg. price trend</span></div>
      <div class="ledger-stat"><b>${escapeHtml(l.top_partners)}</b><span>Top partners</span></div>
      <div class="ledger-stat"><b>${escapeHtml(l.growth)}</b><span>Growth</span></div>
    </div>
  `;
}

function unlockContact(idx) {
  if (tokenBalance <= 0) return;
  const c = DEMO.companies[idx];
  if (c.unlocked) return;
  tokenBalance -= 1;
  c.unlocked = true;
  c.contact = {
    name: ["Elena Marsh", "Rui Tanaka", "Priya Nair"][idx % 3],
    email: `contact@${c.name.toLowerCase().replace(/[^a-z0-9]+/g, "")}.example.com`,
    phone: "+1 (555) 01" + (20 + idx) + "-00" + (idx + 1)
  };
  renderTokenBalance();
  renderCompanies();
}

function runSearch() {
  const btn = document.getElementById("search-btn");
  btn.disabled = true;
  document.getElementById("parse-stage").classList.remove("is-visible");
  document.getElementById("results-stage").classList.remove("is-visible");
  document.getElementById("ledger-stage").classList.remove("is-visible");

  setTimeout(() => {
    renderParse();
    document.getElementById("parse-stage").classList.add("is-visible");
    document.getElementById("parse-stage").scrollIntoView({ behavior: "smooth", block: "start" });
  }, 500);

  setTimeout(() => {
    renderCompanies();
    document.getElementById("results-stage").classList.add("is-visible");
  }, 1400);

  setTimeout(() => {
    renderLedger();
    document.getElementById("ledger-stage").classList.add("is-visible");
    btn.disabled = false;
  }, 2200);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("query-input").value = DEMO.query;
  renderTokenBalance();
  document.getElementById("search-btn").addEventListener("click", runSearch);
  document.getElementById("company-list").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-unlock]");
    if (!btn) return;
    unlockContact(Number(btn.dataset.unlock));
  });
});
