import articles from "../../../../data/articles.json";
import { createAccessSubscriptionChecker } from "@accessprotocol/payment-gate/dist/subscriber";

const POOL_ADDRESS = process.env.NEXT_PUBLIC_POOL_ADDRESS;
const ACCESS_API_URL = process.env.NEXT_PUBLIC_ACCESS_API_URL;

if (!POOL_ADDRESS) {
  throw new Error("POOL_ADDRESS environment variable is required");
}

const checker = createAccessSubscriptionChecker({
  apiUrl: ACCESS_API_URL,
  poolAddress: POOL_ADDRESS,
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { searchParams } = new URL(request.url);
  const accessToken = searchParams.get("access_token");
  const articleId = parseInt(params.id);

  const article = articles.articles.find((a) => a.id === articleId);
  if (!article) {
    return Response.json({ error: "Article not found" }, { status: 404 });
  }

  // If no token, return preview only
  if (!accessToken) {
    return Response.json({
      ...article,
      content: { preview: article.content.preview },
    });
  }

  try {
    const { isSubscriber } = await checker.checkSubscription(accessToken);

    if (!isSubscriber) {
      return Response.json({
        ...article,
        content: { preview: article.content.preview },
      });
    }

    return Response.json(article);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to verify subscription" },
      { status: 500 },
    );
  }
}
