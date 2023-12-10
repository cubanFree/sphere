import Link from "next/link"
import { IoArrowBack } from "react-icons/io5"

export default function GoBack({ path }) {
    return <Link href={path} className="text-2xl text-gray-500 hover:text-gray-400"><IoArrowBack /></Link>
}