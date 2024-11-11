"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useSubscription } from "@accessprotocol/payment-gate/dist/context";
import { Article } from "../types/article";

export default function Home() {
  const { token } = useSubscription();
  const { data: articles, isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const response = await fetch("/api/articles");
      if (!response.ok) throw new Error("Failed to fetch articles");
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto space-y-8">
          {articles?.map((article: Article) => (
            <Link
              href={`/article/${article.id}`}
              key={article.id}
              className="block hover:transform hover:scale-[1.02] transition-transform"
            >
              <article className="bg-gray-800 rounded-lg overflow-hidden shadow-xl flex">
                <div className="flex-1 p-6">
                  <div className="flex items-center text-sm text-gray-400 mb-2">
                    <span>{article.author}</span>
                    <span className="mx-2">•</span>
                    <span>{article.date}</span>
                    <span className="mx-2">•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-4 hover:text-blue-400 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-gray-300">{article.content.preview}</p>
                  {!token && (
                    <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                      <p className="text-yellow-400">
                        Login to read the full article
                      </p>
                    </div>
                  )}
                </div>
                <div className="w-[200px] flex-shrink-0">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-[200px] h-[300px] object-cover"
                  />
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
