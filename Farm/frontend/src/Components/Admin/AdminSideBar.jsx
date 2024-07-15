// src/components/Sidebarnav.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { adminMenu } from '../../adminMenu';

const Sidebarnav = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const handleMenuClick = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
    setOpenSubMenu(null);
  };

  const handleSubMenuClick = (subMenu) => {
    setOpenSubMenu(openSubMenu === subMenu ? null : subMenu);
  };

  const renderSubItems = (subItems) => (
    <ul className="ml-4">
      {subItems.map((subItem) => (
        <li key={subItem.key}>
          <Link to={`/${subItem.key.replace(/([A-Z])/g, '-$1').toLowerCase()}`}>
            <div className="p-2 hover:bg-gray-600">{subItem.title}</div>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className=" h-screen w-64 bg-gray-800 text-white">
      <div className="p-4 text-xl font-bold">Super Admin</div>
      <ul>
        {adminMenu.map((menu) => (
          <li key={menu.key}>
            <button
              className="w-full text-left p-4 hover:bg-gray-700"
              onClick={() => handleMenuClick(menu.key)}
            >
              {menu.title}
            </button>
            {openMenu === menu.key && renderSubItems(menu.subItems)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebarnav;
