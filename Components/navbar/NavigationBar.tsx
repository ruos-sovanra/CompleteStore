
import { useRouter } from 'next/navigation';
import {useEffect} from "react";
import {fetchUserProfile} from "@/redux/feature/userProfile/userProfileSlice";
import {useAppDispatch} from "@/redux/hook";


const NavigationBar = () => {

    const dispatch = useAppDispatch();
    const router = useRouter();
    useEffect(() => {
        dispatch(fetchUserProfile());
    }, []);


    return (
        <nav>
            <button onClick={() => router.push('/auth/login')} className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]">
                Sign In
            </button>
        </nav>
    );
};

export default NavigationBar;