import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import * as sessionActions from './store/session';

const App = () => {
  const dispatch = useDispatch(),
    [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    isLoaded && (
      <Switch>
        <Route exact path="/login">
          <LoginFormPage />
        </Route>
        <Route exact path="/">
          <h1>Hello from App</h1>
        </Route>
      </Switch>
    )
  );
};

export default App;
