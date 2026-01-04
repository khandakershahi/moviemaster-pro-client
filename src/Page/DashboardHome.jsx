import React, { useEffect, useMemo, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts';
import toast from 'react-hot-toast';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';

const DashboardHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [stats, setStats] = useState({ movies: 0, users: 0, reviews: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            if (!user?.email) {
                setLoading(false);
                return;
            }
            try {
                const res = await axiosSecure.get('/stats/summary');
                setStats({
                    movies: res.data?.movies || 0,
                    users: res.data?.users || 0,
                    reviews: res.data?.reviews || 0,
                });
            } catch (err) {
                toast.error(err.response?.data?.message || 'Failed to load stats');
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [axiosSecure, user]);

    const chartData = useMemo(
        () => [
            { name: 'Movies', value: stats.movies, color: '#6366f1' },
            { name: 'Users', value: stats.users, color: '#22c55e' },
            { name: 'Reviews', value: stats.reviews, color: '#f59e0b' },
        ],
        [stats]
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard Overview</h1>
                    <p className="text-base-content/70">Key totals across your app.</p>
                </div>
                <div className={`badge ${loading ? 'badge-ghost' : 'badge-success'} badge-outline`}>{loading ? 'Loading...' : 'Up to date'}</div>
            </div>
            {loading ? (
                <>
                    <div className="grid gap-4 md:grid-cols-3">
                        {Array.from({ length: 3 }).map((_, idx) => (
                            <div key={idx} className="card bg-base-200 shadow-sm">
                                <div className="card-body space-y-3">
                                    <div className="skeleton h-3 w-24"></div>
                                    <div className="skeleton h-8 w-20"></div>
                                    <div className="skeleton h-6 w-16"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="card bg-base-200 shadow-sm">
                        <div className="card-body space-y-4">
                            <div className="flex items-center justify-between gap-3 flex-wrap">
                                <div className="space-y-2">
                                    <div className="skeleton h-5 w-32"></div>
                                    <div className="skeleton h-3 w-48"></div>
                                </div>
                                <div className="skeleton h-8 w-20"></div>
                            </div>
                            <div className="h-72 w-full">
                                <div className="skeleton h-full w-full rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="grid gap-4 md:grid-cols-3">
                        {chartData.map((item) => (
                            <div key={item.name} className="card bg-base-200 shadow-sm">
                                <div className="card-body">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-base-content/70">Total {item.name}</p>
                                            <p className="text-3xl font-bold">{item.value}</p>
                                        </div>
                                        <div className="badge" style={{ backgroundColor: `${item.color}22`, color: item.color }}>
                                            {item.name}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="card bg-base-200 shadow-sm">
                        <div className="card-body">
                            <div className="flex items-center justify-between gap-3 flex-wrap">
                                <div>
                                    <h2 className="card-title">Distribution</h2>
                                    <p className="text-sm text-base-content/70">Visualize totals for movies, users, and reviews.</p>
                                </div>
                            </div>
                            <div className="h-72 w-full">
                                <ResponsiveContainer>
                                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                                        <XAxis dataKey="name" tickLine={false} axisLine={false} />
                                        <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
                                        <Tooltip cursor={{ fill: 'var(--fallback-b1, #f3f4f6)' }} />
                                        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                                            {chartData.map((entry) => (
                                                <Cell key={entry.name} fill={entry.color} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default DashboardHome;
