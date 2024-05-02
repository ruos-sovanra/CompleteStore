'use client'
import {ConfirmIcon} from "@/Components/icons/FontAwsome";
import style from "./style.module.css";
import Button from "@/app/(user)/activate-confirm-email/[key]/components/Button";
import { useRouter } from "next/navigation";


type Props = {
    params: {
        key: string,
    },
    searchParams: any
}
const ActivateConfirmEmailPage = (props: Props) => {
    const router = useRouter();
    return (
        <main className={style.container}>
            {/* Confirm Email Card */}
            <section className="flex flex-col items-center">
                {/* Icon Confirm */}
                <ConfirmIcon color="#050" classname="h-44 w-44 mb-8"/>
                {/* Title */}
                <h1 className="text-6xl my-4">Email has been Confirmed!</h1>
                {/* Description */}
                <p className="text-3xl">
                    Your email confirmed with my api! you can go to login page by press below button!
                </p>
                {/* Button */}
                <Button title="Login" onClick={()=>router.push("/auth/login")}  classname="my-8"/>

            </section>
        </main>

    );
}

export default ActivateConfirmEmailPage;