import Map from './Components/maps/Map';
import './App.css';
import Submitform from './Components/submitForm/Submitform';

import Rootlayout from './Components/rootLayout/Rootlayout';
import Login from './Components/login/Login';
import Signup from './Components/signup/Signup';
import Home from './Components/home/Home';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SellersMap from './Components/sellersMap/SellersMap';


function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Rootlayout/>,
      children:[
        {
          path:"/",
          element:<Login/>

        },
        {
          path:"/Signup",
          element: <Signup/>
        },
         
            {
              path:'/submitform',
              element:<Submitform/>
            },
            {
              path:'/SellersMap',
              element:<SellersMap/>
            },
            {
              path:'/map',
              element:<Map/>
            },
            {
              path:'/home',
              element:<Home/>
            },
      ]
    }
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
