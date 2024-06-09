import {Button} from "@nextui-org/react";
import prisma from "@/config/prisma";
import {getCategoriaWithProductos} from "@/services/Producto";
import {ProductoList} from "@/components/cards/productos/ProductoList";


const products = [
  {
    id: 1,
    name: "Classic Leather Shoes",
    description: "Elegant and comfortable",
    price: 59.99,
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Designer Handbag",
    description: "Fashion statement",
    price: 89.99,
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    description: "Crystal clear audio",
    price: 69.99,
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Vintage Pocket Watch",
    description: "Antique charm",
    price: 79.99,
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Cozy Throw Blanket",
    description: "Soft and warm",
    price: 39.99,
    image: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Minimalist Desk Lamp",
    description: "Elegant lighting",
    price: 49.99,
    image: "/placeholder.svg",
  },
  {
    id: 7,
    name: "Artisan Ceramic Mug",
    description: "Handcrafted design",
    price: 24.99,
    image: "/placeholder.svg",
  },
  {
    id: 8,
    name: "Outdoor Camping Gear",
    description: "Adventure-ready",
    price: 99.99,
    image: "/placeholder.svg",
  },
]
const categories = [
  { id: 1, name: "Apparel" },
  { id: 2, name: "Accessories" },
  { id: 3, name: "Home & Living" },
  { id: 4, name: "Outdoor" },
]

export default async function ProductosPage() {
  const productos = await getCategoriaWithProductos()

  return (
      <section className="px-6 py-4">
        <ProductoList categorias={productos}/>
      </section>
  )
}