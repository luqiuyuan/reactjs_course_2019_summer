// third-party imports
import { Route, Switch } from 'react-router-dom';

// imports
import Login from './pages/login';
import Signup from './pages/signup';

// style imports
import styles from './app.module.css';

function App() {
  return (
    <div className={styles.container}>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
