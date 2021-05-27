import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import CocktailsContainer from "./components/Cocktails";
import CreateCocktailForm from "./components/CocktailsCreateForm"
import EditCocktailForm from "./components/EditCocktailForm";
import EditUserForm from './components/EditUserForm'
import HomePage from './components/HomePage'


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/" exact>
        <HomePage/>
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/cocktails'>
            <CocktailsContainer/>
          </Route>
          <Route path='/create' exact>
          <CreateCocktailForm/>
          </Route>
          <Route path='/edit/:cocktailId'>
            <EditCocktailForm/>
          </Route>
          <Route path='/editUser/:userId'>
            <EditUserForm/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;