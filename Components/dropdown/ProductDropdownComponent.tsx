'use client'
import { useGetProductImagesQuery} from "@/redux/service/product";
import DropDownComponent from "@/Components/dropdown/DropdownComponent";
import {useState} from "react";
import Image from "next/image";

type ImageType = {
    id: number;
    name: string;
    image: string;
}

type ProductDropdownComponentProps = {
    selectedImage: ImageType | null;
    setSelectedImage: React.Dispatch<React.SetStateAction<ImageType | null>>;
};

const ProductDropdownComponent: React.FC<ProductDropdownComponentProps> = ({selectedImage: productImage, setSelectedImage: setProductImage}) => {
    const [page, setPage] = useState(1);
    const {data, error, isLoading} = useGetProductImagesQuery({page: page, pageSize: 5});
    return (
        <section>
            <DropDownComponent results={data} setPage={setPage} page={page} selectedImage={productImage} setSelectedImage={setProductImage}/>
            {productImage && (
                <div>
                    <h2>Selected Image:</h2>
                    <Image className="w-40 h-40" src={productImage.image} alt={productImage.name} width={200} height={200}/>
                    <p>{productImage.name}</p>
                </div>
            )}
        </section>
    );
}
export default ProductDropdownComponent;