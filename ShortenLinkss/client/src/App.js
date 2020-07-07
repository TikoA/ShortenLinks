import React from 'react';
import 'materialize-css'
import {useroutes} from "./routes";
import {BrowserRouter} from "react-router-dom";
import {useAuth} from "./hooks/authhook";
import {AuthContext} from "./Context/AuthContext";
import {Navbar} from "./Components/Navbar";
import {Loader} from "./Components/Loader";

const App = () => {
    const {token , login, logout, userId, ready} = useAuth()
    const isAuth = !!token
    const routes = useroutes(isAuth)
    if (!ready) {
        return <Loader />
    }
    return (
         <AuthContext.Provider value={{
             token, login, logout, userId, isAuth
         }} >
      <BrowserRouter >
          {isAuth && <Navbar />}
    <div className="container">
        {routes}
    </div>
          </BrowserRouter >
        </AuthContext.Provider>
  );
}

export default App;
