import React from 'react'
import banner from '../assets/banner.jpg'
import bannerMobile from '../assets/banner-mobile.jpg'
import {useSelector} from "react-redux";
import {valideURLConvert} from "../utlis/valideURLConvert.js";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay.jsx";

const Home = () => {

    const {loading : categoryLoading, categories} = useSelector((state) => state.category)
    const {subCategories} = useSelector((state) => state.subCategory)
    const navigate = useNavigate()

    const handleRedirectProductListPage = (catId, catName) => {
        const subCat = subCategories.find((sub) => {
            const filterCategory = sub.categoryId.some((item) => {
                return item._id === catId
            })
            return filterCategory ? true : null
        })
        console.log("Subcategory: ", subCat)
        const url = `/${valideURLConvert(catName)}-${catId}/${valideURLConvert(subCat.name)}-${subCat._id}`
        navigate(url)
    }

    return (
        <section className="bg-white">

            <div className="container mx-auto my-4 px-4">

                <div className={`w-full h-full min-h-48 bg-blue-100 rounded ${!banner && "animate-pulse"}`}>

                    <img
                        src={banner}
                        alt="banner"
                        className="w-full h-full object-cover hidden lg:block"
                    />

                    <img
                        src={bannerMobile}
                        alt="banner"
                        className="w-full h-full object-cover lg:hidden"
                    />

                </div>

            </div>

            <div className={'container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10  gap-2'}>
                {
                    categoryLoading ? (
                        new Array(12).fill(0).map((item, index) => (
                            <div key={index} className="bg-white p-4  min-h-36  rounded shadow gap-2 animate-pulse">
                                <div className={'bg-blue-100 min-h-24 rounded'}></div>
                                <div className={'bg-blue-100 min-h-8 rounded'}></div>
                            </div>
                        ))
                    ) : (
                        categories.map((category) => (
                            <div key={category._id} className="h-full w-full" onClick={() => handleRedirectProductListPage(category._id, category.name)}>
                                <div>
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-scale-down"
                                    />
                                </div>
                            </div>
                        ))
                    )
                }
            </div>

            {/*Display Categories products*/}

            <div>

                {
                    categories.length > 0 && (
                        categories.map((category) => (
                            <CategoryWiseProductDisplay id={category._id} name={category.name} key={category._id+category.name} />
                        ))
                    )
                }

            </div>

        </section>
    )

}

export default Home