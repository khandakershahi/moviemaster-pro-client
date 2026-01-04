import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const Profile = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const email = user?.email || '';
    const fallbackAvatar = useMemo(
        () =>
            image?.trim() ||
            user?.photoURL ||
            'https://i.ibb.co/GvvmVZ4/default-avatar.png',
        [image, user]
    );

    useEffect(() => {
        const loadProfile = async () => {
            if (!email) {
                setLoading(false);
                return;
            }
            try {
                const res = await axiosSecure.get(`/users/${email}`);
                setName(res.data?.name || user?.displayName || '');
                setImage(res.data?.image || user?.photoURL || '');
            } catch (err) {
                setName(user?.displayName || '');
                setImage(user?.photoURL || '');
                toast.error('Could not load profile. Using fallback data.');
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, [axiosSecure, email, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('You need to be signed in to update your profile.');
            return;
        }
        const payload = {};
        if (name.trim()) payload.name = name.trim();
        if (image.trim()) payload.image = image.trim();
        if (Object.keys(payload).length === 0) {
            toast.error('Add a name or image before saving.');
            return;
        }

        setSaving(true);
        try {
            const res = await axiosSecure.patch(`/users/${email}`, payload);
            toast.success(res.data?.message || 'Profile updated');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                    <h1 className="text-3xl font-bold">Profile</h1>
                    <p className="text-base-content/70">Read your current info and edit what others see.</p>
                </div>
                <div className="badge badge-primary badge-outline capitalize">
                    {loading ? 'Loading...' : 'Ready'}
                </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                <div className="card bg-base-200 shadow-sm">
                    <div className="card-body space-y-4">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <div className="avatar">
                                <div className="w-28 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                                    <img
                                        src={fallbackAvatar}
                                        alt={name || 'User avatar'}
                                        referrerPolicy="no-referrer"
                                        onError={(e) => {
                                            e.target.src = 'https://i.ibb.co/GvvmVZ4/default-avatar.png';
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <h2 className="text-xl font-semibold">{name || 'No name yet'}</h2>
                                <p className="text-sm text-base-content/70">{email || 'Not signed in'}</p>
                                <p className="text-sm text-base-content/60">This is your public display info.</p>
                            </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="p-3 rounded-lg bg-base-300/60">
                                <p className="text-xs uppercase text-base-content/60">Name</p>
                                <p className="font-semibold">{name || 'Not set'}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-base-300/60">
                                <p className="text-xs uppercase text-base-content/60">Email</p>
                                <p className="font-semibold break-all">{email || 'Not signed in'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-200 shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title">Edit Profile</h2>
                        <p className="text-sm text-base-content/70">Update your name and avatar URL. Changes sync to your account.</p>

                        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Display Name</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered"
                                    placeholder="Enter your display name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={loading || saving}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Avatar URL</span>
                                </label>
                                <input
                                    type="url"
                                    className="input input-bordered"
                                    placeholder="https://example.com/avatar.jpg"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    disabled={loading || saving}
                                />
                                <label className="label">
                                    <span className="label-text-alt text-base-content/70">Use a square image for best results.</span>
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    className="input input-bordered"
                                    value={email}
                                    disabled
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <button type="submit" className="btn btn-primary" disabled={loading || saving}>
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-ghost"
                                    disabled={loading || saving}
                                    onClick={() => {
                                        setName(user?.displayName || '');
                                        setImage(user?.photoURL || '');
                                    }}
                                >
                                    Reset to auth profile
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
