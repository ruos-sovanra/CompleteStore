
import HeroSection from "@/Components/hero/HeroSection";

import ProductPage from "@/Components/product/productPage";
import {Metadata} from "next";
import CategoryComponent from "@/Components/categorypreview/CategoryComponent";



export const metadata: Metadata = {
    title: "CSTAD Ecommerce",
    description: "This is our policy page",
    openGraph:{
        type:"website",
        url:"https://ecommerce.sovanra.me/",
        title:"CSTAD Ecommerce",
        description:"This is our policy page",
        images:"https://www.istad.co/resources/img/CSTAD_120.png",
    },
}
export default function Home() {

    return (
    <main className="flexs">
        <HeroSection />
        <CategoryComponent />
        <ProductPage />
    </main>
  );
}
