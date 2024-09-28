import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { useNavigate } from 'react-router-dom';

const ErrorPage = ({ errorCode = 500, errorMessage = 'Server Error' }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // This goes to the previous page in the history stack
  };

  return <>
    <MainLayout>
      <div className='h-screen flex flex-col items-center justify-center'>
        <h1 className="text-4xl font-bold text-center">
          { errorCode } | { errorMessage }
        </h1>
        <h2 className="text-2xl cursor-pointer mt-4" onClick={ handleBack }>
          Click here to go back
        </h2>
      </div>
    </MainLayout>
  </>;
};

export default ErrorPage;
