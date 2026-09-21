function text(el) {
  return el?.textContent?.trim() || "";
}

function getCoordinates() {
  const url = location.href;
  let m = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (m) return { latitude: m[1], longitude: m[2] };

  m = url.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
  if (m) return { latitude: m[1], longitude: m[2] };

  return { latitude: "", longitude: "" };
}

function getAddress() {
  const selectors = [
    'button[data-item-id="address"]',
    '[data-item-id="address"]',
    'button[aria-label^="Endereço:"]',
    'button[aria-label^="Address:"]'
  ];

  for (const selector of selectors) {
    const el = document.querySelector(selector);
    if (!el) continue;
    const aria = el.getAttribute('aria-label') || '';
    const cleaned = aria.replace(/^Endereço:\s*/i, '').replace(/^Address:\s*/i, '').trim();
    if (cleaned) return cleaned;
    const t = text(el);
    if (t) return t;
  }
  return "";
}

function getName() {
  const h1 = document.querySelector('h1');
  return text(h1) || document.title.replace(/\s*-\s*Google Maps.*$/i, '').trim();
}

function getImageUrl() {
  const candidates = [
    ...document.querySelectorAll('button img[src^="http"], img[src^="http"]')
  ];

  const scored = candidates
    .map(img => ({
      src: img.currentSrc || img.src,
      area: (img.naturalWidth || img.width || 0) * (img.naturalHeight || img.height || 0),
      alt: img.alt || ''
    }))
    .filter(x => x.src && !x.src.includes('googleusercontent.com/a/') && !x.src.includes('maps.gstatic.com'))
    .sort((a, b) => b.area - a.area);

  return scored[0]?.src || "";
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type !== 'CAPTURE_PLACE') return;
  const coords = getCoordinates();
  sendResponse({
    name: getName(),
    address: getAddress(),
    latitude: coords.latitude,
    longitude: coords.longitude,
    imageUrl: getImageUrl(),
    mapsUrl: location.href,
    capturedAt: new Date().toISOString()
  });
});
