import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Lock, ArrowLeft, Users, Building, Eye, EyeOff } from 'lucide-react';
import logo from '../assets/logo.png';
import './LoginPage.css';

import { supabase } from '../lib/supabase';

const premiumTransition = {
    duration: 1.4,
    ease: [0.16, 1, 0.3, 1]
};

const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: premiumTransition
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export default function LoginPage() {
    const [userType, setUserType] = useState('lender');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [bankCode, setBankCode] = useState('');
    const [bankNumber, setBankNumber] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Smooth reveal for brand title
    const brandText = "Agri Credit";

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Simulated delay for premium feel
            await new Promise(resolve => setTimeout(resolve, 800));
            setOtpSent(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (userType === 'lender') {
                navigate('/lender/dashboard');
            } else {
                navigate('/admin/dashboard');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-page">
                <div className="login-page__bg" />
                <div className="login-page__overlay" />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ...premiumTransition, delay: 0.6 }}
                >
                    <Link to="/" className="login-page__back-btn">
                        <ArrowLeft size={18} />
                        <span>Home</span>
                    </Link>
                </motion.div>

                <div className="login-page__content">
                    <motion.div
                        className="login-page__brand-wrap"
                        initial="initial"
                        animate="animate"
                        variants={staggerContainer}
                    >
                        <motion.h1 className="login-page__title-brand">
                            {brandText.split("").map((char, i) => (
                                <motion.span
                                    key={i}
                                    style={{ display: 'inline-block', whiteSpace: char === " " ? "pre" : "normal" }}
                                    variants={{
                                        initial: { opacity: 0, y: 100, rotateX: -90, filter: 'blur(10px)' },
                                        animate: { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }
                                    }}
                                    transition={{ ...premiumTransition, delay: i * 0.04 }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </motion.h1>
                    </motion.div>

                    <motion.div
                        className="login-card"
                        initial={{ opacity: 0, y: 60, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ ...premiumTransition, delay: 0.4 }}
                    >
                        <motion.div
                            className="login-card__logo-wrap"
                            variants={fadeInUp}
                        >
                            <img src={logo} alt="Logo" className="login-card__logo-img" />
                        </motion.div>

                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    className="login-card__error-simple"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="login-card__type-tabs">
                            {['lender', 'bank'].map((t, idx) => (
                                <button
                                    key={t}
                                    className={`login-card__tab ${userType === t ? 'login-card__tab--active' : ''}`}
                                    onClick={() => {
                                        setUserType(t);
                                        setOtpSent(false);
                                        setError(null);
                                    }}
                                >
                                    {t === 'lender' ? <Users size={16} /> : <Building size={16} />}
                                    <span style={{ textTransform: 'capitalize' }}>{t}</span>
                                </button>
                            ))}
                        </div>

                        <form onSubmit={userType === 'bank' ? handleLogin : (otpSent ? handleLogin : handleSendOtp)} className="login-card__glass-form">
                            <AnimatePresence mode="wait">
                                {userType === 'lender' ? (
                                    <motion.div
                                        key="lender-fields"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        className="login-card__form-fields"
                                    >
                                        <div className="login-card__input-group">
                                            <input
                                                type="tel"
                                                placeholder="Phone Number"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                required
                                                className="login-card__glass-input"
                                            />
                                        </div>

                                        <AnimatePresence>
                                            {otpSent && (
                                                <motion.div
                                                    className="login-card__input-group"
                                                    style={{ marginTop: '1.5rem' }}
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    transition={premiumTransition}
                                                >
                                                    <input
                                                        type={showPassword ? 'text' : 'password'}
                                                        placeholder="OTP"
                                                        value={otp}
                                                        onChange={(e) => setOtp(e.target.value)}
                                                        required
                                                        className="login-card__glass-input"
                                                    />
                                                    <button type="button" className="login-card__glass-eye" onClick={() => setShowPassword(!showPassword)}>
                                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="bank-fields"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        className="login-card__form-fields"
                                    >
                                        <div className="login-card__input-group">
                                            <input
                                                type="text"
                                                placeholder="Bank Code"
                                                value={bankCode}
                                                onChange={(e) => setBankCode(e.target.value)}
                                                required
                                                className="login-card__glass-input"
                                            />
                                        </div>
                                        <div className="login-card__input-group" style={{ marginTop: '1.5rem' }}>
                                            <input
                                                type="text"
                                                placeholder="Account Number"
                                                value={bankNumber}
                                                onChange={(e) => setBankNumber(e.target.value)}
                                                required
                                                className="login-card__glass-input"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.button
                                type="submit"
                                className="login-card__glass-submit"
                                disabled={loading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {loading ? (
                                    <motion.span
                                        animate={{ opacity: [0.4, 1, 0.4] }}
                                        transition={{ repeat: Infinity, duration: 1 }}
                                    >
                                        Processing...
                                    </motion.span>
                                ) : (userType === 'bank' ? 'Enter Dashboard' : (otpSent ? 'Enter Dashboard' : 'Send OTP'))}
                            </motion.button>
                        </form>

                        <motion.div
                            className="login-card__glass-footer"
                            variants={fadeInUp}
                        >
                            <span>Enterprise access only. All sessions recorded.</span>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
