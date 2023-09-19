import React from "react";
import {
  AiTwotoneTag,
} from "react-icons/ai";

import {
  FiShoppingBag,
  FiSettings
} from "react-icons/fi";

import {
  BsCurrencyDollar,
} from "react-icons/bs";
import {  MdCategory, MdOutlineCategory } from "react-icons/md"
import {  FaSlideshare, FaProductHunt, FaUsers, FaCity } from "react-icons/fa"
import avatar from "./avatar.jpg";
import avatar2 from "./avatar2.jpg";
import avatar3 from "./avatar3.png";
import avatar4 from "./avatar4.jpg";
import product5 from "./product5.jpg";
import product6 from "./product6.jpg";
import product7 from "./product7.jpg";




export const kanbanGrid = [
  { headerText: "To Do", keyField: "Open", allowToggle: true },

  { headerText: "In Progress", keyField: "InProgress", allowToggle: true },

  {
    headerText: "Testing",
    keyField: "Testing",
    allowToggle: true,
    isExpanded: false,
  },

  { headerText: "Done", keyField: "Close", allowToggle: true },
];


export const cartData = [
  {
    image: product5,
    name: "butterscotch ice-cream",
    category: "Milk product",
    price: "$250",
  },
  {
    image: product6,
    name: "Supreme fresh tomato",
    category: "Vegetable Item",
    price: "$450",
  },
  {
    image: product7,
    name: "Red color candy",
    category: "Food Item",
    price: "$190",
  },
];

export const chatData = [
  {
    image: avatar2,
    message: "Roman Joined the Team!",
    desc: "Congratulate him",
    time: "9:08 AM",
  },
  {
    image: avatar3,
    message: "New message received",
    desc: "Salma sent you new message",
    time: "11:56 AM",
  },
  {
    image: avatar4,
    message: "New Payment received",
    desc: "Check your earnings",
    time: "4:39 AM",
  },
  {
    image: avatar,
    message: "Jolly completed tasks",
    desc: "Assign her new tasks",
    time: "1:12 AM",
  },
];



export const links = [
  {
    name: "Dashboard",
    link: "dashboard",
    icon: <FiShoppingBag />,
  },

  {
    name: "Category",
    link: "admin/category",
    icon: <MdCategory />,
  },
  {
    name: "TopCategory",
    link: "admin/topcategory",
    icon: <MdOutlineCategory />,
  },

  {
    name: "SubCategory",
    link: "admin/subCategory",
    icon: <MdOutlineCategory />,
  },
  {
    name: "Brand",
    link: "admin/brands",
    icon: <MdOutlineCategory />,
  },
  {
    name: "Products",
    link: "adminproducts",
    icon: <FaProductHunt />,
  },
  
  {
    name: "Sliders",
    link: "sliders",
    icon: <FaSlideshare />,
  },
  {
    name: "Orders",
    link: "orders",
    icon: <AiTwotoneTag />,
  },
  {
    name: "Districts",
    link: "districts",
    icon: <FaCity />,
  }, 
  {
    name: "Users",
    link: "userlist",
    icon: <FaUsers />,
  },

  {
    name: "Settings",
    link: "settings",
    icon: <FiSettings />,
  },
  
  
];


export const themeColors = [
  {
    name: "blue-theme",
    color: "#1A97F5",
  },
  {
    name: "org-theme",
    color: "#F4A003",
  },
  {
    name: "green-theme",
    color: "#03C9D7",
  },
  {
    name: "purple-theme",
    color: "#7352FF",
  },
  {
    name: "red-theme",
    color: "#FF5C8E",
  },
  {
    name: "indigo-theme",
    color: "#1E4DB7",
  },
  {
    color: "#FB9678",
    name: "orange-theme",
  },
];

export const userProfileData = [
  {
    icon: <BsCurrencyDollar />,
    title: "My Profile",
    desc: "Account Settings",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
  },
  
];



export const contextMenuItems = [
  "AutoFit",
  "AutoFitAll",
  "SortAscending",
  "SortDescending",
  "Copy",
  "Edit",
  "Delete",
  "Save",
  "Cancel",
  "PdfExport",
  "ExcelExport",
  "CsvExport",
  "FirstPage",
  "PrevPage",
  "LastPage",
  "NextPage",
];

