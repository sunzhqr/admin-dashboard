'use client'

type QuickActionCardProps = {
  title: string
  description?: string
  buttonText: string
  onClick?: () => void
}

export function QuickActionCard({ title, description, buttonText, onClick }: QuickActionCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-4 w-full flex flex-col justify-between">
      <div>
        <h3 className="text-md font-semibold mb-1">{title}</h3>
        {description && <p className="text-sm text-gray-500 mb-4">{description}</p>}
      </div>
      <button
        onClick={onClick}
        className="self-start text-sm text-blue-600 font-medium hover:underline"
      >
        {buttonText}
      </button>
    </div>
  )
}
