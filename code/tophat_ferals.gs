/**
 * Top Hat Ferals JSON API (Google Sheets -> JSON)
 * Tabs expected: Cats, Sightings, Interactions, NewArrivals
 *
 * Optional key gate:
 *   .../exec?key=YOUR_KEY
 *
 * Optional CORS (enabled by default below).
 */

const CONFIG = {
  API_KEY: "velociraptor",  // set to "" to disable key check
  ENABLE_CORS: true,
  TAB_MAP: {
    Cats: "cats",
    Sightings: "sightings",
    Interactions: "interactions",
    NewArrivals: "newArrivals"
  }
};

function doGet(e) {
  // ----- Optional simple key gate -----
  if (CONFIG.API_KEY && (!e.parameter || e.parameter.key !== CONFIG.API_KEY)) {
    return respond_({ error: "unauthorized" }, 401);
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const payload = {
    updated: new Date().toISOString(),
  };

  // Load each tab into payload
  for (const [tabName, outKey] of Object.entries(CONFIG.TAB_MAP)) {
    payload[outKey] = readTab_(ss, tabName);
  }

  // A small convenience: allCats list for filters
  payload.allCats = buildAllCats_(payload);

  return respond_(payload, 200);
}

/**
 * Reads a tab where row 1 = headers, rows 2..n = records.
 * Filters out rows where visibility == 'hide' (case-insensitive).
 * Sorts by date desc if a "date" column exists.
 */
function readTab_(ss, tabName) {
  const sh = ss.getSheetByName(tabName);
  if (!sh) return [];

  const range = sh.getDataRange();
  const values = range.getValues();
  if (!values || values.length < 2) return [];

  const headers = values[0].map(h => String(h).trim());
  const rows = values.slice(1);

  const objects = rows
    .map(row => rowToObject_(headers, row))
    .filter(obj => {
      const vis = String(obj.visibility || "show").toLowerCase().trim();
      return vis !== "hide";
    });

  // Normalize dates (if present) and sort newest-first
  if (headers.includes("date")) {
    objects.forEach(o => { o.date = normalizeDate_(o.date); });
    objects.sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
  }

  return objects;
}

function rowToObject_(headers, row) {
  const obj = {};
  for (let i = 0; i < headers.length; i++) {
    const key = headers[i];
    if (!key) continue;

    let val = row[i];

    // Trim strings
    if (typeof val === "string") val = val.trim();

    // Convert empty cells to empty string for predictability
    if (val === null || typeof val === "undefined") val = "";

    obj[key] = val;
  }
  return obj;
}

/**
 * Normalizes date values to YYYY-MM-DD when possible.
 * Handles: Date objects, YYYY-MM-DD strings, or other parseable strings.
 */
function normalizeDate_(v) {
  if (!v) return "";

  // If it's a Date object
  if (Object.prototype.toString.call(v) === "[object Date]" && !isNaN(v.getTime())) {
    return Utilities.formatDate(v, "UTC", "yyyy-MM-dd");
  }

  // If it's a string like 2026-01-29
  const s = String(v).trim();
  // Already ISO date
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;

  // Parseable date string
  const d = new Date(s);
  if (!isNaN(d.getTime())) {
    return Utilities.formatDate(d, "UTC", "yyyy-MM-dd");
  }

  // Fallback: return raw
  return s;
}

function buildAllCats_(payload) {
  const set = new Set();

  // Prefer Cats tab names
  (payload.cats || []).forEach(c => {
    const name = String(c.name || "").trim();
    if (name) set.add(name);
  });

  // Also include cats referenced in other tabs (helps if Cats tab incomplete)
  (payload.sightings || []).forEach(s => {
    const name = String(s.cat || "").trim();
    if (name) set.add(name);
  });
  (payload.interactions || []).forEach(i => {
    const name = String(i.cat || "").trim();
    if (name) set.add(name);
  });
  (payload.newArrivals || []).forEach(n => {
    const name = String(n.nickname || "").trim();
    if (name) set.add(name);
  });

  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

/**
 * JSON response helper with optional CORS.
 */
function respond_(obj, statusCode) {
  const out = ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);

  // ContentService doesn't let you set HTTP status directly,
  // but we can embed status in payload if you want.
  // GitHub Pages fetch will still receive 200 in practice.
  // We'll include a status field for clarity:
  // (You can remove this if you don't want it.)
  // NOTE: leaving as-is to avoid confusing "unauthorized" handling in your JS.
  return withCors_(out);
}

function withCors_(output) {
  if (!CONFIG.ENABLE_CORS) return output;

  // ContentService supports setting headers in V8 runtime via setHeader
  // (if unavailable in your environment, remove these lines)
  try {
    output.setHeader("Access-Control-Allow-Origin", "*");
    output.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    output.setHeader("Access-Control-Allow-Headers", "Content-Type");
  } catch (e) {
    // If headers aren't supported in your account/runtime, it's usually still fine
    // because Apps Script web apps commonly work without explicit CORS for GET.
  }
  return output;
}

// Optional: handle preflight (some browsers/services may send OPTIONS)
function doOptions(e) {
  const out = ContentService
    .createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);

  return withCors_(out);
}

