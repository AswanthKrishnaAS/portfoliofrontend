import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { Download, X } from 'lucide-react';
import './DownloadModal.css';

const DownloadModal = ({ isOpen, onClose, onConfirm }) => {
    const modalRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            gsap.set(modalRef.current, { display: 'flex' });
            gsap.fromTo(modalRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: 'power2.out' }
            );
            gsap.fromTo(contentRef.current,
                { scale: 0.8, y: 30, opacity: 0 },
                { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.7)', delay: 0.1 }
            );
        } else if (modalRef.current) {
            const tl = gsap.timeline({
                onComplete: () => gsap.set(modalRef.current, { display: 'none' })
            });
            tl.to(contentRef.current, { scale: 0.8, y: 30, opacity: 0, duration: 0.3, ease: 'power2.in' })
                .to(modalRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' }, "-=0.2");
        }
    }, [isOpen]);

    if (!isOpen && (!modalRef.current || modalRef.current.style.display === 'none')) return null;

    return createPortal(
        <div ref={modalRef} className="download-modal-overlay">
            <div ref={contentRef} className="download-modal-content">
                <button className="modal-close" onClick={onClose}>
                    <X size={24} />
                </button>
                <div className="modal-icon">
                    <Download size={48} />
                </div>
                <h2>Confirm Download</h2>
                <p>Would you like to download the resume (PDF)?</p>
                <div className="modal-actions">
                    <button className="modal-btn-cancel" onClick={onClose}>Cancel</button>
                    <button className="modal-btn-confirm" onClick={onConfirm}>Download Now</button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default DownloadModal;
