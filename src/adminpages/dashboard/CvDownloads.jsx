import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { getDownloadStats } from '../../api/downloadapi';
import { Calendar, Search, RefreshCw } from 'lucide-react';
import './Dashboard.css';

const CvDownloads = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ groupedByDate: [] });
    const [loading, setLoading] = useState(true);
    const [dateFilter, setDateFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Authenticate route
        const storedUser = localStorage.getItem('userInfo');
        if (!storedUser) {
            navigate('/admin/login');
            return;
        }

        const fetchStats = async () => {
            try {
                const data = await getDownloadStats();
                setStats({
                    groupedByDate: data.groupedByDate || []
                });
            } catch (error) {
                console.error("Failed to fetch downloads:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [navigate]);

    return (
        <div className="dashboard-container h-screen overflow-hidden">
            <Sidebar />

            <div className="dashboard-main flex-1 overflow-hidden">
                <Header />

                <main className="dashboard-content-area">
                    <div className="dashboard-inner-container animate-up">

                        <div className="page-header-container">
                            <div className="page-header-text">
                                <h2 className="page-title">CV Downloads</h2>
                                <p className="page-subtitle">Detailed logs of all resume downloads across your platform.</p>
                            </div>

                            <div className="page-actions-group">
                                {/* Search Input */}
                                <div className="dashboard-filter-wrap">
                                    <Search size={16} color="#94a3b8" />
                                    <input
                                        type="text"
                                        placeholder="Search IP or Info..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="dashboard-filter-input"
                                    />
                                </div>

                                {/* Date Filter */}
                                <div className="dashboard-filter-wrap">
                                    <Calendar size={16} color="#94a3b8" />
                                    <input
                                        type="date"
                                        id="dateFilter"
                                        title="Filter by Date"
                                        value={dateFilter}
                                        onChange={(e) => setDateFilter(e.target.value)}
                                        className="dashboard-filter-input dashboard-date-input"
                                        style={{ colorScheme: 'dark' }}
                                    />
                                    {dateFilter && (
                                        <button
                                            onClick={() => setDateFilter('')}
                                            className="clear-date-btn"
                                            title="Clear Date"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>

                                {/* Refresh Button */}
                                <button
                                    onClick={() => {
                                        setLoading(true);
                                        getDownloadStats().then(data => {
                                            setStats({ groupedByDate: data.groupedByDate || [] });
                                            setLoading(false);
                                        });
                                    }}
                                    className="page-action-btn"
                                    style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
                                >
                                    <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                                    Refresh
                                </button>
                            </div>
                        </div>

                        {/* Table Area */}
                        <div className="dashboard-table container">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>IP Address</th>
                                            <th>Browser & System Info</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan="5" className="text-center py-12 text-gray-400">Loading download logs...</td>
                                            </tr>
                                        ) : stats.groupedByDate.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="text-center py-12 text-gray-500">No downloads recorded yet.</td>
                                            </tr>
                                        ) : (
                                            (() => {
                                                const finalGroups = dateFilter
                                                    ? stats.groupedByDate.filter(group => group._id === dateFilter)
                                                    : stats.groupedByDate;

                                                let hasVisibleEntries = false;

                                                const renderHTML = finalGroups.map(group => {
                                                    const filteredEntries = group.entries.filter(entry =>
                                                        (entry.ipAddress || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                        (entry.browserInfo || '').toLowerCase().includes(searchQuery.toLowerCase())
                                                    );

                                                    if (filteredEntries.length === 0) return null;
                                                    hasVisibleEntries = true;

                                                    return filteredEntries.map(entry => {
                                                        const d = new Date(entry.createdAt);
                                                        return (
                                                            <tr key={entry._id}>
                                                                <td className="whitespace-nowrap">{d.toLocaleDateString()}</td>
                                                                <td className="whitespace-nowrap text-gray-400">{d.toLocaleTimeString()}</td>
                                                                <td className="font-mono text-xs">{entry.ipAddress || '—'}</td>
                                                                <td
                                                                    className="text-xs text-gray-500 max-w-[300px] truncate block pt-3 pb-3"
                                                                    title={entry.browserInfo}
                                                                >
                                                                    {entry.browserInfo || 'Unknown'}
                                                                </td>
                                                                <td>
                                                                    <span className={`status-badge ${entry.isDownloaded ? 'status-active' : 'status-inactive'}`}>
                                                                        {entry.downloadStatus === 'successful' ? 'Downloaded' : 'Failed'}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        );
                                                    });
                                                });

                                                if (!hasVisibleEntries) {
                                                    return (
                                                        <tr>
                                                            <td colSpan="5" className="text-center py-12 text-gray-500">No downloads matched your filters.</td>
                                                        </tr>
                                                    );
                                                }

                                                return renderHTML;
                                            })()
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CvDownloads;
