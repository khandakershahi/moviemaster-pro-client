import React, { useState, useContext } from "react";
import { NavLink } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../context/AuthContext";
import useAxios from "../hooks/useAxios";
import toast from "react-hot-toast"; 

const Register = () => {
    const { createUser, signIngWithGoogle } = useContext(AuthContext);
    const axiosSecure = useAxios();
    const [error, setError] = useState("");

    // ---------- Email/Password Signup ----------
    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photourl.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        const passwordPattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

        if (!passwordPattern.test(password)) {
            setError(
                "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one special character."
            );
            toast.error("Invalid password format!");
            return;
        }

        setError("");

        try {
            const result = await createUser(email, password);
            const user = result.user;
            const newUser = {
                name,
                email: user.email,
                image: photo,
            };

            const { data } = await axiosSecure.post("/users", newUser);
            console.log("User saved in DB:", data);

            toast.success("Registration successful!");
            e.target.reset();
        } catch (err) {
            console.error(err);
            setError(err.message);
            toast.error("Registration failed!");
        }
    };

    // ---------- Google Signup ----------
    const handleGoogleSignup = async () => {
        try {
            const result = await signIngWithGoogle();
            const user = result.user;
            const newUser = {
                name: user.displayName,
                email: user.email,
                image: user.photoURL,
            };

            const { data } = await axiosSecure.post("/users", newUser);
            console.log("Google user saved in DB:", data);

            toast.success("Google signup successful!");
        } catch (error) {
            console.error(error);
            setError(error.message);
            toast.error("Google signup failed!");
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-22 flex justify-center">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl border border-secondary">
                <h1 className="text-5xl font-bold text-center">Register now!</h1>
                <form onSubmit={handleSubmit} className="card-body">
                    <fieldset className="fieldset">
                        <label className="label">Name</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="Name"
                            name="name"
                            required
                        />

                        <label className="label">Photo URL</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="Photo URL"
                            name="photourl"
                        />

                        <label className="label">Email</label>
                        <input
                            type="email"
                            className="input"
                            placeholder="Email"
                            name="email"
                            required
                        />

                        <label className="label">Password</label>
                        <input
                            type="password"
                            className="input"
                            placeholder="Password"
                            name="password"
                            required
                        />

                        <div>
                            <NavLink to="/login" className="link link-hover">
                                Already have an account? Login here.
                            </NavLink>
                        </div>

                        {error && <p className="text-error text-xs mt-2">{error}</p>}

                        <button type="submit" className="btn btn-primary mt-4">
                            Register
                        </button>
                    </fieldset>
                </form>

                <button
                    onClick={handleGoogleSignup}
                    className="btn bg-white text-black border-[#e5e5e5] m-5"
                >
                    <FcGoogle size={20} />
                    Register with Google
                </button>
            </div>
        </div>
    );
};

export default Register;
