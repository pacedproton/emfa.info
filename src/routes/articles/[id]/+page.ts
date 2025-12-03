import { error } from '@sveltejs/kit';
import { chapters } from '$lib/data/emfa';

export function entries() {
  return chapters.flatMap(chapter =>
    chapter.articles.map(article => ({ id: article.id }))
  );
}

export function load({ params }) {
  const { id } = params;

  for (const chapter of chapters) {
    const article = chapter.articles.find((a) => a.id === id);
    if (article) {
      return { article, chapter };
    }
  }

  error(404, 'Article not found');
}
