import React, { useContext, useEffect, useState } from 'react';
import { FaUser, FaMoon, FaSun, FaSearch } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { NavLink, useNavigate } from 'react-router';

const Navbar = () => {
    const { user, siginOutUser } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [isdark, setIsdark] = useState(JSON.parse(localStorage.getItem('isdark') || 'false'));
    const [userImage, setUserImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('isdark', JSON.stringify(isdark));
        document.documentElement.setAttribute('data-theme', isdark ? 'night' : 'winter');
    }, [isdark]);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user?.email) {
                setUserImage(null);
                return;
            }

            try {
                const response = await axiosSecure.get(`/users/${user.email}`);
                if (response.status === 200) {
                    const { image } = response.data;
                    setUserImage(image || user.photoURL || null);
                } else {
                    setUserImage(user.photoURL || null);
                }
            } catch (error) {
                console.error('Error fetching user data:', error.response?.data || error.message);
                setUserImage(user.photoURL || null);
            }
        };

        fetchUserData();
    }, [user, axiosSecure]);



    const navLinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `hover:text-primary ${isActive ? 'text-primary font-bold' : ''}`
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/movies"
                    className={({ isActive }) =>
                        `hover:text-primary ${isActive ? 'text-primary font-bold' : ''}`
                    }
                >
                    All Movies
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        `hover:text-primary ${isActive ? 'text-primary font-bold' : ''}`
                    }
                >
                    About
                </NavLink>
            </li>
            <li>
                <a
                    href="/#faq"
                    className="hover:text-primary"
                >
                    FAQ
                </a>
            </li>
            <li>
                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        `hover:text-primary ${isActive ? 'text-primary font-bold' : ''}`
                    }
                >
                    Contact
                </NavLink>
            </li>
            {user && (
                <>
                    <li>
                        <NavLink
                            to="/movies-add"
                            className={({ isActive }) =>
                                `hover:text-primary ${isActive ? 'text-primary font-bold' : ''}`
                            }
                        >
                            Add Movie
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/movies-my-collection"
                            className={({ isActive }) =>
                                `hover:text-primary ${isActive ? 'text-primary font-bold' : ''}`
                            }
                        >
                            My Collection
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/movies-watchlist"
                            className={({ isActive }) =>
                                `hover:text-primary h-[33px] ${isActive ? 'text-primary font-bold' : ''}`
                            }
                        >
                            Watchlist
                        </NavLink>
                    </li>
                </>
            )}
            <li>
                <NavLink
                    to="/movies-search"
                    className={({ isActive }) =>
                        `hover:text-primary flex items-center ${isActive ? 'text-primary font-bold' : ''}`
                    }
                >
                    <FaSearch className="inline-block align-middle" />
                </NavLink>
            </li>
        </>
    );


    const handleSignOut = () => {
        siginOutUser()
            .then(() => {
                console.log('Signed out successfully');
                navigate('/'); // <-- redirect to home
            })
            .catch((error) => console.error('Sign out error:', error));
    };

    return (
        <nav className="bg-base-100 shadow-md sticky top-0 z-50">
            <div className="navbar max-w-7xl mx-auto px-4">
                {/* Left: Logo */}
                <div className="navbar-start">
                    {/* Dropdown for mobile */}
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            {navLinks}
                            {/* Mobile Login/Logout */}
                            {!user ? (
                                <li>
                                    <NavLink to="/login" className="btn btn-primary btn-sm w-full text-center">
                                        Login / Register
                                    </NavLink>
                                </li>
                            ) : (
                                <li>
                                    <button onClick={handleSignOut} className="btn btn-primary btn-sm w-full">
                                        Logout
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                    <NavLink to="/" className="flex items-center gap-2 text-xl font-bold">
                        <img src="/logo.png" alt="Logo" className="w-10 h-10" />
                        Master Movie Pro
                    </NavLink>
                </div>

                {/* Center: Menu (desktop) */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
                </div>

                {/* Right: Theme + User dropdown (desktop only) */}
                <div className="navbar-end flex items-center gap-4 hidden lg:flex">
                    {/* Dark Mode Toggle */}
                    <label className="swap swap-rotate">
                        <input
                            type="checkbox"
                            className="theme-controller"
                            checked={isdark}
                            onChange={() => setIsdark(!isdark)}
                        />
                        <FaSun className="swap-off fill-current w-6 h-6" />
                        <FaMoon className="swap-on fill-current w-6 h-6" />
                    </label>

                    {/* User dropdown */}
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt={user?.displayName || 'User avatar'}
                                        src={userImage || '/default-avatar.png'}
                                        referrerPolicy="no-referrer"
                                        onError={(e) => (e.target.src = '/default-avatar.png')}
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={-1}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                            >
                                <li>
                                    <NavLink to="/dashboard" className="justify-between">
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li>
                                    <button onClick={handleSignOut}>Logout</button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <NavLink to="/login" className="btn btn-primary btn-sm">
                            Login / Register
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
