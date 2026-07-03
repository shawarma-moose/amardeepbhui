import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CalendarDays, Clock, RefreshCw } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import CtaBand from '@/components/sections/CtaBand';
import { Reveal } from '@/components/motion/Reveal';
import { getBlog, formatBlogDate, estimateReadingTime } from '@/lib/blog-api';
import { site } from '@/lib/site';

// Always render fresh from the Uplift AI API — never statically cached.
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const blog = await getBlog(params.slug);
  if (!blog) return {};

  const meta = blog.meta ?? {};
  const title = meta.seoTitle || blog.title;
  const description = meta.seoDescription || blog.excerpt;

  return {
    title,
    description,
    keywords: meta.keywords,
    authors: blog.authorName ? [{ name: blog.authorName, url: blog.authorUrl }] : undefined,
    alternates: { canonical: `/blog/${blog.slug}` },
    openGraph: {
      type: 'article',
      title: meta.ogTitle || title,
      description: meta.ogDescription || description,
      url: meta.ogUrl || `${site.url}/blog/${blog.slug}`,
      siteName: meta.ogSiteName || site.name,
      locale: meta.ogLocale || site.locale,
      images: blog.featuredImage ? [{ url: blog.featuredImage, alt: blog.title }] : undefined,
      publishedTime: blog.publishDate,
      modifiedTime: blog.freshness?.lastUpdatedAt || blog.updatedAt,
      authors: meta.articleAuthor ? [meta.articleAuthor] : undefined,
      section: meta.articleSection,
      tags: meta.articleTags,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const blog = await getBlog(params.slug);
  if (!blog) notFound();

  const date = formatBlogDate(blog.publishDate, blog.publishTime);
  const readingTime = estimateReadingTime(blog.content, blog.customFields?.readingTime);
  const lastUpdated = blog.freshness?.lastUpdatedAt
    ? formatBlogDate(blog.freshness.lastUpdatedAt.slice(0, 10))
    : '';

  return (
    <>
      <PageHero
        eyebrow={blog.categories?.[0] || 'Blog'}
        title={blog.title}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: blog.title },
        ]}
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-caption text-mist">
          {blog.authorName && (
            <span>
              By{' '}
              {blog.authorUrl ? (
                <a
                  href={blog.authorUrl}
                  className="font-semibold text-evergreen transition-colors hover:text-aubergine"
                >
                  {blog.authorName}
                </a>
              ) : (
                <span className="font-semibold text-ink">{blog.authorName}</span>
              )}
            </span>
          )}
          {date && (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-evergreen" aria-hidden="true" />
              {date}
            </span>
          )}
          {readingTime && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-evergreen" aria-hidden="true" />
              {readingTime}
            </span>
          )}
        </div>
      </PageHero>

      <article className="shell py-12 lg:py-14">
        <div className="mx-auto max-w-3xl">
          {/* Cover image (featuredImage from the API) */}
          {blog.featuredImage && (
            <Reveal className="mb-10 overflow-hidden rounded-2xl border border-border shadow-frame">
              <div className="relative aspect-[16/9] bg-cream-2">
                <Image
                  src={blog.featuredImage}
                  alt={blog.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
              </div>
            </Reveal>
          )}

          <Reveal>
            {/* Content is trusted HTML from the CMS — preserved as-is, including
                any <script type="application/ld+json"> structured-data blocks. */}
            <div
              className="blog-prose"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-cream-2/50 px-3 py-1 text-caption text-mist"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Visible freshness line (recreated in case the CMS strips it) */}
            {lastUpdated && (
              <p className="mt-8 inline-flex items-center gap-1.5 text-caption text-mist">
                <RefreshCw className="h-3.5 w-3.5 text-evergreen" aria-hidden="true" />
                Last updated {lastUpdated}
              </p>
            )}

            <div className="mt-10 border-t border-brass/20 pt-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-evergreen transition-colors hover:text-aubergine"
              >
                <ArrowLeft className="h-4 w-4" /> Back to all posts
              </Link>
            </div>
          </Reveal>
        </div>
      </article>

      <CtaBand />
    </>
  );
}
