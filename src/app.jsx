// third-party imports
import { Route, Switch } from 'react-router-dom';

// imports
import Login from './pages/login';

// style imports
import styles from './app.module.css';

function App() {
  return (
    <div className={styles.container}>
      <Switch>
        <Route path='/login' component={Login} />
      </Switch>
    </div>
  );
}

export default App;
