import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './Manager.css';
import { Eye, Edit, Trash } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';

const EmployeeManager = () => {
      // const handlePageChange = (pageNumber) => {
      //       setCurrentPage(pageNumber);
      //   };
      //   const handleNextPage = () => {
      //       setCurrentPage(totalPages);
      //   };
      const navigate = useNavigate();

      const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };
            const [orders, setOrders] = useState([]); 
            const [filteredOrders, setFilteredOrders] = useState([]);
            useEffect(() => {
                  const storedProducts = localStorage.getItem('employeeList');
                  if (storedProducts) {
                      const parsedProducts = JSON.parse(storedProducts);
                      setOrders(parsedProducts);
                      setFilteredOrders(parsedProducts);
                  }
                }, []); 
            const [selectedSortValue, setSelectedSortValue] = useState('');
            const [currentPage, setCurrentPage] = useState(1);
            const [ordersPerPage, setOrdersPerPage] = useState(10);
    
            const handleSortChange = (event) => {
                  const selectedValue = event.target.value;
                  setSelectedSortValue(selectedValue);
                  
                  
                  const newOrdersPerPage = parseInt(selectedValue) || 10;
                  setOrdersPerPage(newOrdersPerPage);
                  setCurrentPage(1); 
          
                  
                  setFilteredOrders(orders);
              };
          
              const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
              if (!filteredOrders || filteredOrders.length === 0) {
                  return (
                      <div className="no-data">
                          <p>Không có dữ liệu để hiển thị.</p>
                      </div>
                  );
              }
              const indexOfLastOrder = currentPage * ordersPerPage;
              const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
              const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);          
            const viewOrderDetails = (order) => {
                  navigate('/employeeDetail', { state: { employee: order } });
            };
            const toCreateEmployee = () => {
                  navigate('/createEmployee');
            }


            const deleteOrder = (id) => {
                  const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?");
              
                  if (confirmDelete) {
                      setOrders((prevOrders) => {
                          const updatedOrders = prevOrders.filter(order => order.id !== id);
                          localStorage.setItem('employeeList', JSON.stringify(updatedOrders));
                          setFilteredOrders(updatedOrders);
                          return updatedOrders;
                      });
                  }
              };
      const sidebarItems = [
            { id: 1, title: 'Quản lý đơn hàng', path: '/orderManager' }, 
            { id: 2, title: 'Quản lý sản phẩm', path: '/productManager'},
            { id: 3, title: 'Quản lý nhân viên', path: '/employeeManager' , active: true  }, 
            { id: 4, title: 'Quản lý dịch vụ', path: '/serviceManager' },
            { id: 5, title: 'Quản lý tin tức', path: '/newsManager' }, 
            { id: 6, title: 'Quản lý thống kê', path: '/statisticsManager' } 
      ];
  return (
      <div className="manager-container">
      <Header/>
            <div className="admin-dashboard">
                  {/* Sidebar */}
                  <div className="sidebar">
                  <h2 className="sidebar-title">Danh mục quản lý</h2>
                  <ul className="sidebar-menu">
                  {sidebarItems.map((item) => (
                        <li key={item.id} className={`sidebar-item ${item.active ? 'active' : ''}`}>
                        <Link to={item.path} className="sidebar-link">{item.title}</Link>
                        </li>
                    ))}
                  </ul>
                  </div>

                  {/* Main Content */}
                  <div className="main-content">
                        <div className="content-header">
                        <h1>Danh sách nhân viên</h1>
                        </div>
                        <div className="sort-and-add">
                        <div className="sort-dropdown">
                              <select value={selectedSortValue} onChange={handleSortChange}>
                                    <option value="">Xem</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                    <option value="50">50</option>
                              </select>
                        </div>
                        <div>
                              <button className='button-add' onClick={toCreateEmployee}>THÊM</button>
                        </div>
                        </div>

                  {/* Table */}
                  <div className="table-container">
                  <table>
                        <thead>
                        <tr>
                        <th>Mã</th>
                        <th className='character'>Họ tên</th>
                        <th>Giới tính</th>
                        <th>Ngày sinh</th>
                        <th>Điện thoại</th>
                        <th className='character'>Email</th>
                        <th className='character'>Chức vụ</th>
                        <th>Thao tác</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentOrders.map((order) => (
                              <tr key={order.id}>
                              <td >{order.id}</td>
                              <td className='character'>{order.name}</td>
                              <td>{order.gender ? 'Nam' : 'Nữ'}</td>
                              <td>{order.date}</td>
                              <td>{order.phone}</td>
                              <td className='character'>{order.email}</td>
                              <td className='character'>{order.position}</td>
                              <td className="action-buttons">
                                    <button className="action-btn view" onClick={() => viewOrderDetails(order)}><Eye size={16} /></button>
                                    <button className="action-btn edit" ><Edit size={16} /></button>
                                    <button className="action-btn delete" onClick={() => deleteOrder(order.id)}><Trash size={16} /></button>
                              </td>
                        </tr>
                        ))}
                        </tbody>
                  </table>
                  </div>
                    {/* Phân trang */}
            <div className="pagination">
                <div className="pagination-info">
                    <span>Trang {currentPage} / {totalPages}</span>
                </div>
                <div className="pagination-buttons">
                    {currentPage > 1 && (
                        <button onClick={() => setCurrentPage(currentPage - 1)}>Trang trước</button>
                    )}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button key={index} onClick={() => setCurrentPage(index + 1)}>
                            {index + 1}
                        </button>
                    ))}
                    {currentPage < totalPages && (
                        <button onClick={() => setCurrentPage(currentPage + 1)}>Trang sau</button>
                    )}
                </div>
            </div>
                  </div>
            </div>
            {/* Nút Kéo lên đầu trang */}
        <button className="scroll-to-top" onClick={scrollToTop}>
        ↑
        </button>
            <Footer />
      </div>
    
  );
};

export default EmployeeManager;