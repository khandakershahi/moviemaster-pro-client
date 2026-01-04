import React, { useContext, useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router';
import { FaMoon, FaSun } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import useAxiosSecure from '../hooks/useAxiosSecure';

const DashboardLayout = () => {
    const { user, siginOutUser } = useContext(AuthContext);
    const [isdark, setIsdark] = useState(JSON.parse(localStorage.getItem('isdark') || 'false'));
    const [userImage, setUserImage] = useState(null);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isdark ? 'night' : 'winter');
        localStorage.setItem('isdark', JSON.stringify(isdark));
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
            } catch {
                setUserImage(user?.photoURL || null);
            }
        };
        fetchUserData();
    }, [user, axiosSecure]);

    const handleSignOut = () => {
        siginOutUser()
            .then(() => navigate('/'))
            .catch(() => {});
    };

    return (
        <div className="drawer lg:drawer-open">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content min-h-screen">
                <nav className="navbar w-full bg-base-300 border-b border-base-200">
                    <label htmlFor="dashboard-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                            <path d="M9 4v16"></path>
                            <path d="M14 10l2 2l-2 2"></path>
                        </svg>
                    </label>
                    <div className="px-4 text-lg font-semibold">Dashboard</div>
                    <div className="flex items-center gap-3 ml-auto">
                        <label className="swap swap-rotate">
                            <input
                                type="checkbox"
                                className="theme-controller"
                                checked={isdark}
                                onChange={() => setIsdark(!isdark)}
                            />
                            <FaSun className="swap-off fill-current w-5 h-5" />
                            <FaMoon className="swap-on fill-current w-5 h-5" />
                        </label>

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
                                <ul tabIndex={-1} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                                    <li><NavLink to="/dashboard/profile">Profile</NavLink></li>
                                    <li><NavLink to="/dashboard">Dashboard Home</NavLink></li>
                                    <li><button onClick={handleSignOut}>Logout</button></li>
                                </ul>
                            </div>
                        ) : null}
                    </div>
                </nav>
                <div className="p-4">
                    <Outlet />
                </div>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    <ul className="menu w-full grow">
                        <li>
                            <NavLink to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                </svg>
                                <span className="is-drawer-close:hidden">Homepage</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard" end className={({ isActive }) => `${isActive ? 'active font-semibold' : ''} is-drawer-close:tooltip is-drawer-close:tooltip-right`} data-tip="Dashboard Home">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                                    <path d="M12 3l8 4.5v9l-8 4.5l-8-4.5v-9z"></path>
                                    <path d="M12 12l8 -4.5"></path>
                                    <path d="M12 12v9"></path>
                                    <path d="M12 12l-8 -4.5"></path>
                                </svg>
                                <span className="is-drawer-close:hidden">Dashboard Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/profile" className={({ isActive }) => `${isActive ? 'active font-semibold' : ''} is-drawer-close:tooltip is-drawer-close:tooltip-right`} data-tip="Profile">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                                    <path d="M12 12a5 5 0 1 0 -5 -5a5 5 0 0 0 5 5z"></path>
                                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                                </svg>
                                <span className="is-drawer-close:hidden">Profile</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/add-movie" className={({ isActive }) => `${isActive ? 'active font-semibold' : ''} is-drawer-close:tooltip is-drawer-close:tooltip-right`} data-tip="Add Movie">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                                    <path d="M12 5v14"></path>
                                    <path d="M5 12h14"></path>
                                    <path d="M5 5h14v14h-14z" stroke="none"></path>
                                </svg>
                                <span className="is-drawer-close:hidden">Add Movie</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/watchlist" className={({ isActive }) => `${isActive ? 'active font-semibold' : ''} is-drawer-close:tooltip is-drawer-close:tooltip-right`} data-tip="Watchlist">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                                    <path d="M5 4h14a2 2 0 0 1 2 2v12l-4-3l-4 3l-4-3l-4 3v-12a2 2 0 0 1 2-2"></path>
                                </svg>
                                <span className="is-drawer-close:hidden">Watchlist</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/my-collection" className={({ isActive }) => `${isActive ? 'active font-semibold' : ''} is-drawer-close:tooltip is-drawer-close:tooltip-right`} data-tip="My Collection">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                                    <path d="M4 6h16"></path>
                                    <path d="M4 12h16"></path>
                                    <path d="M4 18h16"></path>
                                </svg>
                                <span className="is-drawer-close:hidden">My Collection</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/my-reviews" className={({ isActive }) => `${isActive ? 'active font-semibold' : ''} is-drawer-close:tooltip is-drawer-close:tooltip-right`} data-tip="My Reviews">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                                    <path d="M4 5h16"></path>
                                    <path d="M4 12h16"></path>
                                    <path d="M4 19h16"></path>
                                    <path d="M9 9l2 2l4 -4"></path>
                                </svg>
                                <span className="is-drawer-close:hidden">My Reviews</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
