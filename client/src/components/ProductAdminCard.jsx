import React from 'react';

const ProductAdminCard = ({ data }) => {
  // Safely resolve image source from common fields
  const imageSrc =
    data?.image ||
    (Array.isArray(data?.image) ? data.image[0] : '') ||
    'https://via.placeholder.com/400x300?text=No+Image';

  const name = data?.name || 'Unnamed Product';
  const unit = data?.unit || '—';
  const price =
    typeof data?.price === 'number'
      ? data.price.toFixed(2)
      : data?.price || '—';

  const description =
    typeof data?.description === 'string' ? data.description : '';

  const truncateWords = (text, maxWords) => {
    const words = text.trim().split(/\s+/);
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '…';
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg" key={data._id}>
      {/* Image */}
      <div className="relative w-full overflow-hidden bg-gray-100">
        <img
          src={imageSrc[0]}
          alt={name}
          className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-52 md:h-48 lg:h-40"
          loading="lazy"
        />
        {/* Price badge */}
        <div className="absolute top-3 right-3">
          <span className="rounded-full bg-black/80 px-3 py-1 text-xs font-semibold text-white shadow-sm">
            ₹{price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3
            title={name}
            className="line-clamp-2 text-base font-semibold text-gray-800"
          >
            {name}
          </h3>
          <span className="shrink-0 rounded-full border border-gray-200 bg-gray-50 px-2 py-1 text-[11px] font-medium text-gray-700">
            {unit}
          </span>
        </div>

        <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
          {description
            ? truncateWords(description, 20)
            : 'No description available.'}
        </p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="text-sm font-semibold text-gray-900">
            <span className="text-gray-500">Price:</span> ₹{price}
          </div>

          <button
            type="button"
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            onClick={() => {
              // Placeholder action
              // e.g., open product detail modal or navigate
              // navigate(`/admin/products/${data?._id}`)
            }}
          >
            View
          </button>
        </div>
      </div>

      {/* Decorative gradient border on hover */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </article>
  );
};

export default ProductAdminCard;