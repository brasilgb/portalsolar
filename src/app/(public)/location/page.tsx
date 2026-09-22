'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  IoCopyOutline,
  IoDownloadOutline,
  IoImageOutline,
  IoLocationOutline,
  IoMapOutline,
  IoRefreshOutline,
  IoSearchOutline,
  IoTrashOutline,
} from 'react-icons/io5';

const STORAGE_KEY = 'maps-address-extractor-captures';
const EXTENSION_DOWNLOAD_URL = '/location/maps-address-extractor-chrome-v1.0.0.rar';

type RawCapture = Record<string, unknown>;

type Capture = {
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  imageUrl: string;
  mapsUrl: string;
  capturedAt: string;
  raw: RawCapture;
};

const fieldNames = {
  name: ['name', 'title', 'nome', 'businessName', 'placeName'],
  address: ['address', 'endereco', 'endereço', 'location', 'formattedAddress'],
  latitude: ['latitude', 'lat'],
  longitude: ['longitude', 'lng', 'lon'],
  imageUrl: ['imageUrl', 'image', 'imagem'],
  mapsUrl: ['mapsUrl', 'mapUrl', 'googleMapsUrl'],
  capturedAt: ['capturedAt', 'createdAt', 'capturadoEm'],
};

function pick(item: RawCapture, names: string[]) {
  for (const name of names) {
    const value = item[name];
    if (value !== undefined && value !== null) return String(value).trim();
  }
  return '';
}

function normalize(input: unknown): Capture[] {
  const payload = input as { items?: unknown; captures?: unknown; data?: unknown };
  const list = Array.isArray(input)
    ? input
    : Array.isArray(payload?.items)
      ? payload.items
      : Array.isArray(payload?.captures)
        ? payload.captures
        : Array.isArray(payload?.data)
          ? payload.data
          : [];

  return list
    .filter((item): item is RawCapture => typeof item === 'object' && item !== null)
    .map((item) => ({
      name: pick(item, fieldNames.name),
      address: pick(item, fieldNames.address),
      latitude: pick(item, fieldNames.latitude),
      longitude: pick(item, fieldNames.longitude),
      imageUrl: pick(item, fieldNames.imageUrl),
      mapsUrl: pick(item, fieldNames.mapsUrl),
      capturedAt: pick(item, fieldNames.capturedAt),
      raw: item,
    }));
}

function formatDate(value: string) {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
}

function readStoredCaptures() {
  try {
    return normalize(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
  } catch {
    return [];
  }
}

export default function LocationPage() {
  const [captures, setCaptures] = useState<Capture[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('data');

    if (encoded) {
      try {
        const parsed = normalize(JSON.parse(decodeURIComponent(encoded)));
        setCaptures(parsed);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed.map((item) => item.raw)));
        window.history.replaceState(null, '', window.location.pathname);
        return;
      } catch {
        setCaptures(readStoredCaptures());
        return;
      }
    }

    setCaptures(readStoredCaptures());
  }, []);

  const filteredCaptures = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return captures;

    return captures.filter((item) =>
      [
        item.name,
        item.address,
        item.latitude,
        item.longitude,
        item.imageUrl,
        item.mapsUrl,
        item.capturedAt,
      ]
        .join(' ')
        .toLowerCase()
        .includes(query),
    );
  }, [captures, search]);

  const withCoordinates = captures.filter((item) => item.latitude && item.longitude).length;
  const withImages = captures.filter((item) => item.imageUrl).length;

  const copyJson = async () => {
    await navigator.clipboard.writeText(JSON.stringify(captures.map((item) => item.raw), null, 2));
  };

  const clearList = () => {
    setCaptures([]);
    localStorage.setItem(STORAGE_KEY, '[]');
  };

  const reloadList = () => {
    setCaptures(readStoredCaptures());
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-normal text-slate-950 sm:text-4xl">
              Locations capturados
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Lista dos registros capturados pelo Maps Address Extractor.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href={EXTENSION_DOWNLOAD_URL}
              download
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-teal-700 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-teal-800"
            >
              <IoDownloadOutline size={18} />
              Baixar extensão
            </a>
            <button
              type="button"
              onClick={copyJson}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-100"
            >
              <IoCopyOutline size={18} />
              Copiar JSON
            </button>
            <button
              type="button"
              onClick={clearList}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-red-200 bg-white px-4 text-sm font-bold text-red-700 shadow-sm transition hover:bg-red-50"
            >
              <IoTrashOutline size={18} />
              Limpar
            </button>
          </div>
        </header>

        <section className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <strong className="block text-3xl font-black">{captures.length}</strong>
            <span className="text-sm text-slate-600">registros</span>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <strong className="block text-3xl font-black">{withCoordinates}</strong>
            <span className="text-sm text-slate-600">com coordenadas</span>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <strong className="block text-3xl font-black">{withImages}</strong>
            <span className="text-sm text-slate-600">com imagem</span>
          </div>
        </section>

        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 p-3 md:flex-row md:items-center md:justify-between">
            <label className="relative block w-full md:max-w-md">
              <IoSearchOutline
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar por nome, endereço, coordenadas ou link"
                className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              />
            </label>

            <button
              type="button"
              onClick={reloadList}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
            >
              <IoRefreshOutline size={18} />
              Atualizar
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse text-left">
              <thead className="bg-slate-100 text-xs uppercase text-slate-600">
                <tr>
                  <th className="px-4 py-3">Nome</th>
                  <th className="px-4 py-3">Endereço</th>
                  <th className="px-4 py-3">Coordenadas</th>
                  <th className="px-4 py-3">Imagem</th>
                  <th className="px-4 py-3">Maps</th>
                  <th className="px-4 py-3">Capturado em</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {filteredCaptures.map((item, index) => (
                  <tr key={`${item.address}-${item.latitude}-${item.longitude}-${index}`}>
                    <td className="px-4 py-3 font-bold text-slate-900">
                      {item.name || `Registro ${index + 1}`}
                    </td>
                    <td className="max-w-md px-4 py-3 text-slate-700">
                      {item.address || '-'}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {item.latitude && item.longitude
                        ? `${item.latitude}, ${item.longitude}`
                        : '-'}
                    </td>
                    <td className="px-4 py-3">
                      {item.imageUrl ? (
                        <a
                          href={item.imageUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 font-bold text-teal-700 hover:text-teal-900"
                        >
                          <IoImageOutline size={18} />
                          Abrir
                        </a>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {item.mapsUrl ? (
                        <a
                          href={item.mapsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 font-bold text-teal-700 hover:text-teal-900"
                        >
                          <IoMapOutline size={18} />
                          Abrir
                        </a>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{formatDate(item.capturedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!filteredCaptures.length && (
              <div className="flex flex-col items-center gap-2 px-4 py-14 text-center text-slate-500">
                <IoLocationOutline size={28} />
                <p className="text-sm font-medium">Nenhum registro capturado ainda.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
