import cn from 'classnames';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import stylesExample from 'styles/example.module.scss';

import styles from './Example.module.scss';

const variants: Variants = {
  hover: { rotate: 45 },
  tap: { scale: 0.75 },
  hoverEnd: { rotate: -45 },
  view: {
    x: ['0rem', '-2rem'],
    y: ['0rem', '-2rem'],
    transition: { repeat: Infinity, repeatType: 'mirror' },
  },
};

const Example: React.FC = () => {
  const [status, setStatus] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const [viewportControl, setViewportControl] = useState(false);

  const starsControls = useAnimation();

  const handleOnViewportEnter = () => {
    setStatus(true);
    setShowStars(true);

    starsControls
      .start({
        opacity: [0, 0.95, 0],
        scale: [0, 1, 0],
        rotate: [45, 0, -45],
        transition: { duration: 2 },
      })
      .finally(() => setShowStars(false));
  };

  const handleOnViewportLeave = () => {
    starsControls.stop();

    setStatus(false);
    setShowStars(false);
  };

  const handleClick = () => {
    setViewportControl((prev) => !prev);
  };

  const code = `
<motion.div
  whileHover={{ rotate: 45 }}
  whileTap={{ scale: 0.75 }}
/>`.substr(1);

  const codeWithViewport = `
<motion.div
  whileHover={{ rotate: 45 }}
  whileTap={{ scale: 0.75 }}
  whileInView={{
    x: ['-2rem', '2rem'],
    y: ['2rem', '-2rem'],
    transition: { 
      repeat: Infinity, 
      repeatType: 'mirror' 
    }
  }}
  viewport={{ 
    margin: '-5% 0% -5% 0%', 
    once: false 
  }}
  onViewportEnter={handleEnter}
  onViewportLeave={handleLeave}
/>`.substr(1);

  const codeSecond = `
🔍 inViewPort: ${status}
✨ showStars: ${showStars} // shows on enter`.substr(1);

  return (
    <div className={stylesExample.example}>
      <div className={cn(styles.interactive, stylesExample.example__interactive)}>
        {viewportControl ? (
          <motion.div
            className={styles.motion}
            variants={variants}
            whileHover="hover"
            whileTap="tap"
            whileInView="view"
            viewport={{ margin: '-5% 0% -5% 0%', once: false }}
            onViewportEnter={handleOnViewportEnter}
            onViewportLeave={handleOnViewportLeave}
          >
            🦄
            <motion.div className={styles.motion__stars} animate={starsControls}>
              ✨
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            className={styles.motion}
            variants={variants}
            whileHover="hover"
            whileTap="tap"
          >
            🦄
          </motion.div>
        )}
      </div>
      <div className={cn(styles.code, stylesExample.example__code)}>
        <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
          {viewportControl ? codeWithViewport : code}
        </SyntaxHighlighter>
        <div className={stylesExample.example__divider} />
        {viewportControl && (
          <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
            {codeSecond}
          </SyntaxHighlighter>
        )}
        <div className={styles.control}>
          <h6>Click to add/remove viewport control</h6>
          <button onClick={handleClick} type="button">
            {viewportControl ? 'Remove' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export { Example };
