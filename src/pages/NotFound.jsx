/*
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  // ⏳ إعادة التوجيه بعد 5 ثوانٍ (اختياري)
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer); // تنظيف المؤقت عند مغادرة الصفحة
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-5xl font-bold text-red-600 mb-4">
        404 - الصفحة غير موجودة
      </h1>
      <p className="text-lg text-gray-600 max-w-lg">
        يبدو أنك حاولت الوصول إلى صفحة غير موجودة. سيتم إعادتك إلى الصفحة
        الرئيسية خلال <span className="font-semibold">5 ثوانٍ</span>.
      </p>
      <button
        onClick={() => navigate('/')}
        className="mt-6 bg-gray-800 text-white py-2 px-6 rounded-md hover:bg-gray-900 transition"
      >
        العودة الآن
      </button>
    </div>
  );
}

export default NotFound;
*/
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign:'center', marginTop:40 }}>
      <h1>404 - Page not found</h1>
      <p>صفحة غير موجودة.</p>
      <button onClick={() => navigate('/')}>Go home</button>
    </div>
  );
}
