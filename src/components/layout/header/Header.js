import React from "react";
import logo from "../../../assets/images/1.png";
import { ReactNavbar } from "overlay-navbar";
import {BiSolidUserCircle} from "react-icons/bi";
import {FaSearch } from "react-icons/fa";
import {RiShoppingBag3Fill } from "react-icons/ri";


const Header = () => {

  return <ReactNavbar 
    burgerColor= "grey"
    logo = {logo}
    logoWidth = "20vmax"
    navColor1 = "rgb(35, 35, 35)"
    logoHoverSize = "10px"
    logoHoverColor =  "rgb(35, 35, 35)"
    link1Text =  "Home"
    link2Text = "Products"
    link3Text = "Contact"
    link4Text = "About"
    link1Url = "/"
    link2Url = "/products"
    link3Url = "/contact"
    link4Url = "/about"
    link1Size = "1.6vmax"
    link1Color = "white"
    nav1justifyContent = "flex-end"
    nav2justifyContent = "flex-end"
    nav3justifyContent = "flex-start"
    nav4justifyContent = "flex-start"
    link1ColorHover = "#0ef"
    profileIconUrl = "./login"
    profileIconColorHover = "#0ef"
    searchIconColorHover = "#0ef"
    cartIconColorHover = "#0ef"
    link1Margin = "1vmax"
    profileIconMargin = ".5rem"
    profileIcon = {true}
    profileIconColor = "white"
    ProfileIconElement = {BiSolidUserCircle}
    searchIconMargin = ".5rem"
    searchIcon = {true}
    searchIconColor = "white"
    SearchIconElement = {FaSearch}
    cartIconMargin = ".5rem"
    cartIcon = {true}
    cartIconColor =  "white"
    CartIconElement = {RiShoppingBag3Fill}
  />;
};

export default Header;

