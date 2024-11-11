"use client";

import { useQuery } from "@tanstack/react-query";
import { Article } from "../../../types/article";
import { LoginButton } from "../../../components/login-button";
import { useSubscription } from "@accessprotocol/payment-gate";

const POOL_ADDRESS = process.env.NEXT_PUBLIC_POOL_ADDRESS;
const PAYMENT_GATE_URL = process.env.NEXT_PUBLIC_PAYMENT_GATE_URL;

if (!POOL_ADDRESS || !PAYMENT_GATE_URL) {
  throw new Error(
    "Missing required environment variables. Please set NEXT_PUBLIC_POOL_ADDRESS and NEXT_PUBLIC_PAYMENT_GATE_URL",
  );
}

interface ArticleViewProps {
  articleId: number;
}

export default function ArticleView({ articleId }: ArticleViewProps) {
  const { token: accessToken } = useSubscription();

  const {
    data: article,
    isLoading,
    error,
  } = useQuery<Article>({
    queryKey: ["article", articleId, accessToken],
    queryFn: async () => {
      const response = await fetch(
        `/api/article/${articleId}${accessToken ? `?access_token=${accessToken}` : ""}`,
      );
      if (!response.ok) throw new Error("Failed to fetch article");
      return response.json();
    },
  });

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <main className="container mx-auto px-4 pt-24 pb-12">
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {!article && !isLoading && !error && <div>Article not found</div>}

        {article && (
          <article className="max-w-2xl mx-auto">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-[400px] object-cover rounded-lg mb-8"
            />

            <div className="flex items-center text-sm text-gray-400 mb-4">
              <span>{article.author}</span>
              <span className="mx-2">•</span>
              <span>{article.date}</span>
              <span className="mx-2">•</span>
              <span>{article.readTime}</span>
            </div>

            <h1 className="text-4xl font-bold mb-6">{article.title}</h1>

            <div className="prose prose-invert max-w-none">
              {article.content.fullText ? (
                <div className="space-y-4">
                  {article.content.fullText
                    .split("\n\n")
                    .map((paragraph: string, idx: number) => (
                      <p key={idx} className="text-gray-300">
                        {paragraph.trim()}
                      </p>
                    ))}
                </div>
              ) : (
                <div>
                  <p className="text-gray-300 mb-8">
                    {article.content.preview}
                  </p>
                  <div className="bg-gray-800 p-8 rounded-lg text-center">
                    <p className="text-xl mb-4">
                      Subscribe with Access to read the full article
                    </p>
                    <LoginButton loginText="Subscribe Now" />
                  </div>
                </div>
              )}
            </div>
          </article>
        )}
      </main>
    </div>
  );
}
