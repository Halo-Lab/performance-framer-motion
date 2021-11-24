import { DragHandlers, motion, useAnimation } from 'framer-motion';
import { useRef } from 'react';

import styles from './Pip.module.scss';

const Pip: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const controls = useAnimation();

  const handleDragEnd: DragHandlers['onDragEnd'] = (event, info) => {
    const {
      point: { x, y },
    } = info;

    controls.stop();

    if (containerRef.current && itemRef.current) {
      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();
      const { width: itemWidth, height: itemHeight } =
        itemRef.current.getBoundingClientRect();

      const position = [];

      if (width / 2 > x - left) position.push(-width + itemWidth); // left, (minus because default position of item is right-bottom)
      if (width / 2 < x - left) position.push(0); // right
      if (height / 2 > y - top) position.push(-height + itemHeight); // top, (same as left)
      if (height / 2 < y - top) position.push(0); // bottom

      controls.start({ x: position[0], y: position[1] });
    }
  };

  return (
    <div className={styles.container}>
      <h6 className={styles.container__text}>
        Pip (Picture in picture) – Snap to Corner
      </h6>
      <div className={styles.container__padding} ref={containerRef}>
        <motion.div
          ref={itemRef}
          drag
          dragConstraints={containerRef}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 150 }}
          className={styles.item}
          onDragEnd={handleDragEnd}
          animate={controls}
        >
          👨🏻‍🏫
        </motion.div>
      </div>
    </div>
  );
};

export { Pip };
