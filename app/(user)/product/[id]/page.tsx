
import {Metadata, ResolvingMetadata} from "next";



export type PropsParams = {
    params: {
        id: number;
    };
    searchParams: any;
};

const BaseUrl = process.env.BASE_URL;
const getData = async (id: number) => {
    const res = await fetch(`${BaseUrl}products/${id}/`);
    const data = await res.json();
    console.log(data);
    return data;
};
export async function generateMetadata(
    { params, searchParams }: PropsParams,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const id = params.id;

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

const PageDetail = async (props:PropsParams) => {
    const data = await getData(props.params.id);
    return (
        <main className="container mx-5 mt-20">
            <section className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center">
                <div className="flex flex-col gap-6 lg:w-2/4">
                    <img src={data.image} alt="" className="w-full aspect-square object-cover rounded-lg"/>
                    {/*<div className="flex flex-row justify-between h-24">*/}
                    {/*    <img src="" alt="" className="w-24 h-24 rounded-md cursor-pointer" onClick={()=>setActive("")}/>*/}
                    {/*</div>*/}
                </div>
                <div className="flex flex-col gap-6 lg:w-2/4">
                    <div>
                    <span className="text-violet-600 font-semibold">
                        {data.seller}
                    </span>
                        <h1 className="text-3xl font-bold">{data.name}</h1>
                    </div>
                    <p className="text-gray-600">
                        {data?.desc || "No description"}
                    </p>
                    <h6 className="text-2xl font-semibold"> ${data.price}</h6>
                    <div className="flex flex-row items-center gap-16">
                        <div className="flex flex-row items-center">
                            <button className="bg-gray-200 py-2 px-3 text-3xl text-violet-600 rounded-lg">-</button>
                            <span className='py-4 px-6 rounded-lg'>1</span>
                            <button className="bg-gray-200 py-2 px-3 text-3xl text-violet-600 rounded-lg">+</button>
                        </div>
                        <button  className="bg-violet-400 text-white font-semibold py-3 px-6 h-full rounded-lg md:px-16 md:py-3">Add to Cart</button>
                    </div>
                </div>
            </section>
        </main>
    );
}
export default PageDetail;