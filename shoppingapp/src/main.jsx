import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx'; // Import trang SignUp
import OrderDetail from './OrderDetail.jsx';
import OrderManager from './OrderManager.jsx';
import ProductManager from './ProductManager.jsx';
import ProductDetail from './ProductDetail.jsx';
import EmployeeManager from './EmployeeManager.jsx';
import CreateEmployee from './CreateEmployee.jsx';
import EditEmployee from './EditEmployee.jsx';
import EmployeeDetail from './EmployeeDetail.jsx';
import CreateProduct from './CreateProduct.jsx';
import './data/initData.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/orderDetail" element={<OrderDetail />} /> 
        <Route path="/orderManager" element={<OrderManager />} />
        <Route path="/" element={<Navigate to="/orderManager" replace />} />
        <Route path='/productManager' element={<ProductManager/>} />
        <Route path='/productDetail' element={<ProductDetail/>} />
        <Route path='/employeeManager' element={<EmployeeManager/>}/>
        <Route path='/createEmployee' element={<CreateEmployee/>}/>
        <Route path='/employeeDetail' element={<EmployeeDetail/>}/>
        <Route path='/editEmployee' element={<EditEmployee/>}/>
        <Route path='/createProduct' element={<CreateProduct/>}/>
      </Routes>
    </Router>
  </StrictMode>,
);