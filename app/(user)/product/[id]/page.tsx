
import {Metadata, ResolvingMetadata} from "next";
import PageDetailLayout from "@/Components/page_detail/PageDetail";
import {useGetProductByIdQuery} from "@/redux/service/product";



export type PropsParams = {
    params: {
        id: number;
    };
    searchParams: any;
};

const BaseUrl = process.env.BASE_URL;

export async function generateMetadata(
    { params, searchParams }: PropsParams,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const id = params.id;
    console.log(id)

    // fetch data
    const product = await fetch(`${BaseUrl}products/${id}`).then((res) => res.json());

    // optionally access and extend (rather than replace) parent metadata
    // const previousImages = (await parent).openGraph?.images || [];

    return {
        title: product.title,
        description: product.description,
        openGraph: {
            images: product.image,
        },
    };
}

const PageDetail = (props:PropsParams) => {
    const id= props.params.id;
    console.log(id)
    return (
        <main className="container mx-5 mt-20">
            <PageDetailLayout id={id} />
        </main>
    );
}
export default PageDetail;