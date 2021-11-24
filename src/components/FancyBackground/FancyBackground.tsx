import cn from 'classnames';

import styles from './FancyBackground.module.scss';

interface IProps {
  emoji: string;
}

const FancyBackground: React.FC<IProps> = ({ emoji }) => {
  return (
    <div className={styles.container}>
      <div className={cn(styles.emoji, styles['emoji--first'])}>{emoji}</div>
      <div className={cn(styles.emoji, styles['emoji--second'])}>{emoji}</div>
      <div className={cn(styles.emoji, styles['emoji--third'])}>{emoji}</div>
      <div className={cn(styles.emoji, styles['emoji--fourth'])}>{emoji}</div>
      <div className={cn(styles.emoji, styles['emoji--fifth'])}>{emoji}</div>
    </div>
  );
};

export { FancyBackground };
