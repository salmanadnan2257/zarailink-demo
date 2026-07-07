// Fabricated demo data. No real companies, no real customs/trade data, no live calls.

const DEMO = {
  query: "find me dextrose suppliers from Brazil under $800/MT",

  parse: {
    intent: "BUY",
    entities: {
      product: "Dextrose",
      origin_country: "Brazil",
      price_constraint: "< $800/MT",
      role: "Supplier"
    }
  },

  companies: [
    {
      name: "Meridian AgroTrade Ltd.",
      tag: "Similar company match",
      country: "Brazil",
      sector: "Sweeteners",
      type: "Manufacturer",
      verified: true,
      volume: "4,120 MT",
      avg_price: "$742/MT",
      partners: "18",
      growth: "+12%",
      contact: { name: "Locked", email: "Locked", phone: "Locked" },
      unlocked: false
    },
    {
      name: "Cascade Commodities Group",
      tag: "Top ranked",
      country: "Brazil",
      sector: "Sweeteners",
      type: "Trading House",
      verified: true,
      volume: "2,860 MT",
      avg_price: "$768/MT",
      partners: "11",
      growth: "+6%",
      contact: { name: "Locked", email: "Locked", phone: "Locked" },
      unlocked: false
    },
    {
      name: "Sable Harvest Exports",
      tag: "Similar company match",
      country: "Brazil",
      sector: "Sweeteners",
      type: "Exporter",
      verified: false,
      volume: "1,530 MT",
      avg_price: "$791/MT",
      partners: "7",
      growth: "-2%",
      contact: { name: "Locked", email: "Locked", phone: "Locked" },
      unlocked: false
    }
  ],

  ledger: {
    company: "Cascade Commodities Group",
    total_volume: "2,860 MT",
    avg_price_trend: "$768/MT (down 3% vs. last quarter)",
    top_partners: "11 active",
    growth: "+6% YoY"
  },

  tokens: { balance: 5 }
};
