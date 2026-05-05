// Slim kit: only what StepproofPage needs from the host. Posts analytics
// back to bilko.run/api/analytics/event same-origin once deployed.

const HOST = 'https://bilko.run';
const API = `${HOST}/api`;

let visitorId: string | null = null;
function getVisitorId(): string {
  if (visitorId) return visitorId;
  try {
    let v = localStorage.getItem('bilko_visitor_id');
    if (!v) {
      v = crypto.randomUUID();
      localStorage.setItem('bilko_visitor_id', v);
    }
    visitorId = v;
    return v;
  } catch {
    return 'anon';
  }
}

let sessionId: string | null = null;
function getSessionId(): string {
  if (sessionId) return sessionId;
  try {
    sessionId = sessionStorage.getItem('bilko_session_id') ?? crypto.randomUUID();
    sessionStorage.setItem('bilko_session_id', sessionId);
    return sessionId;
  } catch {
    return 'anon';
  }
}

export function track(event: string, props?: { tool?: string; metadata?: unknown }): void {
  try {
    const body = JSON.stringify({
      event,
      tool: props?.tool ?? 'stepproof',
      path: window.location.pathname,
      metadata: props?.metadata ?? null,
      visitor_id: getVisitorId(),
      session_id: getSessionId(),
    });
    const url = `${API}/analytics/event`;
    if (typeof navigator?.sendBeacon === 'function') {
      const blob = new Blob([body], { type: 'application/json' });
      if (navigator.sendBeacon(url, blob)) return;
    }
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // analytics never breaks the app
  }
}
