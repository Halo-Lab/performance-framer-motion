import { Link } from '../Link';

import styles from './Nav.module.scss';

const Nav: React.FC = () => (
  <nav className={styles.container}>
    <Link to="/" type="logo">
      📦
    </Link>
    <div className={styles.links}>
      <Link to="/" type="nav">
        🧩 Basic
      </Link>
      <Link to="/advanced" type="nav">
        🤹 Advanced
      </Link>
      <Link to="/lab" type="nav">
        🧪 Laboratory
      </Link>
    </div>
  </nav>
);

export { Nav };
