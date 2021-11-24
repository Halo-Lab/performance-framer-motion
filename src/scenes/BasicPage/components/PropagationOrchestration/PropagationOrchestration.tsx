/* eslint-disable import/no-webpack-loader-syntax */
import { Markdown } from 'components/Markdown';
import stylesPage from 'styles/page.module.scss';

import propagationOrchestrationMD from '!!raw-loader!../../data/propagation-orchestration.md';
import { Example } from './Example';

const PropagationOrchestration: React.FC = () => {
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
      {propagationOrchestrationMD}
    </Markdown>
  );
};

export { PropagationOrchestration };
