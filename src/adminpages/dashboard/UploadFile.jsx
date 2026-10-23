import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { uploadPdf, getAllPdfs, deleteActivePdf } from '../../api/pdfapi';
import { 
    Calendar, 
    Search, 
    RefreshCw, 
    Upload, 
    FileText, 
    X, 
    Trash2, 
    CheckCircle, 
    Eye, 
    Edit2, 
    AlertTriangle,
    ExternalLink
} from 'lucide-react';
import './Dashboard.css';

const UploadFile = () => {
    const navigate = useNavigate();
    const [pdfs, setPdfs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    // Modal States
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [viewingPdf, setViewingPdf] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

    const fetchPdfs = async () => {
        setLoading(true);
        try {
            const data = await getAllPdfs();
            setPdfs(data || []);
        } catch (error) {
            console.error("Failed to fetch PDFs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (!storedUser) {
            navigate('/admin/login');
            return;
        }
        fetchPdfs();
    }, [navigate]);

    const getPdfViewUrl = (pdf) => {
        if (!pdf) return '';
        const filename = pdf.filename || (pdf.path ? pdf.path.split(/[/\\]/).pop() : '');
        return `${API_URL}/api/pdf/view/${filename}`;
    };

    const handleView = (pdf) => {
        setViewingPdf(pdf);
    };

    const openInNewTab = (pdf, e) => {
        if (e) e.stopPropagation();
        window.open(getPdfViewUrl(pdf), '_blank');
    };

    const confirmDelete = async () => {
        try {
            setLoading(true);
            await deleteActivePdf();
            setShowDeleteModal(false);
            fetchPdfs();
        } catch (error) {
            alert(error.message);
            setLoading(false);
        }
    };

    const filteredPdfs = pdfs.filter(pdf => 
        (pdf.originalName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (pdf.filename || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="dashboard-container h-screen overflow-hidden">
            <Sidebar />

            <div className="dashboard-main flex-1 overflow-hidden">
                <Header />

                <main className="dashboard-content-area">
                    <div className="dashboard-inner-container animate-up">
                        
                        <div className="page-header-container">
                            <div className="page-header-text">
                                <h2 className="page-title">CV Management</h2>
                                <p className="page-subtitle">Upload and manage your active resume for visitors to download.</p>
                            </div>
                            
                            <div className="page-actions-group">
                                <div className="dashboard-filter-wrap">
                                    <Search size={16} color="#94a3b8" />
                                    <input 
                                        type="text"
                                        placeholder="Search files..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="dashboard-filter-input"
                                    />
                                </div>

                                <button 
                                    onClick={fetchPdfs}
                                    className="page-action-btn"
                                    style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
                                >
                                    <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                                    Refresh
                                </button>

                                {pdfs.length === 0 && (
                                    <button 
                                        onClick={() => setShowUploadModal(true)}
                                        className="page-action-btn"
                                        style={{ display: 'flex', gap: '8px', alignItems: 'center', backgroundColor: 'var(--dash-green)', color: 'black', border: 'none' }}
                                    >
                                        <Upload size={16} />
                                        Upload New CV
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="dashboard-table container">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Original Name</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan="4" className="text-center py-12 text-gray-400">Loading files...</td>
                                            </tr>
                                        ) : filteredPdfs.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="text-center py-12 text-gray-500">No PDF files uploaded yet.</td>
                                            </tr>
                                        ) : (
                                            filteredPdfs.map(pdf => (
                                                <tr key={pdf._id}>
                                                    <td className="whitespace-nowrap">
                                                        <div className="text-white">{new Date(pdf.uploadedAt).toLocaleDateString()}</div>
                                                        <div className="text-xs text-gray-500">{new Date(pdf.uploadedAt).toLocaleTimeString()}</div>
                                                    </td>
                                                    <td className="font-medium text-gray-300">
                                                        <div 
                                                            className="flex items-center gap-2 cursor-pointer hover:text-green-400 transition-colors"
                                                            onClick={() => handleView(pdf)}
                                                            title="Click to preview CV"
                                                        >
                                                            <FileText size={14} className="text-blue-400" />
                                                            <span>{pdf.originalName}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {pdf.isActive ? (
                                                            <span className="status-badge status-active">
                                                                Active CV
                                                            </span>
                                                        ) : (
                                                            <span className="status-badge" style={{ opacity: 0.5 }}>
                                                                Archived
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="flex items-center" style={{ gap: '16px' }}>
                                                            <button 
                                                                onClick={() => handleView(pdf)}
                                                                className="dashboard-action-btn view"
                                                                title="Preview CV Document"
                                                            >
                                                                <Eye size={18} />
                                                            </button>
                                                            <button 
                                                                onClick={(e) => openInNewTab(pdf, e)}
                                                                className="dashboard-action-btn"
                                                                title="Open in Full Browser Tab"
                                                            >
                                                                <ExternalLink size={16} />
                                                            </button>
                                                            <button 
                                                                onClick={() => setShowUploadModal(true)}
                                                                className="dashboard-action-btn edit"
                                                                title="Edit / Replace"
                                                            >
                                                                <Edit2 size={18} />
                                                            </button>
                                                            <button 
                                                                onClick={() => setShowDeleteModal(true)}
                                                                className="dashboard-action-btn delete"
                                                                title="Delete CV"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Delete Modal - Using Standard Style */}
            {showDeleteModal && (
                <div className="dashboard-modal-overlay">
                    <div className="dashboard-modal animate-up">
                        <div className="dashboard-modal-icon" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                            <AlertTriangle className="text-red-500" size={32} />
                        </div>
                        <h3 className="dashboard-modal-title">Delete Confirmation</h3>
                        <p className="dashboard-modal-text">
                            Are you sure you want to delete the active CV? This will permanently remove the file from the server.
                        </p>
                        
                        <div className="dashboard-modal-actions">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="dashboard-cancel-btn"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="dashboard-confirm-btn"
                                disabled={loading}
                            >
                                {loading ? 'Deleting...' : 'Yes, Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Upload Modal - Using Standard Style */}
            {showUploadModal && (
                <div className="dashboard-modal-overlay">
                    <div className="dashboard-modal animate-up" style={{ maxWidth: '450px' }}>
                        <div className="dashboard-modal-header">
                            <h3 className="dashboard-modal-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Upload size={20} className="text-green-500" />
                                UPLOAD CV
                            </h3>
                            <button 
                                onClick={() => !uploading && setShowUploadModal(false)} 
                                className="dashboard-close-btn"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className={`upload-zone-premium ${selectedFile ? 'active' : ''}`}>
                                <input 
                                    type="file" 
                                    accept=".pdf"
                                    onChange={(e) => setSelectedFile(e.target.files[0])}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    disabled={uploading}
                                />
                                <div className="text-center">
                                    {selectedFile ? (
                                        <div className="flex flex-col items-center">
                                            <div className="icon-wrapper" style={{ color: 'var(--dash-green)', background: 'rgba(67, 160, 71, 0.1)' }}>
                                                <FileText size={32} />
                                            </div>
                                            <p className="text-white font-bold text-sm truncate w-full px-4">{selectedFile.name}</p>
                                            <p className="text-xs text-gray-500 mt-1">Ready to upload</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <div className="icon-wrapper">
                                                <Upload size={32} />
                                            </div>
                                            <p className="text-white font-bold text-sm">Click to select PDF</p>
                                            <p className="text-xs text-gray-500 mt-1">Max file size: 5MB</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {statusMessage.text && (
                                <p className={`text-sm ${statusMessage.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                                    {statusMessage.text}
                                </p>
                            )}

                            <div className="dashboard-modal-actions">
                                <button
                                    onClick={() => !uploading && setShowUploadModal(false)}
                                    className="dashboard-cancel-btn"
                                    disabled={uploading}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={async () => {
                                        if (!selectedFile) return;
                                        setUploading(true);
                                        try {
                                            const res = await uploadPdf(selectedFile);
                                            setStatusMessage({ type: 'success', text: 'CV uploaded successfully!' });
                                            setTimeout(() => {
                                                setShowUploadModal(false);
                                                fetchPdfs();
                                                setSelectedFile(null);
                                                setStatusMessage({ type: '', text: '' });
                                                if (res && res.pdf) {
                                                    setViewingPdf(res.pdf);
                                                }
                                            }, 1000);
                                        } catch (err) {
                                            setStatusMessage({ type: 'error', text: err.message });
                                        } finally {
                                            setUploading(false);
                                        }
                                    }}
                                    className="dashboard-confirm-btn success"
                                    disabled={uploading || !selectedFile}
                                >
                                    {uploading ? 'Uploading...' : 'Upload & View'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* In-App PDF Preview Modal */}
            {viewingPdf && (
                <div className="dashboard-modal-overlay" onClick={() => setViewingPdf(null)}>
                    <div 
                        className="dashboard-modal pdf-preview-modal animate-up" 
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="pdf-preview-header">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
                                <div style={{ 
                                    width: '42px', 
                                    height: '42px', 
                                    borderRadius: '12px', 
                                    background: 'rgba(59, 130, 246, 0.12)', 
                                    border: '1px solid rgba(59, 130, 246, 0.25)', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    color: '#60a5fa',
                                    flexShrink: 0
                                }}>
                                    <FileText size={22} />
                                </div>
                                <div style={{ minWidth: 0 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                        <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: '#f8fafc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '400px' }}>
                                            {viewingPdf.originalName || viewingPdf.filename || 'Curriculum Vitae'}
                                        </h3>
                                        {viewingPdf.isActive && (
                                            <span className="status-badge status-active" style={{ fontSize: '11px', padding: '2px 8px' }}>
                                                Active CV
                                            </span>
                                        )}
                                    </div>
                                    <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#64748b' }}>
                                        Uploaded: {new Date(viewingPdf.uploadedAt || Date.now()).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                                <button
                                    onClick={(e) => openInNewTab(viewingPdf, e)}
                                    className="page-action-btn"
                                    style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', padding: '8px 14px' }}
                                    title="Open in full browser window"
                                >
                                    <ExternalLink size={14} />
                                    <span>Open in New Tab</span>
                                </button>
                                <button 
                                    onClick={() => setViewingPdf(null)} 
                                    className="dashboard-close-btn"
                                    title="Close preview"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="pdf-preview-frame-wrap">
                            <iframe
                                src={getPdfViewUrl(viewingPdf)}
                                title="CV Preview"
                                className="pdf-preview-iframe"
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', fontSize: '12px', color: '#64748b' }}>
                            <span>Displaying inline document viewer.</span>
                            <a
                                href={getPdfViewUrl(viewingPdf)}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: '#60a5fa', textDecoration: 'underline' }}
                            >
                                Having trouble viewing? Open directly in full tab &rarr;
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadFile;
