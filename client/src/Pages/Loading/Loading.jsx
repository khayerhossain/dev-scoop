import Lottie from 'lottie-react';
import React from 'react';
import loadingAnimation from '../../assets/Animations/Loading.json';
const Loading = () => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
             <Lottie style={{ width: '100%', maxWidth: '350px' }} animationData={loadingAnimation} loop={true} />
        </div>
    );
};

export default Loading;