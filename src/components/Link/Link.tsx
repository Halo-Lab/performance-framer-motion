import cn from 'classnames';
import {
  Link as ReactRouterDomLink,
  NavLink as ReactRouterDomNavLink,
} from 'react-router-dom';

import styles from './Link.module.scss';

interface IProps {
  to: string;
  type?: 'logo' | 'nav' | 'footer' | 'md';
  regular?: boolean;
}

const Link: React.FC<IProps> = ({ to, type, regular, children }) => {
  const linkClassName = cn(styles.link, {
    [styles[`link--${type}`]]: type,
  });

  if (type === 'nav') {
    return (
      <ReactRouterDomNavLink
        className={styles['nav-link']}
        activeClassName={cn(styles['nav-link'], styles['nav-link--active'])}
        exact
        to={to}
      >
        {children}
      </ReactRouterDomNavLink>
    );
  }

  if (regular) {
    return (
      <a
        className={cn(linkClassName, styles.regular)}
        href={to}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <ReactRouterDomLink className={linkClassName} to={to}>
      {children}
    </ReactRouterDomLink>
  );
};

export { Link };
