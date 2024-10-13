'use client'
import React, { useState, useEffect } from 'react';
import { getToken } from '../../middlewares/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Edit2, Save, X, Star, Calendar, Award, Settings, Zap } from 'lucide-react';

const TabButton = ({ icon: Icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${isActive ? 'bg-green-500 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
    >
        <Icon className="h-5 w-5 mr-2" />
        <span className="font-medium">{label}</span>
    </button>
);

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');
    const [editing, setEditing] = useState({ name: false, email: false });
    const [editedUser, setEditedUser] = useState({ name: '', email: '' });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = getToken();
                const response = await fetch('/api/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                }
                const data = await response.json();
                setUser(data);
                setEditedUser({ name: data.name, email: data.email });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleEdit = (field) => {
        setEditing(prev => ({ ...prev, [field]: true }));
    };

    const handleSave = async (field) => {
        try {
            const token = getToken();
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ [field]: editedUser[field] }),
            });
            if (!response.ok) {
                throw new Error('Failed to update profile');
            }
            const updatedUser = await response.json();
            setUser(updatedUser);
            setEditing(prev => ({ ...prev, [field]: false }));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCancel = (field) => {
        setEditedUser(prev => ({ ...prev, [field]: user[field] }));
        setEditing(prev => ({ ...prev, [field]: false }));
    };

    if (loading) return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div></div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;
    if (!user) return null;

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'events', label: 'Events', icon: Calendar },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-2xl rounded-lg overflow-hidden"
                >
                    <div className="p-6 sm:p-10">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Your Profile</h2>
                            <div className="flex space-x-2">
                                {tabs.map((tab) => (
                                    <TabButton
                                        key={tab.id}
                                        icon={tab.icon}
                                        label={tab.label}
                                        isActive={activeTab === tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                    />
                                ))}
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {activeTab === 'profile' && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="md:col-span-2 space-y-6">
                                                <ProfileField
                                                    icon={User}
                                                    value={user.name}
                                                    editing={editing.name}
                                                    editedValue={editedUser.name}
                                                    onEdit={() => handleEdit('name')}
                                                    onSave={() => handleSave('name')}
                                                    onCancel={() => handleCancel('name')}
                                                    onChange={(e) => setEditedUser(prev => ({ ...prev, name: e.target.value }))}
                                                />
                                                <ProfileField
                                                    icon={Mail}
                                                    value={user.email}
                                                    editing={editing.email}
                                                    editedValue={editedUser.email}
                                                    onEdit={() => handleEdit('email')}
                                                    onSave={() => handleSave('email')}
                                                    onCancel={() => handleCancel('email')}
                                                    onChange={(e) => setEditedUser(prev => ({ ...prev, email: e.target.value }))}
                                                />
                                                <div className="flex items-center text-gray-600 items-end">
                                                    <Settings className="h-5 w-5 mr-2" />
                                                    <span className="text-sm">Member since: {new Date(user.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <div className="md:col-span-1">
                                                <div className="bg-green-50 rounded-lg p-6 text-center">
                                                    <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
                                                        <Star className="h-8 w-8 text-green-500" />
                                                    </div>
                                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Points</h3>
                                                    <div className="text-3xl font-bold text-green-500 mb-2">{user.points}</div>
                                                    <p className="text-sm text-gray-600">Keep participating to earn more!</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {activeTab === 'events' && (
                                    <div className="space-y-6">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Events Participated</h3>
                                        {user.eventsParticipated && user.eventsParticipated.length > 0 ? (
                                            <div className="space-y-4">
                                                {user.eventsParticipated.map((event, index) => (
                                                    <motion.div
                                                        key={index}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                                        className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center">
                                                                <Award className="h-6 w-6 text-green-500 mr-2" />
                                                                <span className="font-medium">{event.eventId}</span>
                                                            </div>
                                                            <div className="flex items-center text-gray-600">
                                                                <Calendar className="h-4 w-4 mr-1" />
                                                                <span className="text-sm">{new Date(event.participationDate).toLocaleDateString()}</span>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-center text-gray-600">You haven't participated in any events yet.</p>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const ProfileField = ({ icon: Icon, label, value, editing, editedValue, onEdit, onSave, onCancel, onChange }) => (
    <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="mt-1 flex items-center">
            <Icon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            {editing ? (
                <>
                    <input
                        type="text"
                        className="pl-10 pr-20 py-2 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={editedValue}
                        onChange={onChange}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                        <button onClick={onSave} className="p-1 text-green-600 hover:text-green-800">
                            <Save className="h-5 w-5" />
                        </button>
                        <button onClick={onCancel} className="p-1 text-red-600 hover:text-red-800">
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <span className="pl-10 py-2 block w-full sm:text-sm text-gray-900">{value}</span>
                    <button onClick={onEdit} className="absolute right-0 p-1 text-gray-400 hover:text-gray-600">
                        <Edit2 className="h-5 w-5" />
                    </button>
                </>
            )}
        </div>
    </div>
);

export default Profile;