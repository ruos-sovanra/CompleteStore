'use client'
import {useGetProductByIdQuery} from "@/redux/service/product";
import UpdateProductComponent from "@/Components/update/UpdateProductComponent";

type PropsParams = {
    params: {
        id: number;
    };
    searchParams: any;
};
const UpdatePage = (props:PropsParams) => {
    console.log(props);
    const id = props.params.id;
    const { data, error, isLoading } = useGetProductByIdQuery(id);


    return (
        <section>
        <UpdateProductComponent product={data}  />
        </section>
    );
}

export default UpdatePage;