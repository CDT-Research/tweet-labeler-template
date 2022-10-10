import {useState, useEffect} from 'react'
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import ClippedDrawer from './pages/ClippedDrawer'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NewProject from './pages/NewProject'
import UserPage from './pages/UserPage'
import {useAuthContext} from './hooks/useAuthContext'
import FileLoader from './pages/FileLoader'
import Export from './pages/Export'
import TweetDisplayPage from './pages/TweetDisplayPage'
import Archive from './pages/Archive'

const Router = () => {
  const {user} = useAuthContext()
  return (
    <div >
        {/*layout */}
        <ClippedDrawer>
          {/*guarded routes for logged in users */}
          {user && <Routes>
            <Route path="/" element={user.uid == process.env.REACT_APP_ADMIN_ID ? <Dashboard /> : <UserPage userid={user.uid} usermail={user.email}/>} />
            {/*routes just for admin */}
            {user.uid == process.env.REAT_APP_ADMIN_ID && <>
            <Route path="/newproject" element={<NewProject />} />
            <Route path="/upload" element={<FileLoader />} />
            <Route path="/export" element={<Export />} />
            <Route path="/archive" element={<Archive />} />
            </>}
            {/*redirect logged in user to appropriate page after login or signup */}
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/signup" element={<Navigate to="/" />} />
            <Route path="/tweetdisplay/:tweetid" element={<TweetDisplayPage />} />
          </Routes>}
          {!user && <Routes>
            {/*redirect non logged in users to login page */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/newproject" element={<Navigate to="/login" />} />
            <Route path="/upload" element={<Navigate to="/login" />} />
            <Route path="/export" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/tweetdisplay/:tweetid" element={<TweetDisplayPage />} />
          </Routes>}
        </ClippedDrawer>
    </div>
  )
}
export default Router
