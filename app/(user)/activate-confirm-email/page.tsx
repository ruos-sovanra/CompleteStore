'use client'
import {MailIcon} from "@/Components/icons/FontAwsome";
import style from "./style.module.css";




const VerifyPage = () => {


    return (
        <main className={style.container}>
            {/* Confirm Email Card */}
            <section className="flex flex-col items-center">
                {/* Icon Confirm */}
                <MailIcon color="#050" classname="h-44 w-44 mb-8"/>
                {/* Title */}
                <h1 className="text-6xl my-4">Please Help help check you Gmail!!!</h1>
                {/* Description */}
                <p className="text-3xl">
                    Verify has been send to your email address to complete registration please help check your email for activation link
                </p>

            </section>
        </main>

    );
}

export default VerifyPage;