/**
 * Uplift AI public blog API client.
 *
 * Docs: https://api.upliftai.co/api/public/v1
 *
 * The token is a secret — it lives in the UPLIFT_BLOG_TOKEN environment
 * variable and is only ever read on the server (these functions run in
 * Server Components / at build time, never shipped to the browser). We use the
 * `Authorization: Bearer` server-side endpoints rather than the path-based
 * browser variant so the token is never exposed in a URL or to the client.
 */

const API_BASE = 'https://api.upliftai.co/api/public/v1';

/** How long (seconds) Next.js caches a blog response before refetching. */
const REVALIDATE_SECONDS = 300;

export type BlogFreshness = {
  lastUpdatedAt?: string;
  ageDays?: number;
  needsRefresh?: boolean;
  freshnessThresholdDays?: number;
};

export type BlogMeta = {
  seoTitle?: string;
  seoDescription?: string;
  focusKeyword?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogUrl?: string;
  ogSiteName?: string;
  ogLocale?: string;
  articleAuthor?: string;
  articleSection?: string;
  articleTags?: string[];
};

export type BlogAnalytics = {
  contentQualityScore?: number;
  rankingPotential?: string;
  conversionPotential?: string;
  externalLinksCount?: number;
};

/** Summary shape returned by the list endpoint. */
export type BlogSummary = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  status: 'PUBLISH' | 'DRAFT' | string;
  publishDate?: string;
  publishTime?: string;
  featuredImage?: string;
  categories?: string[];
  tags?: string[];
  seoScore?: number;
  createdAt?: string;
  updatedAt?: string;
  authorName?: string;
  authorUrl?: string;
  freshness?: BlogFreshness;
  meta?: BlogMeta;
  customFields?: Record<string, unknown> & {
    readingTime?: string;
    rating?: number;
  };
};

/** Detail shape (list fields + full content + analytics). */
export type BlogDetail = BlogSummary & {
  content: string;
  analytics?: BlogAnalytics;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type ListResponse = {
  success: boolean;
  data?: { blogs: BlogSummary[]; pagination: Pagination };
  error?: string;
};

type DetailResponse = {
  success: boolean;
  data?: { blog: BlogDetail };
  error?: string;
};

function getToken(): string | undefined {
  return process.env.UPLIFT_BLOG_TOKEN?.trim() || undefined;
}

async function apiGet<T>(path: string): Promise<T | null> {
  const token = getToken();
  if (!token) {
    // No token configured yet — treat as "no blogs" rather than crashing the page.
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[blog-api] UPLIFT_BLOG_TOKEN is not set; blog content is unavailable.');
    }
    return null;
  }

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      console.error(`[blog-api] ${path} → ${res.status} ${res.statusText}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error(`[blog-api] request failed for ${path}:`, err);
    return null;
  }
}

export type BlogListResult = {
  blogs: BlogSummary[];
  pagination?: Pagination;
};

/**
 * Fetch a page of published blog summaries. Never throws — on any error it
 * returns an empty list so the page can render a graceful empty state.
 */
export async function getBlogs(
  options: { page?: number; limit?: number; status?: 'PUBLISH' | 'DRAFT' | 'ALL' } = {},
): Promise<BlogListResult> {
  const { page = 1, limit = 12, status = 'PUBLISH' } = options;
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    status,
  });

  const json = await apiGet<ListResponse>(`/blogs?${params.toString()}`);
  if (!json?.success || !json.data) return { blogs: [] };

  return { blogs: json.data.blogs ?? [], pagination: json.data.pagination };
}

/** Convenience: the N most recent published posts (for the homepage preview). */
export async function getLatestBlogs(limit = 3): Promise<BlogSummary[]> {
  const { blogs } = await getBlogs({ page: 1, limit });
  return blogs;
}

/**
 * Fetch a single blog by slug. Returns null when the token is missing, the
 * blog does not exist, or the request fails.
 */
export async function getBlog(slug: string): Promise<BlogDetail | null> {
  const json = await apiGet<DetailResponse>(`/blog/${encodeURIComponent(slug)}`);
  if (!json?.success || !json.data?.blog) return null;
  return json.data.blog;
}

/** Format an ISO date (or date + time) into a human-readable display string. */
export function formatBlogDate(date?: string, time?: string): string {
  if (!date) return '';
  const iso = time ? `${date}T${time}` : date;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });
}

/** Rough reading-time estimate from HTML content when the API doesn't supply one. */
export function estimateReadingTime(content?: string, provided?: string): string {
  if (provided) return provided;
  if (!content) return '';
  const words = content.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}
