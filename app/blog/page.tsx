import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, Instagram } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import CtaBand from '@/components/sections/CtaBand';
import BlogCard from '@/components/sections/BlogCard';
import Pagination from '@/components/ui/Pagination';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { getAllBlogs } from '@/lib/blog-api';
import { site } from '@/lib/site';

const PAGE_SIZE = 12;

type Props = { searchParams: { page?: string | string[] } };

/** `?page=` as a positive integer, defaulting to 1 for missing/invalid values. */
function currentPage(searchParams: Props['searchParams']): number {
  const raw = Array.isArray(searchParams.page) ? searchParams.page[0] : searchParams.page;
  const n = Number(raw);
  return Number.isInteger(n) && n > 1 ? n : 1;
}

const pageHref = (page: number) => (page === 1 ? '/blog' : `/blog?page=${page}`);

export function generateMetadata({ searchParams }: Props): Metadata {
  const page = currentPage(searchParams);
  return {
    title: page === 1 ? 'Blog' : `Blog — Page ${page}`,
    description:
      'Mortgage insights and guidance from Amarpreet Bhui — tips on rates, renewals, refinancing, and tailored mortgage solutions in Southern Ontario.',
    alternates: { canonical: pageHref(page) },
  };
}

// Always render fresh from the Uplift AI API — never statically cached.
export const dynamic = 'force-dynamic';

export default async function BlogPage({ searchParams }: Props) {
  const allBlogs = await getAllBlogs();
  const totalPages = Math.max(1, Math.ceil(allBlogs.length / PAGE_SIZE));
  const page = currentPage(searchParams);
  if (page > totalPages) notFound();
  const blogs = allBlogs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <PageHero
        eyebrow="Our blog"
        title="Insights & guidance"
        intro="Practical mortgage advice for buying, renewing, refinancing and investing across Southern Ontario."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Blog' }]}
      />

      <section className="shell py-14 lg:py-16">
        {blogs.length > 0 ? (
          <>
            <RevealGroup key={page} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <RevealItem key={blog.id ?? blog.slug} className="h-full">
                  <BlogCard blog={blog} />
                </RevealItem>
              ))}
            </RevealGroup>
            <Pagination current={page} total={totalPages} hrefFor={pageHref} />
          </>
        ) : (
          <div className="mx-auto max-w-md rounded-2xl border border-border bg-white p-10 text-center">
            <h2 className="font-display text-h3 font-medium text-ink">No posts yet</h2>
            <p className="mt-3 text-mist">
              New mortgage insights are on the way. Check back soon for tips on rates, renewals,
              and refinancing.
            </p>
          </div>
        )}

        {/* Instagram strip — clean follow CTA */}
        <div className="mt-14 flex flex-col items-center gap-4 rounded-2xl border border-brass/20 bg-cream-2/40 p-8 text-center">
          <Instagram className="h-7 w-7 text-evergreen" aria-hidden="true" />
          <h2 className="font-display text-h3 font-medium text-ink">Find us on Instagram</h2>
          <p className="max-w-md text-mist">
            Follow along for mortgage tips, market updates, and client wins.
          </p>
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-evergreen transition-colors hover:text-aubergine"
          >
            Follow @amarpreetbhui <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
