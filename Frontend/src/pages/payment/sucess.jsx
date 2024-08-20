import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const redirectTimeout = setTimeout(() => {
            navigate('/dashboard', { replace: true });
        }, 3000); // Replace 3000 with the desired number of milliseconds before redirecting

        return () => {
            clearTimeout(redirectTimeout);
        };
    }, [navigate]);

    return (
        <div>
            <h1>Payment Successful!</h1>
            <p>Thank you for your purchase.</p>
            <p>You will be redirected to the dashboard shortly...</p>
        </div>
    );
};

export default SuccessPage;