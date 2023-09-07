import HomePage from './pages/user/HomePage.js'
import Search from './pages/user/Search.js'
import SignInPage from './pages/user/SignInPage.js'
import RegistrationPage from "./pages/user/RegistrationPage.js"
import ShoppingCartPage from './pages/user/ShoppingCartPage.js'
import CheckoutPage from "./pages/user/CheckoutPage.js"
import ArtworkPage from './pages/user/ArtworkPage.js'
import ReceiptPage from './pages/user/ReceiptPage.js'
import ContactUsPage from './pages/user/ContactUsPage.js'
import AboutUsPage from './pages/user/AboutUsPage.js'

import UserData from './subpages/user/UserData.js'
import OrderHistory from './subpages/user/OrderHistory.js'
import WishList from './subpages/user/WishList.js'

import Orders from './subpages/admin/Orders'
import Reviews from './subpages/admin/Reviews'
import Messages from './subpages/admin/Messages'
import Users from './subpages/admin/Users'
import Artworks from './subpages/admin/Artworks'
import ForgotPasword from './pages/user/ForgotPasword.js'
import ResetPassword from './pages/user/ResetPassword.js'

import ProfilePage from './pages/user/ProfilePage.js'
import AdminPage from './pages/admin/AdminPage.js'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./components/Header"
import Footer from "./components/Footer"
import React from 'react'
import server_url from './server.js'
import axios from 'axios'


function App() {
  axios.defaults.withCredentials = true

  const [user, setUser] = React.useState({id: 0})
  const [loggedIn, setLoggedIn] = React.useState(false)

  React.useEffect(()=>{
      axios.get(`${server_url}/logged_in`)
      .then(res =>{
        if(res.data.Status === "Success"){
          setUser(res.data.user)
          setLoggedIn(true)
        }else{
          setLoggedIn(false)
        }
      })
  }, [])

  const settleSuccessfulLogIn = (userData)=>{
    setUser(userData)
    window.location.replace(
      userData.is_admin ? 
      "/admin" :
      "/user"
    )
  }

  const settleSuccessfulRegistration = (userData)=>{
    setUser(userData)
    window.location.replace("/user")
  }

  return (
    <BrowserRouter>
      <Header loggedIn={loggedIn} user={user} />

      <div id="main" className='pb-5 vh-100'>
        <Routes>
          <Route
            path='/'
            element={<HomePage loggedIn={loggedIn} user={user} />}
          />

          <Route
            path='/search'
            element={<Search  loggedIn={loggedIn} />}
          />

          <Route
            path='/login'
            element={
              <SignInPage 
                settleSuccessfulLogIn = {settleSuccessfulLogIn}
              />
            }
          />

          <Route
            path='/register'
            element={
              <RegistrationPage 
              settleSuccessfulRegistration = {settleSuccessfulRegistration}
              />
            }
          />

          <Route
            path='/shopping_cart'
            element={<ShoppingCartPage />}
          />

          <Route
            path='/checkout'
            element={<CheckoutPage />}
          />

          <Route
            path='/artwork_page/:artwork_id'
            element={<ArtworkPage />}
          />

          <Route
            path='/receipt'
            element={<ReceiptPage />}
          />

          <Route
            path='/contact'
            element={<ContactUsPage />}
          />

          <Route
            path='/about'
            element={<AboutUsPage />}
          />

          <Route
            path='/user'
            element={<ProfilePage user={user} />}
          >
            <Route
              path='data'
              element={<UserData />}
            />

            <Route
              path='order_history'
              element={<OrderHistory />}
            />

            <Route
              path='wishlist'
              element={<WishList />}
            />
          </Route>

          <Route
            path='/admin'
            element={<AdminPage />}
          >
            <Route
              path='orders'
              element={<Orders />}
            />

            <Route
              path='reviews'
              element={<Reviews />}
            />

            <Route
              path='messages'
              element={<Messages />}
            />

            <Route
              path='users'
              element={<Users />}
            />

            <Route
              path='artworks'
              element={<Artworks />}
            />
          </Route>

          <Route
            path='forgot_password'
            element={<ForgotPasword />}
          />

          <Route
            path='reset_password'
            element={<ResetPassword />}
          />

        </Routes>


      </div>

      <Footer />
    </BrowserRouter>

  )
}

export default App
