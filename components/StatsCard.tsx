type StatsCardProps = {
  title: string
  value: string | number
}

export function StatsCard({ title, value }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-4 w-full">
      <div className="text-gray-500 text-sm mb-1">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  )
}
