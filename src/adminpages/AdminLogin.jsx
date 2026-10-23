import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/loginApi';
import { Mail, Lock, EyeOff, Shield, ArrowRight, AlertCircle, X } from 'lucide-react';
import './AdminLogin.css';
import loginImg from '../assets/image/loginim.jpg';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('login');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const data = await loginUser({ username, password });
            const userInfo = {
                username: data.user?.email || username,
                token: data.token,
                isAdmin: true
            };
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.message || 'Invalid credentials. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="admin-login-container">
            <div className="login-card">

                {/* LEFT SIDE: Splash */}
                <div className="login-splash" style={{ backgroundImage: `url(${loginImg})` }}>
                    <div className="splash-logo">
                        <div className="logo-box">
                            <Shield size={24} />
                        </div>
                        <span className="logo-text">SysAdmin</span>
                    </div>

                    <div className="splash-content">
                        <div className="splash-indicators">
                            <div className="indicator active"></div>
                            <div className="indicator small"></div>
                            <div className="indicator small"></div>
                        </div>
                        <h1 className="splash-title">Secure Your <br /> Environment</h1>
                        <p className="splash-desc">AI-assisted workspace to manage, secure, and elevate your platform operations.</p>
                    </div>
                </div>

                {/* RIGHT SIDE: Form area */}
                <div className="login-form-area">


                    <h2 className="form-title">
                        Welcome Back
                    </h2>



                    <form className="auth-form" onSubmit={handleLogin}>
                        <div className="input-group">
                            <input
                                type="text"
                                className="auth-input"
                                placeholder="Enter Your Email"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <Mail className="input-icon" size={20} />
                        </div>

                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="auth-input"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <Lock className="input-icon" size={20} />
                            <div
                                className="eye-icon"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <EyeOff size={18} />
                            </div>
                        </div>

                        <button className="submit-btn" type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <div className="loading-spinner"></div>
                            ) : (
                                <>
                                    <span>Log In</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>


                </div>
            </div>

            {/* ERROR MODAL */}
            {error && (
                <div className="error-modal-overlay" onClick={() => setError(null)}>
                    <div className="error-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="error-icon-box">
                            <AlertCircle size={40} className="text-red-500" />
                        </div>
                        <h3 className="error-modal-title">Access Denied</h3>
                        <p className="error-modal-text">Sorry! The email or password you entered is incorrect. Please try again.</p>
                        <button className="error-close-btn" onClick={() => setError(null)}>
                            Try Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminLogin;
