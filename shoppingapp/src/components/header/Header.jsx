import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.svg" alt="Logo MoHome" />
      </div>
      {/* <div className="search-bar">
        <div className="search-container">
          <input type="text" placeholder="Tìm kiếm ..." />
          <a className='search' href="/user-profile">
            <img src='search.svg' alt="Search Icon"/>
          </a>
        </div>
      </div> */}
      <div className="user">
        <a className='person' href="/login">
          <img src='person.svg' alt="User Icon" className="user-icon" />
        </a>
      </div>
    </header>
  );
}

export default Header;