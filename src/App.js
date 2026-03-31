import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Addproduct from './components/Addproduct';
import Getproducts from './components/Getproducts';
import Makepayment from './components/Makepayment';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Addtocart from './components/Addtocart';




function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
      <h1>Smart Cart Mart</h1>
      </header>
      <nav>
         <nav>
      <Link to = '/' className='navlinks'>Home</Link>
       <Link to = '/SignUp' className='navlinks'>SignUP</Link>
       <Link to = 'SignIn' className='navlinks'>SignIn</Link>
       <Link to = '/AddProduct' className='navlinks'>AddProduct</Link>
       
      </nav>
      </nav>
      <Routes>
        <Route path='/signup' element = {<Signup />} />
        <Route path='signin' element = {<Signin />} />
        <Route path='/addproduct' element = {<Addproduct />} />
        <Route path='/' element ={<Getproducts />} />
        <Route path='/makepayment' element = { <Makepayment />} />
        <Route path='/addtocart' element = {<Addtocart />} />
       
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
