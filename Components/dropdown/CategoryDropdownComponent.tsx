'use client'
import {useGetCategoryImagesQuery} from "@/redux/service/product";
import DropDownComponent from "@/Components/dropdown/DropdownComponent";
import {useState} from "react";
import Image from "next/image";

type ImageType = {
    id: number;
    name: string;
    image: string;
}
type CategoryDropdownComponentProps = {
    selectedImage: ImageType | null;
    setSelectedImage: React.Dispatch<React.SetStateAction<ImageType | null>>;
};

const CategoryDropdownComponent: React.FC<CategoryDropdownComponentProps> = ({selectedImage: categoryImage, setSelectedImage: setCategoryImage}) => {
    const [page, setPage] = useState(1);
    const {data, error, isLoading} = useGetCategoryImagesQuery({page: page, pageSize: 5});
    return (
        <section>
            <DropDownComponent results={data} setPage={setPage} page={page} selectedImage={categoryImage}
                               setSelectedImage={setCategoryImage}/>
            {categoryImage && (
                <div>
                    <h2>Selected Image:</h2>
                    <Image className="w-40 h-40" src={categoryImage.image} alt={categoryImage.name} width={200}
                           height={200}/>
                    <p>{categoryImage.name}</p>
                </div>
            )}
        </section>
    );
}
export default CategoryDropdownComponent;