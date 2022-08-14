import React,{useEffect, useState} from 'react';
import './Nav.css'

const Nav = () => {
    const [show,setShow] =useState(false);

    useEffect(() => {   
        window.addEventListener("scroll",() => {
            // Y축으로 scroll
            // console.log(window.scrollY)
            if(window.scrollY > 50){
                setShow(true);
            } else {
                setShow(false);
            }
        })       
        return() => {
            window.removeEventListener("scroll", () => {
            })
        }
    })

    return (
        <nav className={`nav ${show && "nav_black"}`}>
            <img
                alt="Neflix logo"
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                className="nave_logo"
                onClick={() => window.location.reload()}
            />
            <img
                alt="User logged"
                src="https://w7.pngwing.com/pngs/235/638/png-transparent-netflix-logo-movie-social-social-media-video-social-media-logos-icon-thumbnail.png"
                className="nav_avatar"
            />
        </nav>
    )
}

export default Nav;