import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { valideURLConvert } from "../utlis/valideURLConvert.js";
import { getProductByCategoryAndSubCategoryId } from "../services/operations/productApi.js";
import CardProduct from "../components/CardProduct.jsx";
import { FiChevronRight, FiPackage } from "react-icons/fi";

const ProductListPage = () => {
    // State
    const [subCategoryData, setSubCategoryData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(12);

    // Params
    const params = useParams();
    const rawCategory = params?.categoryId ?? "";
    const rawSubCategory = params?.subcategoryId ?? "";

    const categoryId = useMemo(() => {
        const parts = String(rawCategory).split("-");
        return parts.length ? parts[parts.length - 1] : rawCategory;
    }, [rawCategory]);

    const subCategoryId = useMemo(() => {
        const parts = String(rawSubCategory).split("-");
        return parts.length ? parts[parts.length - 1] : rawSubCategory;
    }, [rawSubCategory]);

    // Simple readable titles
    const categoryTitle = useMemo(() => {
        const title = String(rawCategory).split("-").slice(0, -1).join(" ").replace(/-/g, " ");
        return title.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || "Category";
    }, [rawCategory]);

    const subCategoryTitle = useMemo(() => {
        const title = String(rawSubCategory).split("-").slice(0, -1).join(" ").replace(/-/g, " ");
        return title.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || "";
    }, [rawSubCategory]);

    // Store
    const { subCategories } = useSelector((state) => state.subCategory);
    const { accessToken } = useSelector((state) => state.auth);

    // Build subcategory list for the given category
    useEffect(() => {
        if (!Array.isArray(subCategories)) {
            setSubCategoryData([]);
            return;
        }
        const filtered = subCategories.filter(
            (subCat) =>
                Array.isArray(subCat?.categoryId) &&
                subCat.categoryId.some((item) => item?._id === categoryId)
        );
        setSubCategoryData(filtered);
    }, [subCategories, categoryId]);

    // Load products
    useEffect(() => {
        let isActive = true;
        async function load() {
            setLoading(true);
            const data = {
                page,
                limit,
                categoryId,
                subCategoryId,
            };
            try {
                const res = await getProductByCategoryAndSubCategoryId(data, accessToken);
                if (isActive) {
                    setProductData(res?.data ?? []);
                    setTotalPages(res?.totalPages ?? 1);
                }
            } catch {
                if (isActive) {
                    setProductData([]);
                    setTotalPages(1);
                }
            } finally {
                if (isActive) setLoading(false);
            }
        }
        load();
        return () => {
            isActive = false;
        };
    }, [categoryId, subCategoryId, page, limit, accessToken]);

    // Reset page on change
    useEffect(() => {
        setPage(1);
    }, [subCategoryId, categoryId]);

    // Helpers
    const isActiveSub = (id) => id === subCategoryId;
    const handlePrev = () => setPage((p) => Math.max(1, p - 1));
    const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

    // UI: Simple Header
    const Header = () => (
        <div className="mb-6">
            {/* Breadcrumbs */}
            <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                <Link to="/" className="hover:text-green-600 transition-colors">
                    Home
                </Link>
                <FiChevronRight className="w-3 h-3" />
                <span className="text-gray-800">{categoryTitle}</span>
                {subCategoryTitle && (
                    <>
                        <FiChevronRight className="w-3 h-3" />
                        <span className="text-green-600">{subCategoryTitle}</span>
                    </>
                )}
            </nav>

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900">
                {subCategoryTitle || categoryTitle}
            </h1>
        </div>
    );

    // UI: Enhanced Subcategory Sidebar with Images
    const Sidebar = () => (
        <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden sticky top-4">
                {/* Header */}
                <div className="px-4 py-3 border-b bg-gray-50">
                    <h3 className="font-semibold text-gray-900 text-sm">
                        Browse Categories
                    </h3>
                </div>

                {/* Category List */}
                <div className="max-h-[70vh] overflow-y-auto">
                    {subCategoryData?.length > 0 ? (
                        <div className="p-2">
                            {subCategoryData.map((subCat) => {
                                const isActive = isActiveSub(subCat?._id);
                                const link = `/${valideURLConvert(subCat?.categoryId?.[0]?.name)}-${subCat?.categoryId?.[0]?._id}/${valideURLConvert(subCat?.name)}-${subCat?._id}`;

                                return (
                                    <Link
                                        to={link}
                                        key={subCat?._id}
                                        className={`flex items-center gap-3 p-3 rounded-lg mb-2 transition-all group ${
                                            isActive
                                                ? "bg-green-50 border border-green-200"
                                                : "hover:bg-gray-50 border border-transparent"
                                        }`}
                                    >
                                        {/* Category Image */}
                                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                            {subCat?.image ? (
                                                <img
                                                    src={subCat.image}
                                                    alt={subCat?.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                            ) : null}
                                            <div
                                                className={`w-full h-full ${subCat?.image ? 'hidden' : 'flex'} items-center justify-center`}
                                                style={{ display: subCat?.image ? 'none' : 'flex' }}
                                            >
                                                <FiPackage className="w-5 h-5 text-gray-400" />
                                            </div>
                                        </div>

                                        {/* Category Name */}
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-sm font-medium truncate ${
                                                isActive ? "text-green-700" : "text-gray-900 group-hover:text-gray-700"
                                            }`}>
                                                {subCat?.name}
                                            </p>
                                        </div>

                                        {/* Active Indicator */}
                                        {isActive && (
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12 px-4">
                            <FiPackage className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-sm text-gray-500">No categories available</p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );

    // UI: Mobile Subcategory Rail with Images
    const MobileCategoryRail = () => (
        <div className="lg:hidden mb-6">
            <div className="bg-white rounded-lg border p-3">
                <h4 className="font-medium text-gray-900 mb-3 text-sm">Categories</h4>
                <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2">
                    {subCategoryData?.map((subCat) => {
                        const isActive = isActiveSub(subCat?._id);
                        const link = `/${valideURLConvert(subCat?.categoryId?.[0]?.name)}-${subCat?.categoryId?.[0]?._id}/${valideURLConvert(subCat?.name)}-${subCat?._id}`;

                        return (
                            <Link
                                to={link}
                                key={subCat?._id}
                                className={`flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-lg border transition-all min-w-[80px] ${
                                    isActive
                                        ? "bg-green-50 border-green-200 text-green-700"
                                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                {/* Category Image */}
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                                    {subCat?.image ? (
                                        <img
                                            src={subCat.image}
                                            alt={subCat?.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                    ) : null}
                                    <div
                                        className={`w-full h-full ${subCat?.image ? 'hidden' : 'flex'} items-center justify-center`}
                                        style={{ display: subCat?.image ? 'none' : 'flex' }}
                                    >
                                        <FiPackage className="w-4 h-4 text-gray-400" />
                                    </div>
                                </div>

                                {/* Category Name */}
                                <span className="text-xs font-medium text-center leading-tight">
                                    {subCat?.name}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );

    // UI: Skeleton Loading
    const SkeletonCard = () => (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse">
            <div className="aspect-square bg-gray-100"></div>
            <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-100 rounded w-4/5"></div>
                <div className="h-5 bg-gray-100 rounded w-1/2"></div>
                <div className="h-8 bg-gray-100 rounded w-full"></div>
            </div>
        </div>
    );

    // UI: Empty State
    const EmptyState = () => (
        <div className="col-span-full bg-white rounded-lg border-2 border-dashed border-gray-200 p-12 text-center">
            <FiPackage className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try selecting a different category.</p>
        </div>
    );

    // UI: Product Grid
    const ProductGrid = () => (
        <div className="bg-white rounded-lg border p-4 lg:p-6">
            {/* Results Header */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                    {loading ? "Loading products..." : `${productData.length} Products Available`}
                </h2>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {loading ? (
                    Array.from({ length: limit }).map((_, i) => <SkeletonCard key={i} />)
                ) : productData.length > 0 ? (
                    productData.map((product) => (
                        <div key={product?._id}>
                            <CardProduct
                                card={product}
                                onAddToCart={(product) => {
                                    console.log("Add to cart:", product);
                                }}
                                onToggleFavorite={(product) => {
                                    console.log("Toggle favorite:", product);
                                }}
                            />
                        </div>
                    ))
                ) : (
                    <EmptyState />
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && !loading && productData.length > 0 && (
                <div className="mt-8 flex items-center justify-center gap-3">
                    <button
                        onClick={handlePrev}
                        disabled={page === 1}
                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                            page === 1
                                ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
                                : "bg-white hover:bg-green-50 text-gray-700 border-gray-300 hover:border-green-400"
                        }`}
                    >
                        Previous
                    </button>

                    <div className="flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200">
                        <span className="text-sm font-medium">
                            Page {page} of {totalPages}
                        </span>
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={page === totalPages}
                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                            page === totalPages
                                ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
                                : "bg-white hover:bg-green-50 text-gray-700 border-gray-300 hover:border-green-400"
                        }`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-6">
                {/* Simple Header */}
                <Header />

                {/* Mobile Category Rail */}
                <MobileCategoryRail />

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Desktop Sidebar */}
                    <div className="hidden lg:block">
                        <Sidebar />
                    </div>

                    {/* Products */}
                    <div className="flex-1">
                        <ProductGrid />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListPage;