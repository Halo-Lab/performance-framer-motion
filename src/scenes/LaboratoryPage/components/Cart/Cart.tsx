import cn from 'classnames';
import {
  AnimatePresence,
  AnimationControls,
  motion,
  useAnimation,
} from 'framer-motion';
import { useEffect, useState } from 'react';

import styles from './Cart.module.scss';

const products = [
  {
    id: '1',
    emoji: '🍅',
    title: 'tomato',
  },
  {
    id: '2',
    emoji: '🍏',
    title: 'apple',
  },
  {
    id: '3',
    emoji: '🍊',
    title: 'orange',
  },
  {
    id: '4',
    emoji: '🍇',
    title: 'grape',
  },
];

const Cart: React.FC = () => {
  const cartControls = useAnimation();
  const [itemsInCart, setItemsInCart] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {products.map((product) => (
          <Product
            key={product.id}
            data={product}
            cartControls={cartControls}
            setItemsInCart={setItemsInCart}
          />
        ))}
      </div>
      <div className={styles.cart}>
        {itemsInCart > 0 && (
          <motion.div className={styles.count}>
            <AnimatePresence>
              <motion.span
                key={`count-${itemsInCart}`}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ position: 'absolute', y: 10, opacity: 0 }}
              >
                {itemsInCart}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        )}
        <motion.span animate={cartControls}>🛒</motion.span>
      </div>
    </div>
  );
};

interface IProduct {
  data: typeof products[number];
  cartControls: AnimationControls;
  setItemsInCart: React.Dispatch<React.SetStateAction<number>>;
}

const Product: React.FC<IProduct> = ({ data, cartControls, setItemsInCart }) => {
  const [startTransfer, setStartTransfer] = useState(false);

  const controls = useAnimation();

  const handleClick = () => {
    setStartTransfer(true);
  };

  useEffect(() => {
    if (startTransfer) {
      controls
        .start({
          scale: 0,
          right: 0,
          bottom: 0,
        })
        .then(() => {
          cartControls.start({ rotate: [0, -10, 10, 0] });
          setStartTransfer(false);
          setItemsInCart((prev) => prev + 1);
        });
    }
  }, [startTransfer, controls, cartControls, setItemsInCart]);

  return (
    <div
      className={cn(styles.product, styles[`product--${data.title}`])}
      onClick={() => handleClick()}
      aria-hidden
    >
      <span className={styles.product__emoji}>{data.emoji}</span>
      <p className={styles.product__title}>{data.title}</p>
      {/* copy of Product */}
      {startTransfer && (
        <motion.div
          className={cn(styles.product, styles[`product--${data.title}`])}
          initial={{ position: 'absolute' }}
          animate={controls}
          transition={{ duration: 0.75 }}
        >
          <span className={styles.product__emoji}>{data.emoji}</span>
          <p className={styles.product__title}>{data.title}</p>
        </motion.div>
      )}
    </div>
  );
};

export { Cart };
