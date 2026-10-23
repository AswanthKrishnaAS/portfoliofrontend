import React, { useEffect, useState, useMemo } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { getEnquiries, updateEnquiryStatus, deleteEnquiry } from '../../api/enquiryapi';
import { 
    MessageSquare, 
    Search, 
    RefreshCw, 
    Mail, 
    Phone, 
    Trash2, 
    Eye, 
    X, 
    CheckCircle2, 
    Clock, 
    ExternalLink, 
    MessageCircle,
    ChevronLeft,
    ChevronRight,
    AlertTriangle
} from 'lucide-react';
import './Dashboard.css';

const Enquiries = () => {
    const navigate = useNavigate();
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'new', 'contacted', 'resolved'
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const [deleteModalId, setDeleteModalId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (!storedUser) {
            navigate('/admin/login');
            return;
        }

        fetchData();
    }, [navigate]);

    const fetchData = async (isManual = false) => {
        if (isManual) setRefreshing(true);
        else setLoading(true);

        try {
            const data = await getEnquiries();
            setEnquiries(data.list || []);
        } catch (error) {
            console.error("Failed to load enquiries:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleStatusChange = async (id, newStatus, e) => {
        if (e) e.stopPropagation();
        try {
            await updateEnquiryStatus(id, newStatus);
            setEnquiries(prev => prev.map(item => item._id === id ? { ...item, status: newStatus } : item));
            if (selectedEnquiry && selectedEnquiry._id === id) {
                setSelectedEnquiry(prev => ({ ...prev, status: newStatus }));
            }
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    const handleDelete = async () => {
        if (!deleteModalId) return;
        try {
            await deleteEnquiry(deleteModalId);
            setEnquiries(prev => prev.filter(item => item._id !== deleteModalId));
            if (selectedEnquiry && selectedEnquiry._id === deleteModalId) {
                setSelectedEnquiry(null);
            }
        } catch (error) {
            console.error("Failed to delete enquiry:", error);
        } finally {
            setDeleteModalId(null);
        }
    };

    const filteredEnquiries = useMemo(() => {
        return enquiries.filter(item => {
            if (statusFilter !== 'all' && item.status !== statusFilter) return false;
            if (!searchQuery.trim()) return true;

            const q = searchQuery.toLowerCase();
            const name = (item.name || '').toLowerCase();
            const email = (item.email || '').toLowerCase();
            const message = (item.message || '').toLowerCase();
            const phone = (item.phone || '').toLowerCase();

            return name.includes(q) || email.includes(q) || message.includes(q) || phone.includes(q);
        });
    }, [enquiries, statusFilter, searchQuery]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, statusFilter, pageSize]);

    const totalPages = Math.ceil(filteredEnquiries.length / pageSize) || 1;
    const paginatedEnquiries = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredEnquiries.slice(start, start + pageSize);
    }, [filteredEnquiries, currentPage, pageSize]);

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

        const date = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
        const time = d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

        return { date, time, relative };
    };

    return (
        <div className="dashboard-container h-screen overflow-hidden">
            <Sidebar />

            <div className="dashboard-main flex-1 overflow-hidden">
                <Header />

                <main className="dashboard-content-area">
                    <div className="dashboard-inner-container animate-up">
                        
                        {/* Page Header */}
                        <div className="page-header-container">
                            <div className="page-header-text">
                                <h2 className="page-title">Client Enquiries</h2>
                                <p className="page-subtitle">Messages, inquiries, and requests submitted via the portfolio contact form.</p>
                            </div>

                            <div className="page-actions-group">
                                <button 
                                    className="page-action-btn"
                                    onClick={() => fetchData(true)}
                                    style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
                                >
                                    <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
                                    <span>{refreshing ? 'Updating...' : 'Refresh'}</span>
                                </button>
                            </div>
                        </div>

                        {/* Enquiries Table Card */}
                        <div className="dashboard-table-card">
                            <div className="table-card-header">
                                <div className="table-header-top">
                                    <div className="table-title-area">
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '8px',
                                            background: 'rgba(67, 160, 71, 0.15)',
                                            color: '#4ade80',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <MessageSquare size={16} />
                                        </div>
                                        <h3 className="table-title">Received Inquiries</h3>
                                        <span className="table-count-chip">
                                            {filteredEnquiries.length} {filteredEnquiries.length === 1 ? 'message' : 'messages'}
                                        </span>
                                    </div>
                                </div>

                                {/* Search and Filter toolbar */}
                                <div className="table-toolbar">
                                    <div className="table-search-box">
                                        <Search size={15} color="#64748b" />
                                        <input 
                                            type="text"
                                            placeholder="Search by name, email, or message..."
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
                                            All ({enquiries.length})
                                        </button>
                                        <button 
                                            className={`filter-pill ${statusFilter === 'new' ? 'active' : ''}`}
                                            onClick={() => setStatusFilter('new')}
                                        >
                                            New ({enquiries.filter(e => e.status === 'new').length})
                                        </button>
                                        <button 
                                            className={`filter-pill ${statusFilter === 'contacted' ? 'active' : ''}`}
                                            onClick={() => setStatusFilter('contacted')}
                                        >
                                            Contacted ({enquiries.filter(e => e.status === 'contacted').length})
                                        </button>
                                        <button 
                                            className={`filter-pill ${statusFilter === 'resolved' ? 'active' : ''}`}
                                            onClick={() => setStatusFilter('resolved')}
                                        >
                                            Resolved ({enquiries.filter(e => e.status === 'resolved').length})
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Full Width Table */}
                            <div className="table-scroll-container">
                                <table className="dashboard-full-table">
                                    <thead>
                                        <tr>
                                            <th>Sender</th>
                                            <th>Mobile Number</th>
                                            <th>Message</th>
                                            <th>Date & Time</th>
                                            <th>Status</th>
                                            <th style={{ textAlign: 'right' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan="6" style={{ textAlign: 'center', padding: '48px 24px', color: '#64748b' }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                                        <RefreshCw size={24} className="animate-spin" color="var(--dash-green)" />
                                                        <p style={{ margin: 0, fontSize: '13px' }}>Loading inquiries...</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : paginatedEnquiries.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" style={{ textAlign: 'center', padding: '54px 24px', color: '#64748b' }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                                        <MessageSquare size={32} color="#475569" />
                                                        <p style={{ margin: 0, fontSize: '14px', color: '#e2e8f0', fontWeight: 600 }}>No enquiries found</p>
                                                        <p style={{ margin: 0, fontSize: '12px' }}>
                                                            {searchQuery ? 'Try adjusting your search query or filter.' : 'New messages submitted through your portfolio contact form will appear here.'}
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            paginatedEnquiries.map((item) => {
                                                const dt = formatDateTime(item.createdAt);
                                                return (
                                                    <tr key={item._id}>
                                                        {/* Sender */}
                                                        <td>
                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                                <span style={{ fontWeight: 600, color: '#f8fafc', fontSize: '13px' }}>{item.name}</span>
                                                                <a 
                                                                    href={`mailto:${item.email}`}
                                                                    style={{ color: '#94a3b8', fontSize: '11.5px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                                                                    onClick={e => e.stopPropagation()}
                                                                >
                                                                    <Mail size={11} />
                                                                    <span>{item.email}</span>
                                                                </a>
                                                            </div>
                                                        </td>

                                                        {/* Mobile Number */}
                                                        <td>
                                                            {item.phone ? (
                                                                <a 
                                                                    href={`tel:${item.phone}`}
                                                                    style={{ 
                                                                        fontFamily: 'ui-monospace, monospace', 
                                                                        color: '#38bdf8', 
                                                                        fontSize: '12px', 
                                                                        textDecoration: 'none',
                                                                        display: 'inline-flex',
                                                                        alignItems: 'center',
                                                                        gap: '6px',
                                                                        background: 'rgba(56, 189, 248, 0.08)',
                                                                        padding: '4px 8px',
                                                                        borderRadius: '6px',
                                                                        border: '1px solid rgba(56, 189, 248, 0.2)'
                                                                    }}
                                                                >
                                                                    <Phone size={11} />
                                                                    <span>{item.phone}</span>
                                                                </a>
                                                            ) : (
                                                                <span style={{ color: '#64748b', fontSize: '12px' }}>—</span>
                                                            )}
                                                        </td>

                                                        {/* Message */}
                                                        <td style={{ maxWidth: '300px' }}>
                                                            <div 
                                                                style={{ 
                                                                    color: '#cbd5e1', 
                                                                    fontSize: '12.5px', 
                                                                    lineHeight: '1.4', 
                                                                    overflow: 'hidden', 
                                                                    textOverflow: 'ellipsis', 
                                                                    whiteSpace: 'nowrap',
                                                                    cursor: 'pointer' 
                                                                }}
                                                                onClick={() => setSelectedEnquiry(item)}
                                                                title="Click to view full message"
                                                            >
                                                                {item.message}
                                                            </div>
                                                        </td>

                                                        {/* Date & Time */}
                                                        <td>
                                                            <div className="cell-date-info">
                                                                <span className="cell-date-primary">{dt.date}</span>
                                                                <span className="cell-date-secondary">{dt.time} • {dt.relative}</span>
                                                            </div>
                                                        </td>

                                                        {/* Status */}
                                                        <td>
                                                            <select
                                                                value={item.status || 'new'}
                                                                onChange={(e) => handleStatusChange(item._id, e.target.value, e)}
                                                                style={{
                                                                    background: item.status === 'new' 
                                                                        ? 'rgba(67, 160, 71, 0.15)' 
                                                                        : item.status === 'contacted'
                                                                        ? 'rgba(59, 130, 246, 0.15)' 
                                                                        : 'rgba(148, 163, 184, 0.15)',
                                                                    color: item.status === 'new' 
                                                                        ? '#4ade80' 
                                                                        : item.status === 'contacted'
                                                                        ? '#60a5fa' 
                                                                        : '#94a3b8',
                                                                    border: `1px solid ${
                                                                        item.status === 'new' 
                                                                            ? 'rgba(74, 222, 128, 0.25)' 
                                                                            : item.status === 'contacted'
                                                                            ? 'rgba(96, 165, 250, 0.25)' 
                                                                            : 'rgba(148, 163, 184, 0.25)'
                                                                    }`,
                                                                    borderRadius: '8px',
                                                                    padding: '4px 8px',
                                                                    fontSize: '11px',
                                                                    fontWeight: 700,
                                                                    textTransform: 'uppercase',
                                                                    outline: 'none',
                                                                    cursor: 'pointer'
                                                                }}
                                                            >
                                                                <option value="new" style={{ background: '#151718', color: '#4ade80' }}>New</option>
                                                                <option value="contacted" style={{ background: '#151718', color: '#60a5fa' }}>Contacted</option>
                                                                <option value="resolved" style={{ background: '#151718', color: '#94a3b8' }}>Resolved</option>
                                                            </select>
                                                        </td>

                                                        {/* Actions */}
                                                        <td style={{ textAlign: 'right' }}>
                                                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                                                <a 
                                                                    href={`mailto:${item.email}?subject=Reply to your portfolio inquiry`}
                                                                    className="dashboard-action-btn"
                                                                    title="Send email reply"
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                >
                                                                    <Mail size={14} />
                                                                </a>

                                                                {item.phone && (
                                                                    <a 
                                                                        href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}?text=Hi ${encodeURIComponent(item.name)}, thank you for contacting me.`}
                                                                        className="dashboard-action-btn"
                                                                        title="Chat on WhatsApp"
                                                                        target="_blank"
                                                                        rel="noreferrer"
                                                                    >
                                                                        <MessageCircle size={14} color="#4ade80" />
                                                                    </a>
                                                                )}

                                                                <button 
                                                                    className="dashboard-action-btn view"
                                                                    onClick={() => setSelectedEnquiry(item)}
                                                                    title="View full inquiry"
                                                                >
                                                                    <Eye size={14} />
                                                                </button>

                                                                <button 
                                                                    className="dashboard-action-btn delete"
                                                                    onClick={() => setDeleteModalId(item._id)}
                                                                    title="Delete inquiry"
                                                                >
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Table Pagination */}
                            <div className="table-card-footer">
                                <div className="table-footer-info">
                                    {filteredEnquiries.length > 0 ? (
                                        <>
                                            Showing <strong>{(currentPage - 1) * pageSize + 1}</strong> to <strong>{Math.min(currentPage * pageSize, filteredEnquiries.length)}</strong> of <strong>{filteredEnquiries.length}</strong> inquiries
                                        </>
                                    ) : (
                                        '0 inquiries'
                                    )}
                                </div>

                                <div className="table-pagination-controls">
                                    <button 
                                        className="pagination-btn"
                                        disabled={currentPage <= 1}
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
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
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>

            {/* View Full Enquiry Modal */}
            {selectedEnquiry && (
                <div className="dashboard-modal-overlay" onClick={() => setSelectedEnquiry(null)}>
                    <div className="dashboard-modal animate-up" style={{ maxWidth: '560px', textAlign: 'left' }} onClick={e => e.stopPropagation()}>
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
                                    <MessageSquare size={18} />
                                </div>
                                <h3 className="dashboard-modal-title" style={{ margin: 0, fontSize: '18px' }}>Enquiry Details</h3>
                            </div>
                            <button className="dashboard-close-btn" onClick={() => setSelectedEnquiry(null)}>
                                <X size={18} />
                            </button>
                        </div>

                        <div className="modal-detail-grid">
                            <div className="modal-detail-item">
                                <div className="modal-detail-label">Client Name</div>
                                <div className="modal-detail-value" style={{ fontWeight: 600 }}>{selectedEnquiry.name}</div>
                            </div>

                            <div className="modal-detail-item">
                                <div className="modal-detail-label">Email Address</div>
                                <div className="modal-detail-value">
                                    <a href={`mailto:${selectedEnquiry.email}`} style={{ color: '#60a5fa', textDecoration: 'none' }}>
                                        {selectedEnquiry.email}
                                    </a>
                                </div>
                            </div>

                            {selectedEnquiry.phone && (
                                <div className="modal-detail-item">
                                    <div className="modal-detail-label">Phone Number</div>
                                    <div className="modal-detail-value">{selectedEnquiry.phone}</div>
                                </div>
                            )}

                            <div className="modal-detail-item">
                                <div className="modal-detail-label">Received Date</div>
                                <div className="modal-detail-value">
                                    {new Date(selectedEnquiry.createdAt).toLocaleString()}
                                </div>
                            </div>

                            <div className="modal-detail-ua" style={{ background: 'rgba(255, 255, 255, 0.03)', color: '#f1f5f9', fontSize: '13px', lineHeight: '1.6' }}>
                                <div style={{ fontSize: '10.5px', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 700 }}>
                                    Client Message
                                </div>
                                <div style={{ whiteSpace: 'pre-wrap' }}>{selectedEnquiry.message}</div>
                            </div>
                        </div>

                        <div className="dashboard-modal-actions" style={{ justifyContent: 'flex-end', gap: '12px' }}>
                            <a 
                                href={`mailto:${selectedEnquiry.email}?subject=Reply to your portfolio inquiry`}
                                className="dashboard-confirm-btn success"
                                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none' }}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Mail size={15} />
                                <span>Reply by Email</span>
                            </a>
                            <button 
                                className="dashboard-cancel-btn"
                                onClick={() => setSelectedEnquiry(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteModalId && (
                <div className="dashboard-modal-overlay">
                    <div className="dashboard-modal animate-up">
                        <div className="dashboard-modal-icon">
                            <AlertTriangle size={32} color="#ef4444" />
                        </div>
                        <h3 className="dashboard-modal-title">Delete Enquiry</h3>
                        <p className="dashboard-modal-text">
                            Are you sure you want to permanently delete this client inquiry? This action cannot be undone.
                        </p>
                        <div className="dashboard-modal-actions">
                            <button 
                                className="dashboard-cancel-btn"
                                onClick={() => setDeleteModalId(null)}
                            >
                                Cancel
                            </button>
                            <button 
                                className="dashboard-confirm-btn"
                                onClick={handleDelete}
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Enquiries;
