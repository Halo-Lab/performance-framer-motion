/* eslint-disable import/no-webpack-loader-syntax */
import { Markdown } from 'components/Markdown';
import stylesPage from 'styles/page.module.scss';

import layoutMD from '!!raw-loader!../../data/layout.md';
import { Example } from './Example';
import { SecondExample } from './SecondExample';
import { ThirdExample } from './ThirdExample';

const Layout: React.FC = () => (
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
      {
        key: 'secondExample',
        component: (
          <div className={stylesPage.md__code}>
            <SecondExample />
          </div>
        ),
      },
      {
        key: 'thirdExample',
        component: (
          <div className={stylesPage.md__code}>
            <ThirdExample />
          </div>
        ),
      },
    ]}
  >
    {layoutMD}
  </Markdown>
);

export { Layout };
