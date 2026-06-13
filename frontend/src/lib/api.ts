import { LeadEntry, SiteContent } from './siteContent';

export interface GoogleReview {
  id: string;
  authorName: string;
  authorUrl?: string;
  rating: number;
  text: string;
  profilePhotoUrl?: string;
  relativeTimeDescription?: string;
}

const API_BASE = import.meta.env.VITE_API_URL || '';

const getApiBase = () => {
  if (typeof window !== 'undefined' && window.location) {
    const currentHost = window.location.hostname;
    if (API_BASE) {
      try {
        const configuredUrl = new URL(API_BASE, window.location.origin);
        if (
          (configuredUrl.hostname === 'localhost' || configuredUrl.hostname === '127.0.0.1') &&
          currentHost !== 'localhost' &&
          currentHost !== '127.0.0.1'
        ) {
          return window.location.origin;
        }
      } catch {
        // ignore malformed API_BASE and fall back to current origin
      }
      return API_BASE;
    }
    return window.location.origin;
  }
  return API_BASE || '';
};

async function parseResponse(response: Response) {
  const text = await response.text();
  if (!response.ok) {
    throw new Error(text || response.statusText || 'API request failed');
  }
  return text ? JSON.parse(text) : null;
}

export async function fetchSiteContent(): Promise<SiteContent> {
  const response = await fetch(`${getApiBase()}/api/content`);
  return parseResponse(response);
}

export async function saveSiteContent(content: SiteContent, token: string): Promise<SiteContent> {
  const response = await fetch(`${getApiBase()}/api/content`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(content),
  });
  return parseResponse(response);
}

export async function fetchLeads(token: string): Promise<LeadEntry[]> {
  const response = await fetch(`${getApiBase()}/api/leads`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return parseResponse(response);
}

export async function postLead(lead: LeadEntry): Promise<LeadEntry> {
  const response = await fetch(`${getApiBase()}/api/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(lead),
  });
  return parseResponse(response);
}

export async function loginAdmin(username: string, password: string): Promise<{ token: string }> {
  const response = await fetch(`${API_BASE}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return parseResponse(response);
}

export async function verifyToken(token: string): Promise<void> {
  const response = await fetch(`${getApiBase()}/api/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  await parseResponse(response);
}

export async function uploadFile(file: File, token: string): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE}/api/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  
  const result = await parseResponse(response);
  return result.url;
}

export async function deleteLead(leadId: string, token: string): Promise<void> {
  const response = await fetch(`${getApiBase()}/api/leads/${leadId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  await parseResponse(response);
}

export async function fetchGoogleReviews(): Promise<GoogleReview[]> {
  const response = await fetch(`${getApiBase()}/api/google-reviews`);
  return parseResponse(response);
}

export async function createLead(lead: LeadEntry): Promise<LeadEntry> {
  const response = await fetch(`${API_BASE}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  });
  return parseResponse(response);
}

