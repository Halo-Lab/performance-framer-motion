import cn from 'classnames';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import stylesExample from 'styles/example.module.scss';

import styles from './Example.module.scss';

const variants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const variantsIfClouds: Variants = {
  initial: { opacity: 0, width: 0, transition: { opacity: { duration: 0.15 } } },
  animate: { opacity: 1, width: 'auto' },
  exit: { opacity: 0, width: 0, transition: { opacity: { duration: 0.15 } } },
};

interface IProps {
  enableClouds: boolean;
}

const Example: React.FC<IProps> = ({ enableClouds }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    setIsVisible((prev) => !prev);
  };

  const code = `
<AnimatePresence>
  {isVisible && (
    <motion.div
      key="moon"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
    >
      🌙
    </motion.div>
  )}
</AnimatePresence>`.substr(1);

  const codeIfClouds = `
<AnimatePresence>
  {isVisible && (
    <motion.div
      key="moon"
      style={{ overflow: 'hidden' }}
      animate={{ opacity: 1, width: 0 }}
      initial={{ opacity: 0, width: 'auto' }}
      exit={{ opacity: 0, width: 0  }}
    >
      🌙
    </motion.div>
  )}
</AnimatePresence>`.substr(1);

  return (
    <div className={stylesExample.example}>
      <div className={cn(styles.interactive, stylesExample.example__interactive)}>
        {enableClouds && <div className={styles.motion}>☁️</div>}
        <AnimatePresence>
          {isVisible && (
            <motion.div
              key="moon"
              className={styles.motion}
              style={enableClouds ? { overflow: 'hidden' } : {}}
              variants={enableClouds ? variantsIfClouds : variants}
              animate="animate"
              initial="initial"
              exit="exit"
            >
              🌙
            </motion.div>
          )}
        </AnimatePresence>
        {enableClouds && <div className={styles.motion}>☁️</div>}
      </div>
      <div className={cn(styles.code, stylesExample.example__code)}>
        <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
          {enableClouds ? codeIfClouds : code}
        </SyntaxHighlighter>
        <div className={stylesExample.example__divider} />
        <button onClick={handleClick} type="button">
          {isVisible ? 'Unmount' : 'Mount'}
        </button>
        <div className={styles.control}>
          <h6>Click to mount / unmount component</h6>
        </div>
      </div>
    </div>
  );
};

export { Example };
