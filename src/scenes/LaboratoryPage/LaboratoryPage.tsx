import cn from 'classnames';
import { Footer } from 'components/Footer';
import { Nav } from 'components/Nav';
import stylesPage from 'styles/page.module.scss';

import { Cart } from './components/Cart';
import { LockedCard } from './components/LockedCard';
import { Pip } from './components/Pip';

const LaboratoryPage: React.FC = () => (
  <>
    <Nav />
    <main className={cn(stylesPage.container, stylesPage['container--lab'])}>
      <div className={stylesPage.callout}>
        <span className={stylesPage.callout__emoji}>💡</span>
        <p>Showcase of small examples</p>
      </div>
      <Pip />
      <LockedCard />
      <Cart />
    </main>
    <Footer />
  </>
);

export { LaboratoryPage };
