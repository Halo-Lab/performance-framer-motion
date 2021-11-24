import cn from 'classnames';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import stylesExample from 'styles/example.module.scss';

import styles from './Example.module.scss';

const Example: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  const [layoutComplete, setLayoutComplete] = useState(false);

  const handleClick = () => {
    setToggle((prev) => !prev);
    setLayoutComplete(false);
  };

  const code = `
const [toggle, setToggle] = useState(false);
...
<motion.div
  style={{ 
    justifyContent: "${toggle ? 'flex-end' : 'flex-start'}"
  }}
>
  <motion.p 
    layout="position"
    layoutDependency={toggle} // performance 🚀
  >11:43 AM</motion.p>
</motion.div>`.substr(1);

  const status = `
AnimComplete: ${layoutComplete} // onLayoutAnimationComplete`.substr(1);

  return (
    <div className={stylesExample.example}>
      <div
        className={cn(styles.interactive, stylesExample.example__interactive)}
        onClick={handleClick}
        aria-hidden
      >
        <motion.div
          className={styles.motion}
          style={{ justifyContent: toggle ? 'flex-end' : 'flex-start' }}
        >
          <motion.p
            layout="position"
            layoutDependency={toggle}
            onLayoutAnimationComplete={() => setLayoutComplete(true)}
            transition={{ duration: 0.75 }}
          >
            11:43 AM
          </motion.p>
        </motion.div>
        <h6 className={styles.text}>Click to change justifyContent</h6>
      </div>
      <div className={cn(styles.code, stylesExample.example__code)}>
        <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
          {code}
        </SyntaxHighlighter>
        <div className={stylesExample.example__divider} />
        <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
          {status}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export { Example };
