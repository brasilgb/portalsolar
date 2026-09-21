const KEY = 'mapsAddressExtractorRecords';
const LOCATION_PAGE_URL = 'http://localhost:3000/location/';
const $ = id => document.getElementById(id);

async function load() {
  const data = await chrome.storage.local.get(KEY);
  const records = data[KEY] || [];
  $('count').textContent = records.length;
  $('list').innerHTML = records.length ? records.map((r, i) => `
    <div class="item">
      <strong>${escapeHtml(r.name || `Registro ${i + 1}`)}</strong>
      <small>${escapeHtml(r.address || 'Sem endereço')}</small>
      <small>${escapeHtml([r.latitude, r.longitude].filter(Boolean).join(', ') || 'Sem coordenadas')}</small>
      <small>${r.imageUrl ? 'Imagem capturada' : 'Sem imagem'}</small>
    </div>`).join('') : '<div class="empty">Nenhum registro salvo.</div>';
  return records;
}

function escapeHtml(v='') {
  return String(v).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}

$('capture').addEventListener('click', async () => {
  $('status').textContent = '';
  const [tab] = await chrome.tabs.query({active:true,currentWindow:true});
  if (!tab?.id || !/^https:\/\/(www\.)?google\.(com|com\.br)\/maps\//.test(tab.url || '')) {
    $('status').textContent = 'Abra uma empresa no Google Maps primeiro.';
    return;
  }
  try {
    const place = await chrome.tabs.sendMessage(tab.id, {type:'CAPTURE_PLACE'});
    if (!place?.address && !place?.latitude && !place?.longitude) {
      $('status').textContent = 'Não consegui identificar a empresa aberta. Abra o painel completo do local e tente novamente.';
      return;
    }
    const records = await load();
    const key = `${place.address}|${place.latitude}|${place.longitude}`;
    const exists = records.some(r => `${r.address}|${r.latitude}|${r.longitude}` === key);
    if (exists) {
      $('status').textContent = 'Este local já está salvo.';
      return;
    }
    records.push(place);
    await chrome.storage.local.set({[KEY]: records});
    $('status').textContent = 'Empresa salva com sucesso.';
    await load();
  } catch (e) {
    $('status').textContent = 'Falha ao capturar. Recarregue o Google Maps e tente novamente.';
  }
});

$('list-records').addEventListener('click', async () => {
  const records = await load();
  if (!records.length) {
    $('status').textContent = 'Não há registros para listar.';
    return;
  }
  const data = encodeURIComponent(JSON.stringify(records));
  await chrome.tabs.create({url: `${LOCATION_PAGE_URL}?data=${data}`});
});

$('clear').addEventListener('click', async () => {
  if (!confirm('Limpar todos os registros salvos?')) return;
  await chrome.storage.local.set({[KEY]: []});
  $('status').textContent = 'Lista limpa.';
  await load();
});

load();
