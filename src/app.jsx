// third-party imports
import { Route, Switch } from 'react-router-dom';

// imports
import Login from './pages/login';
import Signup from './pages/signup';
import Questions from './pages/questions';
import Question from './pages/question';
import Profile from './pages/profile';
import ProtectedRoute from './components/protected_route';

// style imports
import styles from './app.module.css';

function App() {
  return (
    <div className={styles.container}>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <ProtectedRoute path='/questions/:id' component={Question} />
        <ProtectedRoute path='/profile' component={() => <Profile />} />
        <ProtectedRoute path='/users/:id' component={() => <Profile />} />
        <ProtectedRoute path='/' component={Questions} />
      </Switch>
    </div>
  );
}

export default App;
