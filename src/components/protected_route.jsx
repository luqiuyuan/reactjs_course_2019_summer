// third-party imports
import { Route, Redirect } from 'react-router-dom';

function isLoggedIn() {
  if (localStorage.user_id && localStorage.user_token_key) {
    console.log('log in');
    return true;
  } else {
    console.log("not login")
    return false;
  }
}

export default function ProtectedRoute(props) {

  return (
    <Route
      {...props}
      component={isLoggedIn()? props.component : () => <Redirect to={{ pathname: '/login' }} />} />
  );

}
