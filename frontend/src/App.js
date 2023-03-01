import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormModal';
import SignupFormPage from './components/SignupFormPage';
import ShowsIndex from './components/Shows';
import AddShowForm from './components/AddShowForm';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';

const App = () => {
  const dispatch = useDispatch(),
    [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <h1>Hello from App</h1>
          </Route>
          <Route exact path="/shows">
            <ShowsIndex />
          </Route>
          <Route exact path="/new-show">
            <AddShowForm />
          </Route>
        </Switch>
      )}
    </>
  );
};

export default App;
