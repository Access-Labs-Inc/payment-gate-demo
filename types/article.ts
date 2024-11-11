export interface Article {
  id: number;
  title: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  content: {
    preview: string;
    fullText?: string;
  };
}
