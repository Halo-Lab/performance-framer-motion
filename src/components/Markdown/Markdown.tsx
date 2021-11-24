import type { ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';
import type { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { Link } from '../Link';

type TSpecialItem = {
  key: string;
  component: ReactElement;
};

interface IProps {
  options?: Omit<ReactMarkdownOptions, 'children'>;
  children: ReactMarkdownOptions['children'];
  specialItems?: TSpecialItem[];
}

const Markdown: React.FC<IProps> = ({ options, children, specialItems }) => {
  const getComponentFromSpecialItems = (
    child: React.ReactNode & React.ReactNode[],
  ) => {
    if (specialItems) {
      const index = specialItems.findIndex((item) => item.key === child[0]);
      if (index !== -1) return specialItems[index].component;
    }

    return null;
  };

  return (
    <ReactMarkdown
      {...options}
      components={{
        p: ({ node, children: child }) => {
          const ignoreList = ['code', 'a'];

          const { tagName }: any = node.children[0]; // no tagName key 🧐

          if (ignoreList.includes(tagName)) {
            return <div>{child}</div>;
          }

          return <p>{child}</p>;
        },
        a: ({ children: child, href }) => (
          <Link to={String(href)} type="md" regular>
            {child}
          </Link>
        ),
        code: ({ children: child }) => {
          const component = getComponentFromSpecialItems(child);

          if (component) return component;

          return (
            <SyntaxHighlighter
              language="jsx"
              style={vscDarkPlus}
              customStyle={{
                width: 'max-content',
                borderRadius: '1rem',
                fontSize: 'inherit',
              }}
            >
              {String(child[0]).replace(/\n$/, '')}
            </SyntaxHighlighter>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export { Markdown };
