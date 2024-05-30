import Map from './Map';
import './App.css';
import Submitform from './Submitform';

import Rootlayout from './Rootlayout';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SellersMap from './Components/SellersMap/SellersMap';


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
