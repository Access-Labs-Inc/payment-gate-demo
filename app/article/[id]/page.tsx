import ArticleView from "./ArticleView";

export default function ArticlePage({ params }: { params: { id: number } }) {
  return <ArticleView articleId={params.id} />;
}
