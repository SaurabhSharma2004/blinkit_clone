import React, {useEffect, useState} from 'react'
import {getAllProducts} from "../services/operations/productApi.js";
import ProductAdminCard from "../components/ProductAdminCard";
import {useSelector} from "react-redux";
import {useDebounce} from "../hooks/useDebounce";

const ProductAdmin = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const [search, setSearch] = useState('')
    const [limit, setLimit] = useState(12)

    const {accessToken} = useSelector(state => state.auth)
    const debouncedValue = useDebounce(search, 500)

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }


    useEffect(() => {
        let isActive = true

        async function load() {
            const data = {
                page : page,
                limit : limit,
                search : debouncedValue
            }
            console.log('data', data)
            try {
                setLoading(true)
                const res = await getAllProducts(data, accessToken)
                if (!isActive)return
                if(res?.success){
                    setProducts(res?.data)
                    setTotalPages(res?.totalPages)
                    setTotalCount(res?.totalCount)
                }else {
                    setProducts([])
                    setTotalPages(1)
                    setTotalCount(0)
                }
            } catch (e) {
                if (!isActive)return
                setProducts([])
                setTotalPages(1)
                setTotalCount(0)
            }finally {
                if (isActive)setLoading(false)
            }
        }
        load()
        return () => {
            isActive = false
        }
    }, [page, debouncedValue, limit])

    const handleNext = () => setPage((p) => Math.min(p+1, totalPages))
    const handlePrev = () => setPage((p) => Math.max(p-1, 1))

    return (
        <section className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                {/*Header*/}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-lg shadow p-4">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3 sm:mb-0">
                        Products
                    </h2>
                    <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="flex-grow sm:flex-grow-0 w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                            onChange={handleSearch}
                            value={search}
                        />
                    </div>
                </div>

                <div >
                    {
                        loading ? <div>Loading...</div> : (
                            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {
                                    products.map((product) => (
                                        <ProductAdminCard data={product} />
                                    ))
                                }
                            </div>
                        )
                    }
                </div>

                <div className="flex justify-center items-center mt-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
                        onClick={handlePrev}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    <span className="mx-2">Page {page} of {totalPages}</span>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded" onClick={handleNext} disabled={page === totalPages}>
                        Next
                    </button>
                </div>

            </div>
        </section>
    )
}

export default ProductAdmin