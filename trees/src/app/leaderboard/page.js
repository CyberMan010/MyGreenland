'use client'
import React, { useState, useEffect } from 'react';
import { getToken } from '../../middlewares/auth';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

const CrownIcon = ({ color }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} className="w-6 h-6">
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    </svg>
);

const Leaderboard = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [displayedUsers, setDisplayedUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    useEffect(() => {
        updateDisplayedUsers();
    }, [allUsers, limit, currentPage]);

    const fetchLeaderboard = async () => {
        try {
            setLoading(true);
            const token = getToken();
            const response = await fetch('/api/leaderboard', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch leaderboard');
            }
            const data = await response.json();
            const sortedUsers = data.users.sort((a, b) => b.points - a.points);
            setAllUsers(sortedUsers);
            setTotalPages(Math.ceil(sortedUsers.length / limit));
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const updateDisplayedUsers = () => {
        const startIndex = (currentPage - 1) * limit;
        const endIndex = startIndex + limit;
        setDisplayedUsers(allUsers.slice(startIndex, endIndex));
        setTotalPages(Math.ceil(allUsers.length / limit));
    };

    const handleLimitChange = (newLimit) => {
        setLimit(newLimit);
        setCurrentPage(1);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
        </div>
    );
    if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Eco-Events Leaderboard</h2>
            <div className="mb-4 flex justify-between items-center">
                <div>
                    <label htmlFor="limit" className="text-green-700 mr-2">Show Top:</label>
                    <select
                        id="limit"
                        value={limit}
                        onChange={(e) => handleLimitChange(Number(e.target.value))}
                        className="bg-white border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 p-2.5"
                    >
                        {[10, 20, 50, 100].map((value) => (
                            <option key={value} value={value}>{value}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-green-700">
                    <thead className="text-xs text-green-700 uppercase bg-green-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 rounded-tl-lg">Rank</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Points</th>
                            <th scope="col" className="px-6 py-3 rounded-tr-lg">Events Participated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedUsers.map((user, index) => {
                            const globalRank = (currentPage - 1) * limit + index + 1;
                            return (
                                <tr key={user._id} className="bg-white border-b hover:bg-green-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-green-900 whitespace-nowrap flex items-center">
                                        {globalRank <= 3 && (
                                            <CrownIcon color={
                                                globalRank === 1 ? '#FFD700' :
                                                    globalRank === 2 ? '#C0C0C0' :
                                                        '#CD7F32'
                                            } />
                                        )}
                                        <span className="ml-2">{globalRank}</span>
                                    </th>
                                    <td className="px-6 py-4">{user.name}</td>
                                    <td className="px-6 py-4">{user.points}</td>
                                    <td className="px-6 py-4">{user.eventsParticipated.length}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-between border-t border-green-200 bg-white px-4 py-3 sm:px-6 mt-4">
                <div className="flex flex-1 justify-between sm:hidden">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center rounded-md border border-green-300 bg-white px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="relative ml-3 inline-flex items-center rounded-md border border-green-300 bg-white px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-50"
                    >
                        Next
                    </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-green-700">
                            Showing <span className="font-medium">{(currentPage - 1) * limit + 1}</span> to <span className="font-medium">{Math.min(currentPage * limit, allUsers.length)}</span> of{' '}
                            <span className="font-medium">{allUsers.length}</span> results
                        </p>
                    </div>
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-green-400 ring-1 ring-inset ring-green-300 hover:bg-green-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            {[...Array(totalPages).keys()].map((page) => (
                                <button
                                    key={page + 1}
                                    onClick={() => handlePageChange(page + 1)}
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === page + 1
                                        ? 'z-10 bg-green-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'
                                        : 'text-green-900 ring-1 ring-inset ring-green-300 hover:bg-green-50 focus:z-20 focus:outline-offset-0'
                                        }`}
                                >
                                    {page + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-green-400 ring-1 ring-inset ring-green-300 hover:bg-green-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;