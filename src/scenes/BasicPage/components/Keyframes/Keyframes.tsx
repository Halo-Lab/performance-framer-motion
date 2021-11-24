/* eslint-disable import/no-webpack-loader-syntax */
import { Markdown } from 'components/Markdown';
import stylesPage from 'styles/page.module.scss';

import keyframesMD from '!!raw-loader!../../data/keyframes.md';
import { Example } from './Example';

const Keyframes: React.FC = () => (
  <Markdown
    specialItems={[
      {
        key: 'codeExample',
        component: (
          <div className={stylesPage.md__code}>
            <Example />
          </div>
        ),
      },
    ]}
  >
    {keyframesMD}
  </Markdown>
);

export { Keyframes };
