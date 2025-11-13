import React, { use, useEffect, useState } from 'react';
import { FaUser, FaMoon, FaSun } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Navbar = () => {
    const { user, siginOutUser } = use(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [isdark, setIsdark] = useState(JSON.parse(localStorage.getItem('isdark') || 'false'));
    const [userImage, setUserImage] = useState(null);

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
                // Get user data from secure API
                const response = await axiosSecure.get(`/users/${user.email}`);
                // console.log('GET /users/:email response:', response.data);

                if (response.status === 200) {
                    const { image, name } = response.data;

                    // Prefer DB image; fallback to Firebase photoURL
                    setUserImage(image || user.photoURL || null);

                    // Optional: You could also store the name in state if needed later
                    // setUserName(name);
                } else {
                    // Fallback for unexpected statuses
                    setUserImage(user.photoURL || null);
                }
            } catch (error) {
                console.error('Error fetching user data:', error.response?.data || error.message);

                // Handle common cases gracefully
                if (error.response?.status === 403) {
                    console.warn('Unauthorized access — possibly mismatched token/email.');
                } else if (error.response?.status === 404) {
                    console.warn('User not found in database, using fallback image.');
                }

                // Fallback to Firebase photo if available
                setUserImage(user.photoURL || null);
            }
        };

        fetchUserData();
    }, [user, axiosSecure]);


    const handleSignOut = () => {
        siginOutUser()
            .then(() => console.log('Signed out successfully'))
            .catch((error) => console.error('Sign out error:', error));
    };

    const navLinks = (
        <>
            <li><a href="/" className="hover:text-primary">Home</a></li>
            <li><a href="/all-movies" className="hover:text-primary">All Movies</a></li>
            {user && (
                <>
                    <li><a href="/my-collection" className="hover:text-primary">My Collection</a></li>
                    <li><a href="/watchlist" className="hover:text-primary">Watchlist</a></li>
                </>
            )}
        </>
    );

    return (
        <nav className="bg-base-100 shadow-md sticky top-0 z-50">
            <div className="navbar max-w-7xl mx-auto px-4">
                {/* Left: Logo */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <a href="/" className="flex items-center gap-2 text-xl font-bold">
                        <img src="/logo.png" alt="Logo" className="w-10 h-10" />
                        Master Movie Pro
                    </a>
                </div>

                {/* Center: Menu (desktop) */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
                </div>

                {/* Right: Theme + User Icon + Login/Logout */}
                <div className="navbar-end flex items-center gap-4">
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

                    {/* User Icon / Photo + Login/Logout Button */}
                    <div className="flex items-center gap-3">
                        {/* Conditional Icon or Image */}
                        {userImage ? (
                            <img
                                src={userImage}
                                alt="User"
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                    e.target.src = '/default-avatar.png'; // local fallback image
                                }}
                                className="w-10 h-10 rounded-full object-cover border-2 border-primary"
                            />

                        ) : (
                            <div className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center border-2 border-base-content/20">
                                <FaUser className="w-6 h-6 text-base-content/70" />
                            </div>
                        )}

                        {/* Login / Logout Button */}
                        {user ? (
                            <button onClick={handleSignOut} className="btn btn-primary btn-sm">
                                Logout
                            </button>
                        ) : (
                            <a href="/login" className="btn btn-primary btn-sm">
                                Login / Register
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;