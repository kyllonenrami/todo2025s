import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './src/screens/App.jsx'
import Authentication, { AuthenticationMode } from './src/screens/Authentication.jsx'
import ProtectedRoute from './src/components/ProtectedRoute.jsx'
import UserProvider from './src/context/UserProvider.jsx'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from "react-router-dom";
import NotFound from "./src/screens/NotFound.jsx";

const router = createBrowserRouter([
   {
 errorElement: <NotFound />
 },
 {
 path: "/signin",
 element: <Authentication authenticationMode={AuthenticationMode.SignIn} />
 },
 {
 path: "/signup",
 element: <Authentication authenticationMode={AuthenticationMode.SignUp} />
 },
 {
 element: <ProtectedRoute />,
 children: [
 {
 path: "/",
 element: <App />,
 }
 ]
 }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>  
  </StrictMode>,
)