/* eslint-disable import/no-webpack-loader-syntax */
import { Markdown } from 'components/Markdown';
import { useState } from 'react';
import stylesPage from 'styles/page.module.scss';

import animatePresenceMD from '!!raw-loader!../../data/animate-presence.md';
import { Example } from './Example';

const AnimatePresence: React.FC = () => {
  const [enableClouds, setEnableClouds] = useState(false);

  return (
    <Markdown
      specialItems={[
        {
          key: 'codeExample',
          component: (
            <div className={stylesPage.md__code}>
              <Example enableClouds={enableClouds} />
            </div>
          ),
        },
        {
          key: 'buttonClouds',
          component: (
            <button
              className={stylesPage.md__button}
              onClick={() => setEnableClouds(!enableClouds)}
              type="button"
            >
              {enableClouds ? 'Remove' : 'Add'}
            </button>
          ),
        },
      ]}
    >
      {animatePresenceMD}
    </Markdown>
  );
};

export { AnimatePresence };
