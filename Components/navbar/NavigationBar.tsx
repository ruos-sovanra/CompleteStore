import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const NavigationBar = () => {
    const router = useRouter();
    const [token, setToken] = useState(null);

    useEffect(() => {
        const tokenFromStorage = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        // @ts-ignore
        setToken(tokenFromStorage);
    }, []);

    const handleLogout = async () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
        }
        router.push('/login');
    };

    return (
        <nav>
            {/* Other navigation links */}
            {
                token ? (
                    <>
                        <button onClick={() => router.push('/dashboard')} className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]">
                            Dashboard
                        </button>
                        <button onClick={handleLogout} className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]">
                            Logout
                        </button>
                    </>
                ) : (
                    <button onClick={() => router.push('/auth/login')} className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]">
                        Sign In
                    </button>
                )
            }
        </nav>
    );
};

export default NavigationBar;