import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AdvancedPage } from 'scenes/AdvancedPage';
import { BasicPage } from 'scenes/BasicPage';
import { LaboratoryPage } from 'scenes/LaboratoryPage';

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path="/advanced">
        <AdvancedPage />
      </Route>
      <Route exact path="/lab">
        <LaboratoryPage />
      </Route>
      <Route exact path="/">
        <BasicPage />
      </Route>
    </Switch>
  </Router>
);

export { App };
