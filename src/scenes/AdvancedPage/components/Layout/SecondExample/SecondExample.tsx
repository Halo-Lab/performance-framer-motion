import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import stylesExample from 'styles/example.module.scss';

import styles from './SecondExample.module.scss';

const SecondExample: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const text = 'Layout example';

  const code = `
<motion.div>
  <motion.p layoutId="text">
    Layout example
  </motion.p>
</motion.div>
<AnimatePresence initial={false}>
  {loading && (
    <motion.div ...>
      <motion.p layoutId="text">
        Layout example
      </motion.p>
    </motion.div>
  )}
</AnimatePresence>`.substr(1);

  const codeSecond = `
${loading ? '💤' : '👀'} Loading: ${loading}`.substr(1);

  return (
    <div className={stylesExample.example}>
      <div
        className={cn(styles.interactive, stylesExample.example__interactive)}
        onClick={() => setLoading((prev) => !prev)}
        aria-hidden
      >
        <motion.div className={styles.motion__head}>
          <motion.p className={styles['motion__head-text']} layoutId="text">
            {text}
          </motion.p>
        </motion.div>
        <AnimatePresence initial={false}>
          {loading && (
            <motion.div
              className={styles.motion}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.p layoutId="text">{text}</motion.p>
            </motion.div>
          )}
        </AnimatePresence>
        <h6 className={styles.text}>Click to change scene</h6>
      </div>
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

export { SecondExample };
