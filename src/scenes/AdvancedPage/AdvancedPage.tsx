import { FancyBackground } from 'components/FancyBackground';
import { Footer } from 'components/Footer';
import { Nav } from 'components/Nav';
import stylesPage from 'styles/page.module.scss';

import { Layout } from './components/Layout';
import { Reorder } from './components/Reorder';
import { Repeat } from './components/Repeat';

const AdvancedPage: React.FC = () => (
  <>
    <Nav />
    <main className={stylesPage.container}>
      <div className={stylesPage.callout}>
        <span className={stylesPage.callout__emoji}>⭐️</span>
        <p>Supported by &quot;Halo lab&quot;</p>
      </div>
      <div className={stylesPage.md}>
        <FancyBackground emoji="🪃" />
        <Repeat />
      </div>
      <div className={stylesPage.md}>
        <Layout />
      </div>
      <div className={stylesPage.md}>
        <Reorder />
      </div>
    </main>
    <Footer />
  </>
);

export { AdvancedPage };
