import { AnimatePresence, motion, useAnimation, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

import styles from './LockedCard.module.scss';

const backgroundVariants: Variants = {
  hover: {
    width: '100%',
    height: '100%',
  },
  fill: {
    width: '0%',
    height: '0%',
  },
};

const fillVariants: Variants = {
  initial: { width: '0px', height: '0px' },
  fill: {
    width: '1250%',
    height: '1250%',
  },
};

const blockVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const LockedCard: React.FC = () => {
  const [isLocked, setIsLocked] = useState(false);

  const controls = useAnimation();

  useEffect(() => {
    controls.set(isLocked ? 'fill' : 'initial');
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    controls.start(isLocked ? 'fill' : 'initial');
  }, [controls, isLocked]);

  const handleClick = () => setIsLocked((prev) => !prev);

  return (
    <motion.div className={styles.container}>
      <motion.div
        className={styles.lock}
        onClick={handleClick}
        whileHover={isLocked ? '' : 'hover'} // Reduce pointless animation.
        animate={controls}
        aria-hidden
      >
        <p className={styles.lock__emoji}>{isLocked ? '🔒' : '🔓'}</p>
        <motion.div
          className={styles.lock__background}
          variants={backgroundVariants}
        />
        <motion.div
          className={styles.lock__fill}
          variants={fillVariants}
          transition={{ duration: 0.35 }}
        />
      </motion.div>
      <AnimatePresence>
        {isLocked && (
          <motion.div
            className={styles.block}
            variants={blockVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <p>Locked</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export { LockedCard };
