/* eslint-disable import/no-webpack-loader-syntax */
import { Markdown } from 'components/Markdown';
import stylesPage from 'styles/page.module.scss';

import repeatMD from '!!raw-loader!../../data/repeat.md';
import { Example } from './Example';

const Repeat: React.FC = () => (
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
    {repeatMD}
  </Markdown>
);

export { Repeat };
