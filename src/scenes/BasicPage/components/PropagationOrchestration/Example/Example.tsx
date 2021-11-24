import cn from 'classnames';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import stylesExample from 'styles/example.module.scss';

import styles from './Example.module.scss';

const alienVariants: Variants = {
  initial: { rotate: 0, x: 0 },
  animate: {
    rotate: [0, -25, 25, 0],
    x: [0, 25, -25, 0],
    transformOrigin: 'bottom',
  },
};

const Example: React.FC = () => {
  const [enableStagger, setEnableStagger] = useState(false);
  const [staggerChildren, setStaggerChildren] = useState(0.35);
  const [staggerDirection, setStaggerDirection] = useState(1);

  const controls = useAnimation();

  const handleAnimation = () => {
    controls.set('initial');
    controls.start('animate');
  };

  const handleStagger = () => {
    controls.start('initial');
    setEnableStagger((prev) => !prev);
  };

  const handleStaggerDirection = () => {
    setStaggerDirection((prev) => (prev === -1 ? 1 : -1));
  };

  const code = `
<motion.div
  initial={{ rotate: 0, x: 0 }}
  animate={{
    rotate: [0, -25, 25, 0],
    x: [0, 25, -25, 0],
    transformOrigin: 'bottom'
}}/>`.substr(1);

  const codeStagger = `
<motion.div
  initial={{ rotate: 0, x: 0 }}
  animate={{
    rotate: [0, -25, 25, 0],
    x: [0, 25, -25, 0],
    transformOrigin: 'bottom'
  }}
  transition={{
    staggerChildren: ${staggerChildren},
    taggerDirection: ${staggerDirection},
}}/>`.substr(1);

  return (
    <div className={stylesExample.example}>
      <div className={cn(styles.interactive, stylesExample.example__interactive)}>
        <motion.div
          className={styles.motions}
          animate={controls}
          initial="initial"
          transition={
            enableStagger
              ? {
                  staggerChildren,
                  staggerDirection,
                }
              : {}
          }
        >
          <motion.div variants={alienVariants}>👾</motion.div>
          <motion.div variants={alienVariants}>👾</motion.div>
          <motion.div variants={alienVariants}>👾</motion.div>
          <motion.div variants={alienVariants}>👾</motion.div>
        </motion.div>
      </div>
      <div className={cn(styles.code, stylesExample.example__code)}>
        <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
          {enableStagger ? codeStagger : code}
        </SyntaxHighlighter>
        <div className={stylesExample.example__divider} />
        {enableStagger && (
          <div className={stylesExample.input}>
            <p className={stylesExample.input__p}>staggerChildren</p>
            <input
              type="range"
              value={staggerChildren}
              onChange={(e) => setStaggerChildren(Number(e.target.value))}
              min={0}
              max={1}
              step={0.01}
            />
          </div>
        )}
        <div className={styles.control}>
          <button onClick={handleStagger} type="button">
            Stagger
          </button>
          {enableStagger && (
            <button onClick={handleStaggerDirection} type="button">
              Direction ({staggerDirection === -1 ? 'backward' : 'forward'})
            </button>
          )}
          <button onClick={handleAnimation} type="button">
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export { Example };
