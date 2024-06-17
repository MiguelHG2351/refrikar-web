import LineChart from "@/components/charts/Line";

export default function Egresos() {



  return (
      <section className="px-6 py-4">
        <h1 className="text-2xl font-bold">Egresos</h1>
        <p>En esta sección podrá ver los egresos realizados y un promedio de cada uno</p>
        <LineChart />
      </section>
  )
}