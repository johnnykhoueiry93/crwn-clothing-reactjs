import Home from "./components/routes/home/home.component";
import Navigation from './components/routes/navigation/navigation.component'
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/routes/sign-in/sign-in.component";
import Shop from "./components/routes/shop/shop.component";

// We are wrapping the application with Routes
// Indside Routes we have Route that takes the path and element
// path --> URL
// element --> componenet to render, in our case the home page

// <Route path="home" element={<Home />} />  --> this can be done like this or
// <Route index element={<Home />} />  --> index will automatically point to the / + home at the same time

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} /> 
          <Route path="shop" element={<Shop />} />
          <Route path="sign-in" element={<SignIn />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
