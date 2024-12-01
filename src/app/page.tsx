import { Metadata } from 'next'
import Link from "next/link";
import {OpenIcon} from "@/components/icons/Icons";

export const metadata: Metadata = {
  title: 'Dashboard'
}

export default function Home() {
  return (
      <main className="min-h-screen md:grid justify-center items-center">
        <section>
          <p className="font-bold text-3xl">Sitio equivocado, ir a <Link className="text-slate-600 inline-flex items-center" href="/home/clientes">clientes <OpenIcon width={28} height={28} className="fill-gray-400" /></Link></p>
        </section>
      </main>
  );
}
