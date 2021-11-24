import cn from 'classnames';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import stylesExample from 'styles/example.module.scss';

import styles from './ThirdExample.module.scss';

const ThirdExample: React.FC = () => {
  const [items, setItems] = useState([
    {
      id: '1001',
      emoji: '🎃',
    },
    {
      id: '1002',
      emoji: '👻',
    },
    {
      id: '1003',
      emoji: '👹',
    },
    {
      id: '1004',
      emoji: '👽',
    },
  ]);

  const shuffle = (array: any[]) => {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // eslint-disable-next-line no-param-reassign
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const code = `
<motion.div
  onClick={() => 
    setItems((prev) => shuffle([...prev])
  )}
>
  {items.map((item) => (
    <motion.div key={item.id} layout="position">
      {item.emoji}
    </motion.div>
  ))}
</motion.div>`.substr(1);

  const codeSecond = `
Array: ${JSON.stringify(items.map((item) => item.emoji))}`.substr(1);

  return (
    <div className={stylesExample.example}>
      <motion.div
        className={cn(styles.interactive, stylesExample.example__interactive)}
        onClick={() => setItems((prev) => shuffle([...prev]))}
        aria-hidden
      >
        {items.map((item) => (
          <motion.div className={styles.motion} key={item.id} layout="position">
            {item.emoji}
          </motion.div>
        ))}
        <h6 className={styles.text}>Click to Shuffle</h6>
      </motion.div>
      <div className={cn(styles.code, stylesExample.example__code)}>
        <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
          {code}
        </SyntaxHighlighter>
        <div className={stylesExample.example__divider} />
        <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
          {codeSecond}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export { ThirdExample };
