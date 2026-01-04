import React, { useContext, useRef } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { NavLink, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const { signInUser, signIngWithGoogle } = useContext(AuthContext);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const demoCreds = {
        email: "demo@example.com",
        password: "123456@Test",
    };

    // Email/password login
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const result = await signInUser(email, password);
            // console.log("Login success:", result.user);
            toast.success("Login successful!");
            navigate(location?.state || "/");
        } catch (error) {
            console.error(error);
            toast.error("Invalid email or password!");
        }
    };

    // Google login
    const handleGoogleSignIn = async () => {
        try {
            const result = await signIngWithGoogle();
            // console.log("Google login success:", result.user);
            toast.success("Google login successful!");
            navigate(location?.state || "/");
        } catch (error) {
            console.error(error);
            toast.error("Google sign-in failed!");
        }
    };

    const handleAutofillDemo = () => {
        if (emailRef.current) emailRef.current.value = demoCreds.email;
        if (passwordRef.current) passwordRef.current.value = demoCreds.password;
        toast.success("Demo credentials filled");
    };

    const handleCopyDemo = async () => {
        try {
            await navigator.clipboard.writeText(`${demoCreds.email} / ${demoCreds.password}`);
            toast.success("Demo credentials copied");
        } catch (err) {
            console.error("Copy failed", err);
            toast.error("Copy not allowed in this context");
        }
    };

    return (
        <div className="min-h-[70vh]">
        <div className="flex justify-center py-10 px-4 ">
            <div className="card bg-base-100 w-full max-w-sm sm:max-w-md md:max-w-lg shrink-0 shadow-2xl border border-secondary">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mt-6">
                    Login now!
                </h1>

                <form onSubmit={handleSubmit} className="card-body">
                    <fieldset className="fieldset flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label className="label">Email</label>
                            <input
                                type="email"
                                className="input w-full"
                                placeholder="Email"
                                name="email"
                                ref={emailRef}
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="label">Password</label>
                            <input
                                type="password"
                                className="input w-full"
                                placeholder="Password"
                                name="password"
                                ref={passwordRef}
                                required
                            />
                        </div>

                        <div className="text-center">
                            <NavLink to="/register" className="link link-hover text-sm sm:text-base">
                                New to site? Register here.
                            </NavLink>
                        </div>

                        <div className="rounded-lg border border-base-300 bg-base-200/60 p-3 space-y-2">
                            <div className="flex flex-col items-center justify-between gap-2">
                                <p className="text-sm text-base-content/80">Demo account for reviewers</p>
                                <div className="badge badge-outline">demo@example.com</div>
                            </div>
                            <div className="flex flex-col flex-wrap items-center gap-2">
                                <span className="badge badge-neutral">Password: 123456@Test</span>
                                <button type="button" className="btn btn-xs btn-primary" onClick={handleAutofillDemo}>
                                    Autofill login
                                </button>
                                <button type="button" className="btn btn-xs" onClick={handleCopyDemo}>
                                    Copy creds
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary mt-4 w-full">
                            Login
                        </button>
                    </fieldset>
                </form>

                <button
                    onClick={handleGoogleSignIn}
                    className="btn bg-white text-black border-[#e5e5e5] m-5 flex justify-center items-center gap-2 w-[calc(100%-1.25rem)] mx-auto"
                >
                    <FcGoogle size={20} />
                    Login with Google
                </button>
            </div>
        </div>
        </div>

    );
};

export default Login;
