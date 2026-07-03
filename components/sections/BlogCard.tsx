import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CalendarDays, Clock, Newspaper } from 'lucide-react';
import type { BlogSummary } from '@/lib/blog-api';
import { formatBlogDate, estimateReadingTime } from '@/lib/blog-api';

/** A single blog card with a cover image, used on the blog index + homepage. */
export default function BlogCard({ blog }: { blog: BlogSummary }) {
  const date = formatBlogDate(blog.publishDate, blog.publishTime);
  const readingTime = estimateReadingTime(blog.content, blog.customFields?.readingTime);
  const category = blog.categories?.[0];

  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-evergreen/30 hover:shadow-hover"
    >
      {/* Cover image (featuredImage from the API) */}
      <div className="relative aspect-[16/10] overflow-hidden bg-cream-2">
        {blog.featuredImage ? (
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-evergreen/10 to-cream-2">
            <Newspaper className="h-9 w-9 text-evergreen/30" aria-hidden="true" />
          </div>
        )}
        {category && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-caption font-semibold text-evergreen backdrop-blur">
            {category}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center gap-4 text-caption text-mist">
          {date && (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-evergreen" aria-hidden="true" />
              {date}
            </span>
          )}
          {readingTime && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-evergreen" aria-hidden="true" />
              {readingTime}
            </span>
          )}
        </div>

        <h3 className="mt-4 font-display text-h3 font-medium leading-snug text-ink">
          {blog.title}
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-[0.95rem] leading-relaxed text-mist">
          {blog.excerpt}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-evergreen">
          Read more
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
