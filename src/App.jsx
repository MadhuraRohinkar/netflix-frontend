import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomeScreen from './pages/Home/HomeScreen';
import Navbar from './components/Navbar';
import {isTokenExpired} from './utils/checkToken'
import { Toaster } from 'react-hot-toast';
import Profile from './pages/Profile'; // ✅ Make sure the path is correct
import Chat from './pages/Chat';
import './App.css';

function AppRoutes() {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  return (
    <div className="min-h-screen bg-black text-white">
      {!isLogin && <Navbar />}
      <main className={!isLogin ? 'pt-24 px-4' : ''}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute><HomeScreen/></ProtectedRoute>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </main>
       <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

const ProtectedRoute = ({children}) => {
  const token = localStorage.getItem('token')

  if (!token || !isTokenExpired(token)){
    return <Navigate to ="/login" replace/>
  }
  return children
}
export default App;

/*import React from 'react';
import BearComponent from './components/BearComponent';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <BearComponent />
    </div>
  );
}

export default App;*/


/*function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Component mounted');
  }, []); // runs only once, when the component mounts

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}

export default Counter;
/*

/*function App() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', price: 50000, available: true },
    { id: 2, name: 'Phone', price: 30000, available: false },
    { id: 3, name: 'Tablet', price: 20000, available: true },
  ]);

  const handleBuy = (id) => {
    const updatedList = products.filter((p) => p.id !== id);
    setProducts(updatedList);
  };

  return (
    <div>
      <h1>Product List</h1>
      {products.map((p) => (
        <div
          key={p.id}
          style={{
            border: '1px solid gray',
            margin: '10px',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          <h2>{p.name}</h2>
          <p>Price: ₹{p.price}</p>
          <p>Available: {p.available ? 'Yes' : 'No'}</p>
          {p.available && (
            <button onClick={() => handleBuy(p.id)}>Buy Now</button>
          )}
        </div>
      ))}
      {products.length === 0 && <h2>No more products left!</h2>}
    </div>
  );
}

export default App;
*/

/*function App() {
  const arr = [
    { name: "Joy", id: 1 },
    { name: "Abc", id: 2 },
    { name: "Madhura", id: 3 },
  ];

  return (
    <>
      <h1>MADHURA</h1>
      <p>Age: 22</p>
      <p>Gender: Female</p>

      {arr.map((a) => (
        <div key={a.id} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
          <h3>Name: {a.name}</h3>
          <p>ID: {a.id}</p>
        </div>
      ))}
    </>
  );
}

export default App;
*/

/*function DoubleClick(){
  const [message, setMessage] = useState('Double-click for the text!');
   const handleDoubleClick = () => {
    setMessage('You double-clicked me!');
  };

  return (
    <div>
      <p onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
        {message}
      </p>
    </div>
  );
}

export default DoubleClick;*/

