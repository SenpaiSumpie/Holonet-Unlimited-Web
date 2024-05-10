import React from 'react';
import ErrorCard from '@/modules/authentication/components/error-card';

const AuthErrorPage = () => {
    return (
        <div className="w-full flex justify-center pt-8">
            <ErrorCard />
        </div>
    );
};

export default AuthErrorPage;
