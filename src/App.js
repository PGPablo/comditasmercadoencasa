import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

//firebase
import { auth } from './firebase'

//Componentes
import FormBag from './component/FormBag'
import Login from './component/Login'
import Dashboard from './component/dashboard/Dashboard'
import Thanks from './component/Thanks'

function App() {

  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(() => {
    const fetchUser = () => {
      auth.onAuthStateChanged(user => {
        if (user) {
          setFirebaseUser(user)
        } else {
          setFirebaseUser(null)
        }
      })
    }
    fetchUser()
  }, [])

  const RutaPrivada = ({ component, path, ...rest }) => {
    if (localStorage.getItem('usuario')) {
      const usuarioStorage = JSON.parse(localStorage.getItem('usuario'))


      if (usuarioStorage.uid === firebaseUser.uid) {
        return <Route component={component} path={path} {...rest} />
      } else {
        return <Redirect to="/login" {...rest} />
      }
    } else {
      return <Redirect to="/login" {...rest} />
    }
  }


  return (

    <div className="App">

      {
        firebaseUser !== false ? (
          <Router>
            <Switch>
                <Route path="/home" component={FormBag} />
                <Route exact path="/" render={() => (
                  <Redirect
                    to='/home'
                  />
                )}
                />
                <Route path="/login" component={Login} />
                <Route path="/success" component={Thanks} />

              <RutaPrivada path="/dashboard" component={Dashboard} />
            </Switch>
          </Router>
        ) : (
            <div className="container border mt-5 mb-5 text-center">
              <div className="spinner-grow text-warning mt-5 mb-5" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )
      }
    </div>
  );
}

export default App;
