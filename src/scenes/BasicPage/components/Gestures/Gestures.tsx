/* eslint-disable import/no-webpack-loader-syntax */
import { Markdown } from 'components/Markdown';
import stylesPage from 'styles/page.module.scss';

import gesturesMD from '!!raw-loader!../../data/gestures.md';
import { Example } from './Example';

const Gestures: React.FC = () => (
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
    {gesturesMD}
  </Markdown>
);

export { Gestures };
