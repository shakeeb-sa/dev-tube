import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData.username, formData.email, formData.password);
            navigate('/');
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-950 text-white">
            {/* Visual Side */}
            <div className="hidden lg:flex w-1/2 bg-indigo-600 items-center justify-center p-12 relative overflow-hidden">
                <div className="z-10 text-center">
                    <img 
                        src="https://illustrations.popsy.co/white/data-analysis.svg" 
                        alt="Register" 
                        className="w-full max-w-md mx-auto mb-8 drop-shadow-2xl"
                    />
                    <h2 className="text-4xl font-black mb-4">Level Up Your Career.</h2>
                    <p className="text-indigo-100 text-lg">Join thousands of developers tracking their learning journey.</p>
                </div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500 rounded-full -ml-32 -mb-32 opacity-50 blur-3xl"></div>
            </div>

            {/* Form Side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-900">
                <div className="max-w-md w-full">
                    <div className="mb-10 text-center lg:text-left">
                        <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                        <p className="text-slate-400">Join the DevTube community today.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-slate-300">USERNAME</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input 
                                    type="text" 
                                    required 
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"
                                    placeholder="johndoe"
                                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2 text-slate-300">EMAIL ADDRESS</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input 
                                    type="email" 
                                    required 
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"
                                    placeholder="coder@example.com"
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2 text-slate-300">PASSWORD</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input 
                                    type="password" 
                                    required 
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"
                                    placeholder="••••••••"
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg">
                            Get Started <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>

                    <p className="mt-8 text-center text-slate-400">
                        Already have an account? 
                        <Link to="/login" className="text-primary-400 font-bold ml-2 hover:underline">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;