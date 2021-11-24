/* eslint-disable import/no-webpack-loader-syntax */
import { Markdown } from 'components/Markdown';
import stylesPage from 'styles/page.module.scss';

import useMotionValueMD from '!!raw-loader!../../data/use-motion-value.md';
import { Example } from './Example';

const UseMotionValue: React.FC = () => {
  return (
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
      {useMotionValueMD}
    </Markdown>
  );
};

export { UseMotionValue };
