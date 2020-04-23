import unified from 'unified';
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

export function markdownToHtml(markdown) {
  return unified()
    .use(remarkParse)
    .use(remark2rehype, { allowDangerousHtml: true })
    .use(rehypeStringify)
    .processSync(markdown)
    .contents.toString();
}
