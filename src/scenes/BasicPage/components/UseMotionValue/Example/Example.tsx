import cn from 'classnames';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useEffectOnce } from 'hooks/use-effect-once';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import stylesExample from 'styles/example.module.scss';
import convertRemToPixels from 'utils/rem-to-pixels';

import styles from './Example.module.scss';

const Example: React.FC = () => {
  const [eggStatus, setEggStatus] = useState('🥚');
  const [xState, setXState] = useState(0);
  const [scaleState, setScaleState] = useState(0);

  const distanceInRem = 10;
  const distanceInPixels = convertRemToPixels(distanceInRem);

  const grid = { right: distanceInPixels, left: -distanceInPixels, center: 0 };

  const controls = useAnimation();

  const x = useMotionValue(0);
  const scale = useTransform(x, [grid.right, 0, grid.left], [1.15, 1, 1.5]);

  useEffectOnce(() => {
    setXState(x.get());
    setXState(scale.get());

    x.onChange(() => {
      const localX = x.get();
      const gap = 50;
      setXState(localX);

      if (localX >= grid.right - gap) {
        return setEggStatus('🐣');
      }

      if (localX <= grid.left + gap) {
        return setEggStatus('🍳');
      }

      return setEggStatus('🥚');
    });

    x.onChange(() => {
      setScaleState(scale.get());
    });

    return () => {
      x.destroy();
      scale.destroy();
    };
  });

  const handleDragEnd = () => {
    const localX = x.get();
    const gap = 50;

    controls.stop();

    if (localX >= grid.right - gap) {
      return controls.start({ x: grid.right });
    }

    if (localX <= grid.left + gap) {
      return controls.start({ x: grid.left });
    }

    return controls.start({ x: grid.center });
  };

  const code = `
const x = useMotionValue(0);
const scale = useTransform(
  x, 
  [grid.right, 0, grid.left], 
  [1.15, 1, 1.5]
);
// ...
<motion.div style={{ x, scale }}/>`.substr(1);

  const codeSecond = `
eggStatus: ${eggStatus}
x: ${xState}
scale: ${scaleState}`.substr(1);

  return (
    <div className={stylesExample.example}>
      <div className={cn(styles.interactive, stylesExample.example__interactive)}>
        <motion.div
          className={styles.motion}
          style={{ x, scale }}
          drag="x"
          dragConstraints={{
            left: grid.left - 20,
            right: grid.right + 20,
          }}
          onDragEnd={() => handleDragEnd()}
          dragElastic={0.1}
          animate={controls}
        >
          {eggStatus}
        </motion.div>
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

export { Example };
