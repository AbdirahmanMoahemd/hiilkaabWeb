import React from 'react';
import { Link } from 'react-router-dom';

const Header2 = ({ category, title,currentColor, onClick,linktext, count }) => (
  <div className=" mb-10 flex justify-between">
    <div>
    <p className="text-lg text-gray-400">{category}</p>
    <p className="text-3xl font-extrabold tracking-tight text-slate-900">
      {title}{count}
    </p>
    </div>
    <div >
   
    </div>
  </div>
);

export default Header2;
