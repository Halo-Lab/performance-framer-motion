import cn from 'classnames';
import { motion, useAnimation } from 'framer-motion';
import { useEffectOnce } from 'hooks/use-effect-once';
import { useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import stylesExample from 'styles/example.module.scss';
import convertRemToPixels from 'utils/rem-to-pixels';

import styles from './Example.module.scss';

const Example: React.FC = () => {
  const [keyframes, setKeyframes] = useState({
    first: 3,
    second: -3,
    third: 3,
    last: 0,
  });

  const controls = useAnimation();

  const ref = useRef<HTMLDivElement>(null);
  const refHelicopter = useRef<HTMLDivElement>(null);

  const transformKeyframesToRem = (keyframesObject: object) => {
    return Object.values(keyframesObject).map((value) => `${value}rem`);
  };

  const handleAnimation = () => {
    if (ref.current && refHelicopter.current) {
      const width = ref.current.offsetWidth;
      const { width: widthHelicopter } =
        refHelicopter.current.getBoundingClientRect();

      controls.set({ x: 0 });
      controls.start({
        x: -(width - widthHelicopter - convertRemToPixels(2)),
        y: transformKeyframesToRem(keyframes),
      });
    }
  };

  useEffectOnce(() => {
    handleAnimation();
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setKeyframes((prev) => ({ ...prev, [key]: Number(e.target.value) }));
  };

  const code = `
<motion.div
  animate={{
    y: [${transformKeyframesToRem(keyframes)}]
}}/>`.substr(1);

  return (
    <div className={stylesExample.example}>
      <div
        className={cn(styles.interactive, stylesExample.example__interactive)}
        ref={ref}
      >
        <motion.div
          className={styles.motion}
          animate={controls}
          transition={{ duration: 2 }}
          ref={refHelicopter}
        >
          🚁
        </motion.div>
      </div>
      <div className={cn(styles.code, stylesExample.example__code)}>
        <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
          {code}
        </SyntaxHighlighter>
        <div className={stylesExample.example__divider} />
        <div className={styles.inputs}>
          <input
            className={styles.input}
            type="range"
            value={keyframes.last}
            onChange={(e) => handleChange(e, 'last')}
            min={-3}
            max={3}
            step={0.01}
          />
          <input
            className={styles.input}
            type="range"
            value={keyframes.third}
            onChange={(e) => handleChange(e, 'third')}
            min={-3}
            max={3}
            step={0.01}
          />
          <input
            className={styles.input}
            type="range"
            value={keyframes.second}
            onChange={(e) => handleChange(e, 'second')}
            min={-3}
            max={3}
            step={0.01}
          />
          <input
            className={styles.input}
            type="range"
            value={keyframes.first}
            onChange={(e) => handleChange(e, 'first')}
            min={-3}
            max={3}
            step={0.01}
          />
        </div>
        <div className={styles.control}>
          <h6>Move input (slider) to change helicopter direction</h6>
          <button onClick={handleAnimation} type="button">
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export { Example };
