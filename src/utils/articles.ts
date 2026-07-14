import {
  getCollection,
  type CollectionEntry,
} from "astro:content";

export type Article =
  CollectionEntry<"articles">;

export async function getPublishedArticles(): Promise<Article[]> {
  const articles = await getCollection(
    "articles",
    ({ data }) => !data.draft,
  );

  return articles.sort(
    (a, b) =>
      b.data.publishedAt.getTime() -
      a.data.publishedAt.getTime(),
  );
}

export async function getTrendingArticles(
  limit = 6,
): Promise<Article[]> {
  const articles = await getPublishedArticles();

  return articles
    .filter(({ data }) => data.trending)
    .slice(0, limit);
}

export async function getLatestArticles(
  limit?: number,
): Promise<Article[]> {
  const articles = await getPublishedArticles();

  return typeof limit === "number"
    ? articles.slice(0, limit)
    : articles;
}

export function getArticleUrl(
  article: Article,
): string {
  return `/${article.id.replace(/\.(md|mdx)$/, "")}`;
}

export function formatArticleDate(
  date: Date,
): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatCategory(
  category: Article["data"]["category"],
): string {
  const categories = {
    memes: "Memes",
    viral: "Viral",
    slang: "Slang",
    explained: "Explained",
  } satisfies Record<
    Article["data"]["category"],
    string
  >;

  return categories[category];
}