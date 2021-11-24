/* eslint-disable import/no-webpack-loader-syntax */
import { Markdown } from 'components/Markdown';
import stylesPage from 'styles/page.module.scss';

import reorderMD from '!!raw-loader!../../data/reorder.md';
import { Example } from './Example';

const Reorder: React.FC = () => (
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
    {reorderMD}
  </Markdown>
);

export { Reorder };
