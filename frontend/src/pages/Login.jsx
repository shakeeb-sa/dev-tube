import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-950 text-white">
            {/* Visual Side */}
            <div className="hidden lg:flex w-1/2 bg-primary-600 items-center justify-center p-12 relative overflow-hidden">
                <div className="z-10 text-center">
                    <img 
                        src="https://illustrations.popsy.co/white/secure-login.svg" 
                        alt="Login" 
                        className="w-full max-w-md mx-auto mb-8 drop-shadow-2xl"
                    />
                    <h2 className="text-4xl font-black mb-4">Master Your Code.</h2>
                    <p className="text-primary-100 text-lg">Save your progress, take notes, and build your library.</p>
                </div>
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full -mr-32 -mt-32 opacity-50 blur-3xl"></div>
            </div>

            {/* Form Side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-900">
                <div className="max-w-md w-full">
                    <div className="mb-10 text-center lg:text-left">
                        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                        <p className="text-slate-400">Please enter your details to sign in.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-slate-300">EMAIL ADDRESS</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input 
                                    type="email" 
                                    required 
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"
                                    placeholder="coder@example.com"
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary-900/20">
                            Sign In <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>

                    <p className="mt-8 text-center text-slate-400">
                        Don't have an account? 
                        <Link to="/register" className="text-primary-400 font-bold ml-2 hover:underline">Create Account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;