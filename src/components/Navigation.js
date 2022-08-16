import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const navLinkStyles = ({ isActive }) => {
    return { fontWeight: isActive ? "bold" : "normal" };
  };

  return (
    <div className="navigation">
      <ul>
        <NavLink style={navLinkStyles} to="/">
          <li>Acceuil</li>
        </NavLink>
        <NavLink style={navLinkStyles} to="/chainInfo">
          <li>chainInfo</li>
        </NavLink>
        <NavLink style={navLinkStyles} to="/fakeBayc">
          <li>FakeBayc</li>
        </NavLink>
        <NavLink style={navLinkStyles} to="/fakeNefturians">
          <li>FakeNeftrurians</li>
        </NavLink>
        <NavLink style={navLinkStyles} to="/fakeMeebits">
          <li>FakeMeebits</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navigation;
