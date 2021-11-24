import cn from 'classnames';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import stylesExample from 'styles/example.module.scss';

import styles from './Example.module.scss';

interface IProps {
  enableTransition: boolean;
}

const Example: React.FC<IProps> = ({ enableTransition }) => {
  const inputProps = {
    min: -100,
    max: 100,
    step: 1,
  };

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [scale, setScale] = useState(1);
  const [transition, setTransition] = useState(0.35);

  const controls = useAnimation();

  useEffect(() => {
    controls.start({ x, y, scale });
  }, [controls, x, y, scale]);

  const handleClick = () => {
    setX(0);
    setY(0);
    setScale(1);
    setTransition(0.35);
  };

  const code = `
<motion.div
  animate={{  
    x: ${x},
    y: ${y},
    scale: ${scale}
  }}${enableTransition ? `\n  transition={{ duration: ${transition} }}` : ''}
/>`.substr(1);

  return (
    <div className={stylesExample.example}>
      <div className={cn(styles.interactive, stylesExample.example__interactive)}>
        <motion.div
          className={styles.motion}
          transition={enableTransition ? { duration: transition } : {}}
          animate={controls}
        >
          🏄‍♂️
        </motion.div>
      </div>
      <div className={cn(styles.code, stylesExample.example__code)}>
        <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
          {code}
        </SyntaxHighlighter>
        <div className={stylesExample.example__divider} />
        <div className={stylesExample.inputs}>
          <div className={stylesExample.input}>
            <p className={stylesExample.input__p}>X</p>
            <input
              type="range"
              value={x}
              onChange={(e) => setX(Number(e.target.value))}
              {...inputProps}
            />
          </div>
          <div className={stylesExample.input}>
            <p className={stylesExample.input__p}>Y</p>
            <input
              type="range"
              value={y}
              onChange={(e) => setY(Number(e.target.value))}
              {...inputProps}
            />
          </div>
          <div className={stylesExample.input}>
            <p className={stylesExample.input__p}>Scale</p>
            <input
              type="range"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              min={0.25}
              max={1}
              step={0.01}
            />
          </div>
          {enableTransition && (
            <div className={stylesExample.input}>
              <p className={stylesExample.input__p}>Duration</p>
              <input
                type="range"
                value={transition}
                onChange={(e) => setTransition(Number(e.target.value))}
                min={0}
                max={1}
                step={0.01}
              />
            </div>
          )}
        </div>
        <div className={styles.control}>
          <h6>Change parameters to animate</h6>
          <button onClick={handleClick} type="button">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export { Example };
