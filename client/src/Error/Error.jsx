import React from 'react';
import { Link } from 'react-router';
import errorAnimation from '../assets/Animations/Error.json'
import Lottie from 'lottie-react';
const Error = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
            {/* Lottie Animation Placeholder */}
            <div className="w-80 h-80 mb-6">
\                <Lottie animationData={errorAnimation} loop={true} />
            </div>

            <h1 className="text-4xl font-bold text-red-500 mb-2">Oops! Page not found</h1>
            <p className="text-gray-600 mb-6">The page you're looking for doesn't exist or has been moved.</p>

            <Link 
                to="/"
                className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default Error;
