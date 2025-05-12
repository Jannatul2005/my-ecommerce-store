import Link from 'next/link'

type Product = {
  id: number
  title: string
  description: string
  price: number
  image: string
  category: string
}

export default async function ProductDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`)
  const product: Product = await res.json()

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      {/* ✅ Back Button */}
      <Link
        href="/store"
        className="inline-block mb-4 text-indigo-600 hover:text-indigo-800 hover:underline"
      >
        ← Back to Store
      </Link>

      <div className="flex flex-col md:flex-row gap-10">
        <img
          src={product.image}
          alt={product.title}
          className="w-64 h-64 object-contain mx-auto"
        />
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-indigo-600 font-bold text-xl mt-4">
            ${product.price}
          </p>
          <p className="text-sm text-gray-500 mt-2">Category: {product.category}</p>
        </div>
      </div>
    </div>
  )
}
