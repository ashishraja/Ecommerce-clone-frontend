import React from 'react';
import "./footer.css";
import logo from "../../../assets/images/1.png";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa"
import { ImLinkedin } from "react-icons/im";
import { FaGithubSquare } from "react-icons/fa"
import { MdLocationPin } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";
import { BiLogoGmail } from "react-icons/bi";

const Footer = () => {
  return (
    <footer>
      <div id="footer">
        <div className="left-footer">
          <img src={logo} alt="logoImg" />
        </div>
        <div className="middle-footer">
          <h1>Contact</h1>
          <div><MdLocationPin className='icon1' /><span> Nakshatra Galaxia</span></div>
          <div><AiFillPhone className="icon1" /><span>Phone : +91-9408284318</span></div>
          <div><BiLogoGmail className="icon1" /><span>Email : ash@gmail.com</span></div>
          <div><BsInstagram className="icon1" /><span>Instagram : ig_santani</span></div>
        </div>
        <div className="right-footer">
          <h1>Services</h1>
          <span>Quality Products</span>
          <span>Unbeatable Prices</span>
          <span>Great Discounts</span>
          <span>Good Interface</span>
        </div>
        <div className="most-right-footer">
          <h1>About Me</h1>
          <p>I am a Full-Stack Developer.  I create responsive and secured websites for my clients. Im  a versatile and skilled professional who is proficient in both front-end and back-end web development.</p>
        </div>
      </div>
      <div className="bar">
         <div></div>
      </div>
      <div className="follow-us">
        <div className="icons">
          <span><BsInstagram  className="icon" /></span>
          <span><FaFacebook  className="icon"/></span>
          <span><ImLinkedin  className="icon"/></span>
          <span><FaGithubSquare  className="icon"/></span>
        </div>
        <p>&copy; 2023 | Made with Love by Ashish Creations</p>
      </div>
    </footer>
  )
}

export default Footer;