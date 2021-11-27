import React, { useEffect, useState } from 'react'
import './Navbar.css'

const Navbar = () => {
    const [show, setShow] = useState(false)
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setShow(true);
            } else {
                setShow(false);
            }
        });
        return () => {
            window.removeEventListener("scroll");
        };
    }, []);
    return (
        <div className={`nav ${show && "nav_black"}`}>
            <img
                className="nav_logo"
                src="https://upload.wikimedia.org/wikipedia/commons/archive/0/08/20160220053054%21Netflix_2015_logo.svg"
                alt="NETFLIX" />
            <img
                className="nav_user"
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                alt="User" />
        </div>
    )
}

export default Navbar
