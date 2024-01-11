import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/users/login', { email, password });
            console.log('Login successful:', response.data);

            // Store the token in localStorage or context
            localStorage.setItem('token', response.data.token);

            // Redirect to another page upon successful login (e.g., '/dashboard')
            navigate('/dashboard'); 
        } catch (error) {
            console.error('Login failed:', error.response?.data?.message || 'Error occurred');
            // Handle login errors (e.g., showing an error message to the user)
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="flex flex-col justify-center w-full max-w-md px-4 mx-auto lg:w-1/2">
                <div className="w-full bg-white p-8 border border-gray-300 rounded-lg shadow-md">
                    <div className="mb-4 text-center">
                        <h1 className="text-3xl text-gray-700">Tezpur University Alumni Connect</h1>
                        <p className="text-sm text-gray-400">Please login to your account</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <input 
                            type="email"
                            name="email" 
                            id="email" 
                            placeholder="Email" 
                            aria-label="Email"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        <input 
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            aria-label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        <button 
                            type="submit" 
                            className="w-full px-4 py-2 font-bold text-white bg-orange-500 rounded-lg hover:bg-orange-600"
                        >
                            Log In
                        </button>
                    </form>

                    <div className="text-center">
                        <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot password?</a>
                    </div>

                    <div className="text-center">
                        <a href="#" className="text-sm text-indigo-600 hover:underline">Don't have an account? Register</a>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block lg:w-1/2 bg-cover" style={{backgroundImage: 'url(/path-to-background-image.jpg)'}}>
                <div className="flex h-full bg-black bg-opacity-25">
                    <div className="m-auto text-center text-white p-8">
                        <h1 className="text-3xl font-bold mb-2">We are more than just a company</h1>
                        <p className="text-lg">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;