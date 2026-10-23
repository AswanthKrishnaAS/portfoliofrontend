import React, { useEffect, useState, useMemo } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { getViewCount } from '../../api/viewapi';
import { getDownloadStats } from '../../api/downloadapi';
import { 
    Users, 
    ShieldCheck, 
    Bell, 
    Download, 
    RefreshCw, 
    Search, 
    ExternalLink, 
    Copy, 
    Check, 
    Eye, 
    Laptop, 
    Smartphone, 
    Globe, 
    ArrowUpRight, 
    Sparkles, 
    Bot, 
    ChevronLeft, 
    ChevronRight, 
    X,
    Clock,
    Calendar,
    Activity
} from 'lucide-react';

import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [adminName, setAdminName] = useState('Aswanth');
    const [stats, setStats] = useState({ count: 0, groupedByDate: [], list: [] });
    const [downloadStats, setDownloadStats] = useState({ count: 0 });
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Table search, filter, and pagination states
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'verified', 'log'
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [copiedIp, setCopiedIp] = useState(null);
    const [selectedEntry, setSelectedEntry] = useState(null);

    // Initial authentication and data fetch
    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (!storedUser) {
            navigate('/admin/login');
            return;
        }

        try {
            const parsed = JSON.parse(storedUser);
            if (parsed.username) {
                const namePart = parsed.username.split('@')[0];
                setAdminName(namePart.charAt(0).toUpperCase() + namePart.slice(1));
            }
        } catch {
            // Keep default name
        }

        fetchDashboardData();
    }, [navigate]);

    const fetchDashboardData = async (isManualRefresh = false) => {
        if (isManualRefresh) setRefreshing(true);
        else setLoading(true);

        try {
            const [viewsData, downloadsData] = await Promise.allSettled([
                getViewCount(),
                getDownloadStats()
            ]);

            if (viewsData.status === 'fulfilled' && viewsData.value) {
                setStats({
                    count: viewsData.value.count || 0,
                    groupedByDate: viewsData.value.groupedByDate || [],
                    list: viewsData.value.list || []
                });
            }

            if (downloadsData.status === 'fulfilled' && downloadsData.value) {
                setDownloadStats({
                    count: downloadsData.value.count || 0
                });
            }
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // Flatten all log entries
    const allActivities = useMemo(() => {
        if (stats.list && stats.list.length > 0) {
            return stats.list;
        }
        if (stats.groupedByDate && stats.groupedByDate.length > 0) {
            return stats.groupedByDate.flatMap(group => group.entries || []);
        }
        return [];
    }, [stats]);

    // Filtered entries
    const filteredActivities = useMemo(() => {
        return allActivities.filter(entry => {
            // Status filter
            if (statusFilter === 'verified' && !entry.isChecked) return false;
            if (statusFilter === 'log' && entry.isChecked) return false;

            // Search query filter
            if (!searchQuery.trim()) return true;
            const q = searchQuery.toLowerCase();
            const ip = (entry.ipAddress || '').toLowerCase();
            const ua = (entry.browserInfo || '').toLowerCase();
            const dateStr = entry.createdAt ? new Date(entry.createdAt).toLocaleString().toLowerCase() : '';
            return ip.includes(q) || ua.includes(q) || dateStr.includes(q);
        });
    }, [allActivities, statusFilter, searchQuery]);

    // Reset pagination on search or filter change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, statusFilter, pageSize]);

    // Paginated slice
    const totalPages = Math.ceil(filteredActivities.length / pageSize) || 1;
    const paginatedActivities = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredActivities.slice(start, start + pageSize);
    }, [filteredActivities, currentPage, pageSize]);

    // Copy IP helper
    const handleCopyIp = (ip, e) => {
        if (e) e.stopPropagation();
        if (!ip || ip === 'Unknown') return;
        navigator.clipboard.writeText(ip);
        setCopiedIp(ip);
        setTimeout(() => setCopiedIp(null), 2000);
    };

    // Smart Device & Browser Parser
    const parseDeviceInfo = (ua) => {
        if (!ua || ua === 'Unknown') {
            return { os: 'Unknown OS', browser: 'Browser', isMobile: false, summary: 'Standard Web Client' };
        }

        let os = 'Unknown OS';
        if (/Windows NT 10.0/i.test(ua)) os = 'Windows 10/11';
        else if (/Windows/i.test(ua)) os = 'Windows';
        else if (/Macintosh|Mac OS X/i.test(ua)) os = 'macOS';
        else if (/Android/i.test(ua)) os = 'Android';
        else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
        else if (/Linux/i.test(ua)) os = 'Linux';

        let browser = 'Browser';
        if (/Edg\//i.test(ua)) browser = 'Edge';
        else if (/Chrome\//i.test(ua)) browser = 'Chrome';
        else if (/Firefox\//i.test(ua)) browser = 'Firefox';
        else if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) browser = 'Safari';
        else if (/OPR|Opera/i.test(ua)) browser = 'Opera';

        const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua);

        return {
            os,
            browser,
            isMobile,
            summary: `${os} • ${browser}`
        };
    };

    // Readable date & time formatter
    const formatDateTime = (dateStr) => {
        if (!dateStr) return { date: '—', time: '—', relative: '' };
        const d = new Date(dateStr);
        const now = new Date();
        const diffSec = Math.floor((now - d) / 1000);

        let relative = '';
        if (diffSec < 60) relative = 'Just now';
        else if (diffSec < 3600) relative = `${Math.floor(diffSec / 60)}m ago`;
        else if (diffSec < 86400) relative = `${Math.floor(diffSec / 3600)}h ago`;
        else relative = `${Math.floor(diffSec / 86400)}d ago`;

        const formattedDate = d.toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        const formattedTime = d.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        return { date: formattedDate, time: formattedTime, relative };
    };

    return (
        <div className="dashboard-container h-screen overflow-hidden">
            <Sidebar />

            <div className="dashboard-main flex-1 overflow-hidden">
                <Header />

                <main className="dashboard-content-area">
                    <div className="dashboard-inner-container animate-up">
                        
                        {/* 1. Welcome Banner */}
                        <section className="welcome-banner text-white">
                            <div className="welcome-banner-content">
                                <div className="welcome-banner-badge">
                                    <Sparkles size={13} />
                                    <span>Portfolio Control Center</span>
                                </div>
                                <h2>👋 Hello {adminName},</h2>
                                <p>
                                    Welcome to your platform Dashboard! Monitor your views, 
                                    track visitor sessions, and analyze portfolio traffic in real time.
                                </p>
                                <div className="welcome-banner-actions">
                                    <button 
                                        className="welcome-ai-btn"
                                        onClick={() => navigate('/chat')}
                                    >
                                        <Bot size={16} />
                                        <span>Start AI Assistant</span>
                                    </button>
                                    <button 
                                        className="welcome-quick-link"
                                        onClick={() => navigate('/admin/visits')}
                                    >
                                        <Globe size={14} />
                                        <span>All Visits</span>
                                    </button>
                                    <button 
                                        className="welcome-quick-link"
                                        onClick={() => navigate('/admin/downloads')}
                                    >
                                        <Download size={14} />
                                        <span>CV Downloads</span>
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* 2. Key Metrics Stats Grid (4 columns, responsive, perfectly aligned) */}
                        <section className="dashboard-stats-grid">
                            {/* Card 1: Total Views */}
                            <div className="stat-card">
                                <div className="stat-card-header">
                                    <div className="stat-icon-wrapper" style={{ background: 'rgba(249, 115, 22, 0.12)', color: '#f97316' }}>
                                        <Users size={20} />
                                    </div>
                                    <span className="stat-badge stat-badge-success">
                                        <ArrowUpRight size={12} />
                                        Live
                                    </span>
                                </div>
                                <div className="stat-card-body">
                                    <p className="stat-title">Total Platform Views</p>
                                    <div className="stat-value-row">
                                        <h3 className="stat-value">{loading ? '...' : (stats.count || allActivities.length).toLocaleString()}</h3>
                                    </div>
                                    <p className="stat-subtitle">Tracked visitor interactions</p>
                                </div>
                            </div>

                            {/* Card 2: CV Downloads */}
                            <div className="stat-card">
                                <div className="stat-card-header">
                                    <div className="stat-icon-wrapper" style={{ background: 'rgba(67, 160, 71, 0.12)', color: '#4ade80' }}>
                                        <Download size={20} />
                                    </div>
                                    <span className="stat-badge stat-badge-success">
                                        Active
                                    </span>
                                </div>
                                <div className="stat-card-body">
                                    <p className="stat-title">CV Downloads</p>
                                    <div className="stat-value-row">
                                        <h3 className="stat-value">{loading ? '...' : (downloadStats.count || 0).toLocaleString()}</h3>
                                    </div>
                                    <p className="stat-subtitle">Direct resume inquiries</p>
                                </div>
                            </div>

                            {/* Card 3: Security Score */}
                            <div className="stat-card">
                                <div className="stat-card-header">
                                    <div className="stat-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.12)', color: '#60a5fa' }}>
                                        <ShieldCheck size={20} />
                                    </div>
                                    <span className="stat-badge stat-badge-info">
                                        Protected
                                    </span>
                                </div>
                                <div className="stat-card-body">
                                    <p className="stat-title">Security & Health</p>
                                    <div className="stat-value-row">
                                        <h3 className="stat-value">99.4%</h3>
                                    </div>
                                    <p className="stat-subtitle">CORS & rate limiters active</p>
                                </div>
                            </div>

                            {/* Card 4: System Alerts / Logs */}
                            <div className="stat-card">
                                <div className="stat-card-header">
                                    <div className="stat-icon-wrapper" style={{ background: 'rgba(168, 85, 247, 0.12)', color: '#c084fc' }}>
                                        <Activity size={20} />
                                    </div>
                                    <span className="stat-badge stat-badge-warning">
                                        Real-time
                                    </span>
                                </div>
                                <div className="stat-card-body">
                                    <p className="stat-title">Recent Activity Logs</p>
                                    <div className="stat-value-row">
                                        <h3 className="stat-value">{loading ? '...' : allActivities.length}</h3>
                                    </div>
                                    <p className="stat-subtitle">Logged user events</p>
                                </div>
                            </div>
                        </section>

                        {/* 3. Better Full Container Table Card */}
                        <section className="dashboard-table-card">
                            {/* Table Top Header */}
                            <div className="table-card-header">
                                <div className="table-header-top">
                                    <div className="table-title-area">
                                        <h3 className="table-title">Recent Activity</h3>
                                        <div className="live-pulse-badge">
                                            <span className="pulse-circle"></span>
                                            <span>Live Feed</span>
                                        </div>
                                        <span className="table-count-chip">
                                            {filteredActivities.length} {filteredActivities.length === 1 ? 'record' : 'records'}
                                        </span>
                                    </div>

                                    <div className="table-header-actions">
                                        <button 
                                            className="table-action-button"
                                            onClick={() => fetchDashboardData(true)}
                                            title="Refresh latest activities"
                                        >
                                            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
                                            <span>{refreshing ? 'Updating...' : 'Refresh'}</span>
                                        </button>
                                        <button 
                                            className="table-action-button primary"
                                            onClick={() => navigate('/admin/visits')}
                                            title="View comprehensive visit logs"
                                        >
                                            <span>All Visits</span>
                                            <ExternalLink size={13} />
                                        </button>
                                    </div>
                                </div>

                                {/* Table Search and Filter Toolbar */}
                                <div className="table-toolbar">
                                    <div className="table-search-box">
                                        <Search size={15} color="#64748b" />
                                        <input 
                                            type="text"
                                            placeholder="Search by IP, device, browser, or date..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        {searchQuery && (
                                            <button 
                                                onClick={() => setSearchQuery('')}
                                                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}
                                            >
                                                <X size={14} />
                                            </button>
                                        )}
                                    </div>

                                    <div className="table-filter-pills">
                                        <button 
                                            className={`filter-pill ${statusFilter === 'all' ? 'active' : ''}`}
                                            onClick={() => setStatusFilter('all')}
                                        >
                                            All ({allActivities.length})
                                        </button>
                                        <button 
                                            className={`filter-pill ${statusFilter === 'verified' ? 'active' : ''}`}
                                            onClick={() => setStatusFilter('verified')}
                                        >
                                            Verified ({allActivities.filter(a => a.isChecked).length})
                                        </button>
                                        <button 
                                            className={`filter-pill ${statusFilter === 'log' ? 'active' : ''}`}
                                            onClick={() => setStatusFilter('log')}
                                        >
                                            Standard Logs ({allActivities.filter(a => !a.isChecked).length})
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Full Container Table */}
                            <div className="table-scroll-container">
                                <table className="dashboard-full-table">
                                    <thead>
                                        <tr>
                                            <th>Visitor & Device</th>
                                            <th>IP Address</th>
                                            <th>Timestamp</th>
                                            <th>Status</th>
                                            <th style={{ textAlign: 'right' }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan="5" style={{ textAlign: 'center', padding: '48px 24px', color: '#64748b' }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                                        <RefreshCw size={24} className="animate-spin" color="var(--dash-green)" />
                                                        <p style={{ margin: 0, fontSize: '13px' }}>Loading real-time activity stream...</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : paginatedActivities.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" style={{ textAlign: 'center', padding: '54px 24px', color: '#64748b' }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                                        <Activity size={32} color="#475569" />
                                                        <p style={{ margin: 0, fontSize: '14px', color: '#e2e8f0', fontWeight: 600 }}>No activities found</p>
                                                        <p style={{ margin: 0, fontSize: '12px' }}>
                                                            {searchQuery ? 'Try adjusting your search criteria or filter.' : 'New visitors to your website will appear here automatically.'}
                                                        </p>
                                                        {searchQuery && (
                                                            <button 
                                                                className="table-action-button"
                                                                style={{ marginTop: '8px' }}
                                                                onClick={() => { setSearchQuery(''); setStatusFilter('all'); }}
                                                            >
                                                                Reset Filters
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            paginatedActivities.map((entry) => {
                                                const dt = formatDateTime(entry.createdAt);
                                                const device = parseDeviceInfo(entry.browserInfo);
                                                const isCopied = copiedIp === entry.ipAddress;

                                                return (
                                                    <tr key={entry._id || Math.random()}>
                                                        {/* Visitor & Device */}
                                                        <td>
                                                            <div className="cell-visitor-info">
                                                                <div className="cell-device-icon" title={device.isMobile ? 'Mobile Visitor' : 'Desktop Visitor'}>
                                                                    {device.isMobile ? <Smartphone size={18} /> : <Laptop size={18} />}
                                                                </div>
                                                                <div className="cell-device-text">
                                                                    <span className="cell-system-title">{device.summary}</span>
                                                                    <span className="cell-system-sub" title={entry.browserInfo}>
                                                                        {entry.browserInfo || 'Browser info unavailable'}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        {/* IP Address */}
                                                        <td>
                                                            <div className="cell-ip-wrapper">
                                                                <span className="cell-ip-text">{entry.ipAddress || '—'}</span>
                                                                {entry.ipAddress && entry.ipAddress !== 'Unknown' && (
                                                                    <button 
                                                                        className={`cell-ip-copy-btn ${isCopied ? 'copied' : ''}`}
                                                                        onClick={(e) => handleCopyIp(entry.ipAddress, e)}
                                                                        title={isCopied ? "Copied to clipboard!" : "Copy IP Address"}
                                                                    >
                                                                        {isCopied ? <Check size={13} /> : <Copy size={13} />}
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </td>

                                                        {/* Timestamp */}
                                                        <td>
                                                            <div className="cell-date-info">
                                                                <span className="cell-date-primary">{dt.date}</span>
                                                                <span className="cell-date-secondary">{dt.time} • {dt.relative}</span>
                                                            </div>
                                                        </td>

                                                        {/* Status */}
                                                        <td>
                                                            <span className={entry.isChecked ? 'badge-status-verified' : 'badge-status-log'}>
                                                                {entry.isChecked ? (
                                                                    <>
                                                                        <Check size={11} />
                                                                        <span>Verified</span>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Clock size={11} />
                                                                        <span>Log</span>
                                                                    </>
                                                                )}
                                                            </span>
                                                        </td>

                                                        {/* Action */}
                                                        <td style={{ textAlign: 'right' }}>
                                                            <button 
                                                                className="cell-action-btn"
                                                                onClick={() => setSelectedEntry(entry)}
                                                                title="View full record details"
                                                            >
                                                                <Eye size={13} />
                                                                <span>Details</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Table Footer with Pagination */}
                            <div className="table-card-footer">
                                <div className="table-footer-info">
                                    {filteredActivities.length > 0 ? (
                                        <>
                                            Showing <strong>{(currentPage - 1) * pageSize + 1}</strong> to <strong>{Math.min(currentPage * pageSize, filteredActivities.length)}</strong> of <strong>{filteredActivities.length}</strong> entries
                                        </>
                                    ) : (
                                        '0 records found'
                                    )}
                                </div>

                                <div className="table-pagination-controls">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '12px' }}>
                                        <span style={{ fontSize: '11px', color: '#64748b' }}>Per page:</span>
                                        <select 
                                            value={pageSize}
                                            onChange={(e) => setPageSize(Number(e.target.value))}
                                            style={{
                                                background: 'rgba(255,255,255,0.05)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                color: '#e2e8f0',
                                                borderRadius: '6px',
                                                padding: '4px 8px',
                                                fontSize: '11.5px',
                                                outline: 'none'
                                            }}
                                        >
                                            <option value={5} style={{ background: '#151718' }}>5</option>
                                            <option value={10} style={{ background: '#151718' }}>10</option>
                                            <option value={25} style={{ background: '#151718' }}>25</option>
                                            <option value={50} style={{ background: '#151718' }}>50</option>
                                        </select>
                                    </div>

                                    <button 
                                        className="pagination-btn"
                                        disabled={currentPage <= 1}
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        title="Previous Page"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>

                                    <span style={{ fontSize: '12px', color: '#cbd5e1', padding: '0 6px', fontWeight: 600 }}>
                                        {currentPage} / {totalPages}
                                    </span>

                                    <button 
                                        className="pagination-btn"
                                        disabled={currentPage >= totalPages}
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        title="Next Page"
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>

            {/* Activity Details Inspection Modal */}
            {selectedEntry && (
                <div className="dashboard-modal-overlay" onClick={() => setSelectedEntry(null)}>
                    <div className="dashboard-modal animate-up" style={{ maxWidth: '580px', textAlign: 'left' }} onClick={e => e.stopPropagation()}>
                        <div className="dashboard-modal-header" style={{ marginBottom: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ 
                                    width: '36px', 
                                    height: '36px', 
                                    borderRadius: '10px', 
                                    background: 'rgba(67, 160, 71, 0.15)', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    color: 'var(--dash-green)'
                                }}>
                                    <Globe size={18} />
                                </div>
                                <h3 className="dashboard-modal-title" style={{ margin: 0, fontSize: '18px' }}>Session Log Inspection</h3>
                            </div>
                            <button className="dashboard-close-btn" onClick={() => setSelectedEntry(null)}>
                                <X size={18} />
                            </button>
                        </div>

                        <div className="modal-detail-grid">
                            <div className="modal-detail-item">
                                <div className="modal-detail-label">IP Address</div>
                                <div className="modal-detail-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{selectedEntry.ipAddress || '—'}</span>
                                    {selectedEntry.ipAddress && (
                                        <button 
                                            className="cell-ip-copy-btn" 
                                            onClick={(e) => handleCopyIp(selectedEntry.ipAddress, e)}
                                            title="Copy IP"
                                        >
                                            {copiedIp === selectedEntry.ipAddress ? <Check size={13} color="#4ade80" /> : <Copy size={13} />}
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="modal-detail-item">
                                <div className="modal-detail-label">Session Status</div>
                                <div className="modal-detail-value">
                                    <span className={selectedEntry.isChecked ? 'badge-status-verified' : 'badge-status-log'}>
                                        {selectedEntry.isChecked ? 'Verified Session' : 'Standard Log'}
                                    </span>
                                </div>
                            </div>

                            <div className="modal-detail-item">
                                <div className="modal-detail-label">Detected Platform</div>
                                <div className="modal-detail-value">
                                    {parseDeviceInfo(selectedEntry.browserInfo).summary}
                                </div>
                            </div>

                            <div className="modal-detail-item">
                                <div className="modal-detail-label">Device Type</div>
                                <div className="modal-detail-value">
                                    {parseDeviceInfo(selectedEntry.browserInfo).isMobile ? 'Mobile Smartphone' : 'Desktop / Laptop Workstation'}
                                </div>
                            </div>

                            <div className="modal-detail-item" style={{ gridColumn: 'span 2' }}>
                                <div className="modal-detail-label">Recorded Timestamp</div>
                                <div className="modal-detail-value">
                                    {new Date(selectedEntry.createdAt).toLocaleString()} ({formatDateTime(selectedEntry.createdAt).relative})
                                </div>
                            </div>

                            <div className="modal-detail-ua">
                                <div style={{ fontSize: '10.5px', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', fontWeight: 700 }}>
                                    Full User Agent Header
                                </div>
                                <div>{selectedEntry.browserInfo || 'No user agent captured.'}</div>
                            </div>
                        </div>

                        <div className="dashboard-modal-actions" style={{ justifyContent: 'flex-end', gap: '12px' }}>
                            <button 
                                className="dashboard-cancel-btn"
                                onClick={() => {
                                    navigator.clipboard.writeText(JSON.stringify(selectedEntry, null, 2));
                                    alert('JSON copied to clipboard');
                                }}
                            >
                                Copy Raw JSON
                            </button>
                            <button 
                                className="dashboard-confirm-btn success"
                                onClick={() => setSelectedEntry(null)}
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
