import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ category, title,currentColor, onClick,linktext }) => (
  <div className=" mb-10 flex justify-between">
    <div>
    <p className="text-lg text-gray-400">{category}</p>
    <p className="text-3xl font-extrabold tracking-tight text-slate-900">
      {title}
    </p>
    </div>
    <div >
    <Link to={linktext}><button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="lg:text-lg opacity-0.9 text-xs text-white hover:drop-shadow-xl rounded-md  py-3 px-4"
              onClick={onClick}
            >
              Add {title}
            </button></Link>
    </div>
  </div>
);

export default Header;
