import { useMemo, useState } from "react";
import { FiShoppingCart} from "react-icons/fi";
import {Link} from "react-router-dom";
import {valideURLConvert} from "../utlis/valideURLConvert.js";

const CardProduct = ({ card, onAddToCart}) => {
    const [imgSrc, setImgSrc] = useState(card?.image?.[0] || "");
    const [isLoading, setIsLoading] = useState(false);

    const name = card?.name || "Product";
    const unit = card?.unit || "";
    const price = card?.price ?? 0;
    const discount = card?.discount ?? 0;
    const originalPrice = discount > 0 ? price / (1 - discount / 100) : price;
    const stock = card?.stock ?? 0;

    const priceText = useMemo(() => {
        try {
            const num = Number(price);
            if (Number.isNaN(num)) return String(price);
            return new Intl.NumberFormat('en-IN', {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
            }).format(num);
        } catch {
            return `₹${price}`;
        }
    }, [price]);

    const originalPriceText = useMemo(() => {
        if (discount <= 0) return null;
        try {
            const num = Number(originalPrice);
            if (Number.isNaN(num)) return null;
            return new Intl.NumberFormat('en-IN', {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
            }).format(num);
        } catch {
            return `₹${originalPrice}`;
        }
    }, [originalPrice, discount]);

    const fallbackImg = `data:image/svg+xml;base64,${btoa(`
        <svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'>
            <rect width='100%' height='100%' fill='#f1f5f9'/>
            <circle cx='150' cy='120' r='30' fill='#cbd5e1'/>
            <rect x='120' y='160' width='60' height='40' rx='5' fill='#cbd5e1'/>
            <text x='150' y='220' text-anchor='middle' fill='#64748b' font-family='Arial' font-size='12'>No Image</text>
        </svg>
    `)}`;

    const handleAddToCart = async () => {
        if (stock <= 0) return;
        setIsLoading(true);
        try {
            if (typeof onAddToCart === "function") {
                await onAddToCart(card);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const url = `/product/${valideURLConvert(card?.name)}-${card?._id}`

    return (
        <Link to={url} className="group h-full">
            <article className="w-48 sm:w-52 md:w-56 lg:w-60 flex-shrink-0 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">

                {/* Image Container */}
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    <img
                        src={imgSrc || fallbackImg}
                        alt={name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={() => setImgSrc(fallbackImg)}
                    />

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {discount > 0 && (
                            <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                {discount}% OFF
                            </span>
                        )}
                        {unit && (
                            <span className="bg-white/95 text-gray-700 text-xs font-medium px-2 py-1 rounded-full border">
                                per {unit}
                            </span>
                        )}
                    </div>

                    {/* Stock Status */}
                    {stock <= 0 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                Out of Stock
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                    {/* Product Name */}
                    <h3
                        title={name}
                        className="text-gray-900 text-sm md:text-base font-semibold line-clamp-2 leading-tight min-h-[2.5rem] hover:text-green-600 transition-colors cursor-pointer"
                    >
                        {name}
                    </h3>

                    {/* Price Section */}
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="text-green-600 text-lg md:text-xl font-bold">
                                {priceText}
                            </span>
                            {originalPriceText && (
                                <span className="text-gray-400 text-sm line-through">
                                    {originalPriceText}
                                </span>
                            )}
                        </div>

                        {/* Stock Info */}
                        <div className="flex items-center justify-between">
                            <span className={`text-xs ${
                                stock > 10 ? 'text-green-600' :
                                    stock > 0 ? 'text-orange-500' : 'text-red-500'
                            }`}>
                                {stock > 10 ? 'In Stock' :
                                    stock > 0 ? `Only ${stock} left` : 'Out of Stock'}
                            </span>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        type="button"
                        onClick={handleAddToCart}
                        disabled={stock <= 0 || isLoading}
                        className={`w-full flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-sm font-semibold transition-all duration-200 ${
                            stock <= 0
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md active:scale-95'
                        }`}
                        aria-label={stock <= 0 ? 'Out of stock' : 'Add to cart'}
                    >
                        {isLoading ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <FiShoppingCart className="w-4 h-4" />
                        )}
                        <span className="hidden sm:inline">
                            {stock <= 0 ? 'Out of Stock' : isLoading ? 'Adding...' : 'Add to Cart'}
                        </span>
                        <span className="sm:hidden">
                            {stock <= 0 ? 'Unavailable' : isLoading ? '...' : 'Add'}
                        </span>
                    </button>
                </div>
            </article>
        </Link>
    );
};

export default CardProduct;