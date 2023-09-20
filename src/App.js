import Home from './pages/Home/Home'
import Search from './pages/Search/Search'
import SignIn from './pages/SignIn/SignIn'
import Registration from "./pages/Registration/Registration"
import ShoppingCart from './pages/ShoppingCart/ShoppingCart'
import Checkout from "./pages/Checkout/Checkout"
import Artwork from './pages/Artwork/Artwork'
import Receipt from './pages/Receipt/Receipt'
import ContactUs from './pages/ContactUs/ContactUs'
import AboutUs from './pages/AboutUs/AboutUs'

import UserData from './pages/Profile/Outlet/UserData'
import OrderHistory from './pages/Profile/Outlet/OrderHistory.js'
import WishList from './pages/Profile/Outlet/WishList'
import UserReviews from './pages/Profile/Outlet/UserReviews'

import Orders from './pages/AdminPage/Outlet/Orders'
import AdminReviews from './pages/AdminPage/Outlet/AdminReviews'
import Messages from './pages/AdminPage/Outlet/Messages'
import Users from './pages/AdminPage/Outlet/Users'
import Artworks from './pages/AdminPage/Outlet/Artworks'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import UserOrderHistory from './pages/AdminPage/Outlet/UserOrderHistory'
import AddNewArtworkPage from './pages/AdminPage/Outlet/AddNewArtworkPage'

import Profile from './pages/Profile/Profile'
import Admin from './pages/AdminPage/Admin'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./components/navbars/Header"
import Footer from "./components/navbars/Footer"
import React from 'react'
import { getLoggedIn } from './fetching.js'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { replacePreviousShoppingCart } from './helpers/helpers'
import { ToastContainer } from 'react-toastify'
import EditArtworkData from './pages/AdminPage/Outlet/EditArtworkData'

function App() {
  //context for help, instead of props drilling like loggedIn
  const [user, setUser] = React.useState({id: 0})
  const [loggedIn, setLoggedIn] = React.useState(false)

  const getUserData = () => {
    getLoggedIn()
      .then(res =>{
        setUser(res.data.user)
        setLoggedIn(true)
      }).catch((error)=>{
        console.log(error)
      })
  }

  React.useEffect(()=>{
    getUserData()
  }, [])

  const settleSuccessfulLogIn = (to_checkout, userData)=>{
    const checkout_path = "/checkout"
    const user_path = userData.is_admin ? "/admin" : "/user"
    const path = to_checkout ? checkout_path : user_path

    const signed_out_shopping_cart = localStorage.getItem("shopping_cart")

    setUser(userData)
  
    if(signed_out_shopping_cart){
      confirmAlert({
        title: 'Replace shopping cart',
        message: 'Do you want to replace your current shopping cart with this one?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              replacePreviousShoppingCart()
              window.location = path 
            }
          },
          {
            label: 'No',
            onClick: () => {
              localStorage.removeItem("shopping_cart")
              window.location = user_path
            }
          }
        ]
      })
    }else{
      window.location = path
    }
    
  }

  return (
    <BrowserRouter>

      <a href="#main" className='skip-to-content'>Skip to content</a>

      <Header loggedIn={loggedIn} user={user} />

      <div id="main" className='pb-5 vh-100'>
        <Routes>
          <Route
            path='/'
            element={<Home loggedIn={loggedIn} user={user} />}
          />

          <Route
            path='/search'
            element={<Search  loggedIn={loggedIn} />}
          />

          <Route
            path='/login'
            element={
              <SignIn 
                settleSuccessfulLogIn = {settleSuccessfulLogIn}
              />
            }
          />

          <Route
            path='/register'
            element={
              <Registration 
              settleSuccessfulRegistration = {settleSuccessfulLogIn}
              />
            }
          />

          <Route
            path='/shopping_cart'
            element={<ShoppingCart loggedIn={loggedIn} />}
          />

          <Route
            path='/checkout'
            element={<Checkout user={user} />}
          />

          <Route
            path='/artwork_page/:artwork_id'
            element={<Artwork loggedIn={loggedIn} />}
          />

          <Route
            path='/receipt'
            element={<Receipt user={user}/>}
          />

          <Route
            path='/contact'
            element={<ContactUs loggedIn={loggedIn} email={user.email} />}
          />

          <Route
            path='/about'
            element={<AboutUs />}
          />

          <Route
            path='/user'
            element={<Profile user={user} />}
          >
            <Route
              path='reviews'
              element={<UserReviews />}
            />

            <Route
              path='data'
              element={<UserData user={user} />}
            />

            <Route
              path='order_history'
              element={<OrderHistory user={user} />}
            />

            <Route
              path='wishlist'
              element={<WishList loggedIn={loggedIn} />}
            />

            <Route
              path='shopping_cart'
              element={<ShoppingCart loggedIn={loggedIn} />}
            />
          </Route>

          <Route
            path='/admin'
            element={<Admin  />}
          >

            <Route
              path='add_new_artwork'
              element={<AddNewArtworkPage  />}
            />

            <Route
              path='edit_artwork/:artwork_id'
              element={<EditArtworkData  />}
            />

            <Route
              path='orders'
              element={<Orders  />}
            />

            <Route
              path='order_history/:user_id'
              element={<UserOrderHistory  />}
            />

            <Route
              path='reviews'
              element={<AdminReviews  />}
            />

            <Route
              path='messages'
              element={<Messages  />}
            />

            <Route
              path='users'
              element={<Users  />}
            />

            <Route
              path='artworks'
              element={<Artworks  loggedIn={loggedIn} />}
            />
          </Route>

          <Route
            path='forgot_password'
            element={<ForgotPassword />}
          />

          <Route
            path='reset_password'
            element={<ResetPassword />}
          />

        </Routes>


      </div>

      <Footer />

      <ToastContainer position='bottom-right' />
    </BrowserRouter>

  )
}

export default App
