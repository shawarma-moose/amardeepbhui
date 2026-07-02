import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getLatestBlogs } from '@/lib/blog-api';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import BlogCard from '@/components/sections/BlogCard';

/** Latest blog posts (up to 3) for the home page. */
export default async function BlogPreview() {
  const latest = await getLatestBlogs(3);
  if (latest.length === 0) return null;

  return (
    <section className="shell py-16 lg:py-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="From the blog"
          title="Insights & guidance"
          className="!max-w-xl"
        />
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-evergreen transition-colors hover:text-aubergine"
        >
          View all posts
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <RevealGroup className="mt-10 grid gap-6 md:grid-cols-3">
        {latest.map((blog) => (
          <RevealItem key={blog.id ?? blog.slug} className="h-full">
            <BlogCard blog={blog} />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
