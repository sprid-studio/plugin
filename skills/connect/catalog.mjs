// Navigation and command aliases only. Instructions live in guides/*.md.
export const GUIDE_GROUPS = [
  { title: 'Account setup', slugs: ['social-accounts'] },
  { title: 'Stores and analytics', slugs: ['app-store-connect', 'google-play', 'search-console', 'posthog', 'google-analytics', 'plausible', 'umami', 'revenuecat', 'stripe', 'polar', 'lemonsqueezy', 'paddle', 'cloudflare', 'github'] },
  { title: 'Publishing channels', slugs: ['instagram', 'tiktok', 'tiktok-comments', 'youtube', 'linkedin', 'facebook', 'x', 'pinterest'] },
  { title: 'Ads', slugs: ['meta-ads', 'google-ads', 'tiktok-ads'] },
];
export const GUIDE_ALIASES = { asc: 'app-store-connect', play: 'google-play', gsc: 'search-console', ga4: 'google-analytics', ga: 'google-analytics', 'google-analytics-4': 'google-analytics', meta_ads: 'meta-ads', meta: 'meta-ads', google_ads: 'google-ads', tiktok_ads: 'tiktok-ads', tiktok_accounts: 'tiktok-comments', 'tiktok-accounts': 'tiktok-comments' };
