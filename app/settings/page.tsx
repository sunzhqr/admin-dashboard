'use client'

import { useState } from 'react'
import { useStore } from '../../lib/store'
import { toast } from 'react-toastify'
import { useDropzone } from 'react-dropzone'

export default function SettingsPage() {
  const settings = useStore(state => state.settings)
  const updateSettings = useStore(state => state.updateSettings)

  const [form, setForm] = useState(settings)

  const handleSave = async () => {
    updateSettings(form)
    toast.success('Настройки сохранены!')

    try {
      await fetch('/api/settings', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: { 'Content-Type': 'application/json' },
      })
      toast.success('Сохранено на сервер!')
    } catch (err) {
      toast.error('Ошибка при сохранении на сервер')
    }
  }

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setForm({ ...form, logoUrl: reader.result })
      }
    }
    if (file) reader.readAsDataURL(file)
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { 'image/*': [] } })

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-bold">Настройки магазина</h1>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Название магазина</label>
        <input
          type="text"
          value={form.shopName}
          onChange={(e) => setForm({ ...form, shopName: e.target.value })}
          className="w-full rounded border px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Логотип (загрузите изображение)</label>
        <div
          {...getRootProps()}
          className="cursor-pointer border-dashed border-2 rounded p-4 text-center text-sm bg-white hover:bg-gray-50"
        >
          <input {...getInputProps()} />
          <p className="text-gray-500">
            Перетащите файл или кликните для загрузки
          </p>
        </div>
        {form.logoUrl && (
          <img
            src={form.logoUrl}
            alt="Превью логотипа"
            className="mt-3 h-20 object-contain border rounded p-1 bg-white"
          />
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.deliveryEnabled}
          onChange={(e) => setForm({ ...form, deliveryEnabled: e.target.checked })}
        />
        <span className="text-sm">Включить доставку</span>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.whatsappEnabled}
          onChange={(e) => setForm({ ...form, whatsappEnabled: e.target.checked })}
        />
        <span className="text-sm">Интеграция с WhatsApp</span>
      </div>

      {form.whatsappEnabled && (
        <div className="mt-2">
          <label className="block text-sm text-gray-600 mb-1">WhatsApp ID / Номер</label>
          <input
            type="text"
            value={form.whatsappId || ''}
            onChange={(e) => setForm({ ...form, whatsappId: e.target.value })}
            className="w-full rounded border px-3 py-2 text-sm"
            placeholder="+7701..."
          />
        </div>
      )}

      <div>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700"
        >
          Сохранить настройки
        </button>
      </div>
    </div>
  )
}
