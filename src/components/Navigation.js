import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="navigation">
      <ul>
        <NavLink to="/">
          <li>Acceuil</li>
        </NavLink>
        <NavLink to="/chainInfo">
          <li>chainInfo</li>
        </NavLink>
        <NavLink to="/fakeBayc">
          <li>FakeBayc</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navigation;
