import { Link } from '../Link';

import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  const linkBeginnerCourse =
    'https://leveluptutorials.com/tutorials/animating-react-with-framer-motion/series-introduction';

  const linkAdvancedCourse =
    'https://leveluptutorials.com/tutorials/advanced-animating-react-with-framer-motion/what-s-new-in-framer-motion-2';

  const linkDocumentation = 'https://www.framer.com/docs/';

  const linkGithub = 'https://github.com/DevWaterdrop';

  return (
    <footer className={styles.container}>
      <div className={styles.links}>
        <Link to={linkBeginnerCourse} type="footer" regular>
          🍿 Animating React with Framer Motion
        </Link>
        <Link to={linkAdvancedCourse} type="footer" regular>
          🍿 Advanced Animating React with Framer Motion
        </Link>
        <Link to={linkDocumentation} type="footer" regular>
          📚 Framer Motion Documentation
        </Link>
      </div>
      <Link to={linkGithub} type="footer" regular>
        💧 DevWaterdrop
      </Link>
    </footer>
  );
};

export { Footer };
