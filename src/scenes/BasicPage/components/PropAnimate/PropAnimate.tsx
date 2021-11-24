/* eslint-disable import/no-webpack-loader-syntax */
import { Markdown } from 'components/Markdown';
import { useState } from 'react';
import stylesPage from 'styles/page.module.scss';

import propAnimateMD from '!!raw-loader!../../data/prop-animate.md';
import { Example } from './Example';

const PropAnimate: React.FC = () => {
  const [enableTransition, setEnableTransition] = useState(false);

  return (
    <Markdown
      specialItems={[
        {
          key: 'codeExample',
          component: (
            <div className={stylesPage.md__code}>
              <Example enableTransition={enableTransition} />
            </div>
          ),
        },
        {
          key: 'buttonTransition',
          component: (
            <button
              className={stylesPage.md__button}
              onClick={() => setEnableTransition(!enableTransition)}
              type="button"
            >
              {enableTransition ? 'Remove' : 'Add'}
            </button>
          ),
        },
      ]}
    >
      {propAnimateMD}
    </Markdown>
  );
};

export { PropAnimate };
