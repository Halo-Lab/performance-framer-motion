import cn from 'classnames';
import { motion, Repeat, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import stylesExample from 'styles/example.module.scss';

import styles from './Example.module.scss';

const Example: React.FC = () => {
  const repeatTypeArray: Repeat['repeatType'][] = ['loop', 'mirror', 'reverse'];
  const [repeatType, setRepeatType] =
    useState<typeof repeatTypeArray[number]>('mirror');
  const [repeatDelay, setRepeatDelay] = useState<number>(0);

  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: ['0rem', '20rem'],
      rotate: [0, 360],
      transition: { duration: 1, repeat: Infinity, repeatType, repeatDelay },
    });
  }, [repeatType, repeatDelay, controls]);

  const code = `
<motion.div
  animate={{
    x: ['0rem', '20rem'],
    rotate: [0, 360],
    transition: { 
      duration: 1, 
      repeat: Infinity,
      repeatType: "${repeatType}", 
      repeatDelay: ${repeatDelay} 
    }
  }}
>
  🪃
</motion.div>`.substr(1);

  return (
    <div className={stylesExample.example}>
      <div className={cn(styles.interactive, stylesExample.example__interactive)}>
        <p>🙋‍♂️</p>
        <motion.div key={repeatType} className={styles.motion} animate={controls}>
          🪃
        </motion.div>
      </div>
      <div className={cn(styles.code, stylesExample.example__code)}>
        <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
          {code}
        </SyntaxHighlighter>
        <div className={stylesExample.example__divider} />
        <div className={stylesExample.inputs}>
          <div className={stylesExample.input}>
            <p className={stylesExample.input__p}>Type</p>
            <select
              value={repeatType}
              onChange={(e) => {
                const bypassTypescript = (value: any) => {
                  if (repeatTypeArray.includes(value)) {
                    setRepeatType(value);
                  }
                };

                return bypassTypescript(e.target.value);
              }}
            >
              <option value="loop">loop</option>
              <option value="mirror">mirror</option>
              <option value="reverse">reverse</option>
            </select>
          </div>
          <div className={stylesExample.input}>
            <p className={stylesExample.input__p}>Delay</p>
            <input
              type="range"
              value={repeatDelay}
              onChange={(e) => setRepeatDelay(Number(e.target.value))}
              min={0}
              max={1}
              step={0.01}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Example };
