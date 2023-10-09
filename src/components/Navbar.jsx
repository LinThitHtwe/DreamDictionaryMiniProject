import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light justify-content-between">
      <a className="navbar-brand">Dream - Dictionary</a>
      <form className="form-inline">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
      </form>
    </nav>
  );
};

export default Navbar;
