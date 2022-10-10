import logo from './logo.svg';
import './App.css';
import Router from './Router'
import {BrowserRouter} from 'react-router-dom'
import {useAuthContext} from './hooks/useAuthContext'
import {useEffect} from 'react'
import {ActiveProjectProvider} from './context/ActiveProject'
function App() {

  const {authIsReady} = useAuthContext()

  return (
    <div className="App">
      //wait for authentication state to be known
      {authIsReady && <BrowserRouter>
        <ActiveProjectProvider>
          <Router />
        </ActiveProjectProvider>

      </BrowserRouter>}


    </div>
  );
}

export default App;
