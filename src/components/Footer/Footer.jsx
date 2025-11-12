import React from 'react';
import { BsTwitterX } from 'react-icons/bs';
import { FaFacebook, FaYoutube } from 'react-icons/fa';
import { NavLink } from 'react-router';

const Footer = () => {
    return (
        <div>
            <footer className="footer sm:footer-horizontal bg-base-300 text-base-content p-10" >
                <div className='max-w-7xl mx-auto footer sm:footer-horizontal'>
                    {/* Copyright Section */}
                    <aside>
                        <NavLink to='/' className=" text-xl flex justify-center items-center"><img className='size-10 mr-1' src="/logo.png" alt="" />Master Movie Pro </NavLink>
                        <p className="mt-2 text-sm opacity-75">
                            © {new Date().getFullYear()} Move Master Pro. All rights reserved.
                        </p>
                    </aside>

                    {/* Quick Links Section */}
                    <nav>
                        <h6 className="footer-title">Quick Links</h6>
                        <NavLink to='/' className="link link-hover">Home</NavLink>
                        <NavLink to='/all-movies' className="link link-hover">Movies</NavLink>
                        <a className="link link-hover">About</a>
                        <a className="link link-hover">Contact</a>
                    </nav>

                    {/* Social Section */}
                    <nav>
                        <h6 className="footer-title">Follow Us</h6>
                        <div className="grid grid-flow-col gap-4">
                            {/* Twitter */}
                            <a href="#" aria-label="Twitter">
                                <BsTwitterX />
                            </a>

                            {/* YouTube */}
                            <a href="#" aria-label="YouTube">
                                <FaYoutube />
                            </a>

                            {/* Facebook */}
                            <a href="#" aria-label="Facebook">
                                <FaFacebook />
                            </a>
                        </div>
                    </nav>
                </div>
            </footer>

        </div>
    );
};

export default Footer;