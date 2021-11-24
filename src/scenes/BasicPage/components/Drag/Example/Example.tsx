import cn from 'classnames';
import { motion, useAnimation } from 'framer-motion';
import { useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import stylesExample from 'styles/example.module.scss';

import styles from './Example.module.scss';

const Example: React.FC = () => {
  const controls = useAnimation();

  const dragConstraintsRef = useRef(null);

  const [swap, setSwap] = useState(false);

  const handleClick = () => {
    controls.start({ x: 0, y: 0 });
    setSwap((prev) => !prev);
  };

  const code = `
<motion.div
  drag
  dragConstraints={
    { left: 0, right: 0, bottom: 0, top: 0 }
  }
/>`.substr(1);

  const codeAfterSwap = `
<div ref={dragConstraintsRef}>
  <motion.div
    drag
    dragConstraints={dragConstraintsRer}
  />
</div>`.substr(1);

  return (
    <div className={stylesExample.example}>
      <div
        className={cn(styles.interactive, stylesExample.example__interactive)}
        ref={dragConstraintsRef}
      >
        <motion.div
          className={styles.motion}
          drag
          dragConstraints={
            swap ? dragConstraintsRef : { left: 0, right: 0, bottom: 0, top: 0 }
          }
          animate={controls}
          whileDrag={{ scale: 1.05 }}
        >
          <p className={styles.motion__emoji}>🌞</p>
          <p>I&apos;m draggable</p>
        </motion.div>
      </div>
      <div className={cn(styles.code, stylesExample.example__code)}>
        <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
          {swap ? codeAfterSwap : code}
        </SyntaxHighlighter>
        <div className={stylesExample.example__divider} />
        <button onClick={handleClick} type="button">
          Swap
        </button>
        <div className={styles.control}>
          <h6>Click to swap dragConstraints value</h6>
        </div>
      </div>
    </div>
  );
};

export { Example };
