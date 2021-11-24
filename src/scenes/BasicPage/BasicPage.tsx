/* eslint-disable import/no-webpack-loader-syntax */
import { FancyBackground } from 'components/FancyBackground';
import { Footer } from 'components/Footer';
import { Markdown } from 'components/Markdown';
import { Nav } from 'components/Nav';
import stylesPage from 'styles/page.module.scss';

import componentMotionMD from '!!raw-loader!./data/component-motion.md';
import { AnimatePresence } from './components/AnimatePresence';
import { Drag } from './components/Drag';
import { Gestures } from './components/Gestures';
import { Keyframes } from './components/Keyframes';
import { PropAnimate } from './components/PropAnimate';
import { PropagationOrchestration } from './components/PropagationOrchestration';
import { UseMotionValue } from './components/UseMotionValue';

const BasicPage: React.FC = () => (
  <>
    <Nav />
    <main className={stylesPage.container}>
      <div className={stylesPage.callout}>
        <span className={stylesPage.callout__emoji}>🔍</span>
        <p>Based on version 5.3.1</p>
      </div>
      <div className={stylesPage.md}>
        <Markdown>{componentMotionMD}</Markdown>
      </div>
      <div className={stylesPage.md}>
        <PropAnimate />
      </div>
      <div className={stylesPage.md}>
        <AnimatePresence />
      </div>
      <div className={stylesPage.md}>
        <Keyframes />
      </div>
      <div className={stylesPage.md}>
        <FancyBackground emoji="👾" />
        <PropagationOrchestration />
      </div>
      <div className={stylesPage.md}>
        <Gestures />
      </div>
      <div className={stylesPage.md}>
        <Drag />
      </div>
      <div className={stylesPage.md}>
        <UseMotionValue />
      </div>
    </main>
    <Footer />
  </>
);

export { BasicPage };
