import {Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {getProductsByCategory} from "../services/operations/productApi.js";
import {useSelector} from "react-redux";
import CardLoading from "./CardLoading";
import CardProduct from "./CardProduct.jsx";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";

const CategoryWiseProductDisplay = ({id, name, key}) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const {accessToken} = useSelector(state => state.auth)

    const loadingCardNumber = new Array(12).fill(0)

    const containerRef = useRef(null)

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            const res = await getProductsByCategory(id, accessToken)
            setData(res)
        }
        fetchData()
        setLoading(false)
    }, [])

    const handleScrollLeft = () => {
        containerRef.current.scrollLeft -= 200;
    }
    const handleScrollRight = () => {
        containerRef.current.scrollLeft += 200;
    }

    return (
        <div key={key}>

            <div className={"container mx-auto px-4 my-2 flex justify-between items-center gap-4"}>
                <h1 className={"font-bold text-xl"}>{name}</h1>
                <Link to={""} className={"font-semibold text-lg text-green-600 hover:text-green-500"}>See All</Link>
            </div>

            <div className={"relative flex items-center"}>

                <div
                    className={"container mx-auto px-4 flex gap-2 md:gap-4 lg:gap-6 scroll-smooth overflow-x-auto scrollbar-none"}
                    ref={containerRef}
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                >
                    {
                        loading && (
                            loadingCardNumber.map((item, index) => (
                                <CardLoading key={index} />
                            ))
                        )
                    }

                    {
                        data.length > 0 && (
                            data.map((item, index) => (
                                <CardProduct card={item} key={index} />
                            ))
                        )
                    }
                </div>

                <div className={"absolute w-full left-0 right-0 container mx-auto px-2 hidden lg:flex justify-between "}>
                    <button onClick={handleScrollLeft} className={"z-10 rounded-full relative bg-white hover:bg-gray-100 p-2 shadow-lg text-lg"}>
                        <FaAngleLeft />
                    </button>

                    <button onClick={handleScrollRight} className={"z-10 rounded-full relative bg-white hover:bg-gray-100 p-2 shadow-lg text-lg"}>
                        <FaAngleRight />
                    </button>
                </div>

            </div>

        </div>
    )
}
export default CategoryWiseProductDisplay