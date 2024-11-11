import articles from "../../../data/articles.json";

export async function GET() {
  const articlePreviews = articles.articles.map(({ content, ...article }) => ({
    ...article,
    content: { preview: content.preview },
  }));

  return Response.json(articlePreviews);
}
