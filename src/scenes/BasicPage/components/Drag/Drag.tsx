/* eslint-disable import/no-webpack-loader-syntax */
import { Markdown } from 'components/Markdown';
import stylesPage from 'styles/page.module.scss';

import dragMD from '!!raw-loader!../../data/drag.md';
import { Example } from './Example';

const Drag: React.FC = () => (
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
    {dragMD}
  </Markdown>
);

export { Drag };
