// src/initData.js
import users from './user';
import employeeList from './employee';
import productList from './product';
import orderList from './order';

const initData = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(users));
  }
  if (!localStorage.getItem('employeeList')) {
    localStorage.setItem('employeeList', JSON.stringify(employeeList));
  }
  if (!localStorage.getItem('productList')) {
    localStorage.setItem('productList', JSON.stringify(productList));
  }
  if (!localStorage.getItem('orderList')) {
    localStorage.setItem('orderList', JSON.stringify(orderList));
  }
};

initData();