import React from 'react'
import { strings } from '../i18n.js'

export default function ReportForm({ lang = 'en' }) {
  const [form, setForm] = React.useState({ routeId: '', fare: '', waitMinutes: '', crowding: 3, incident: 'none' })
  const [status, setStatus] = React.useState('')
  const t = strings[lang]

  async function submitReport(e) {
    e.preventDefault()
    setStatus('Submitting...')
    try {
      const payload = {
        routeId: form.routeId || 'demo-route-id',
        fare: form.fare ? Number(form.fare) : undefined,
        waitMinutes: form.waitMinutes ? Number(form.waitMinutes) : undefined,
        crowding: Number(form.crowding),
        incident: form.incident
      }
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setStatus('Report submitted ✔')
      setForm({ routeId: '', fare: '', waitMinutes: '', crowding: 3, incident: 'none' })
    } catch (err) {
      setStatus('Error: ' + err.message)
    }
  }

  return (
    <div>
      <h2>{t.report_title}</h2>
      <form onSubmit={submitReport} style={{ display: 'grid', gap: 8, maxWidth: 480 }}>
        <label htmlFor="routeId">
          {t.route_id}
          <input id="routeId" value={form.routeId} onChange={e => setForm({ ...form, routeId: e.target.value })} placeholder="demo-route-id" />
        </label>
        <label htmlFor="fare">
          {t.fare}
          <input id="fare" type="number" value={form.fare} onChange={e => setForm({ ...form, fare: e.target.value })} />
        </label>
        <label htmlFor="wait">
          {t.wait}
          <input id="wait" type="number" value={form.waitMinutes} onChange={e => setForm({ ...form, waitMinutes: e.target.value })} />
        </label>
        <label htmlFor="crowding">
          {t.crowding}
          <input id="crowding" type="number" min="1" max="5" value={form.crowding} onChange={e => setForm({ ...form, crowding: e.target.value })} />
        </label>
        <label htmlFor="incident">
          {t.incident}
          <select id="incident" value={form.incident} onChange={e => setForm({ ...form, incident: e.target.value })}>
            <option value="none">None</option>
            <option value="harassment">Harassment</option>
            <option value="theft">Theft</option>
            <option value="dangerous-driving">Dangerous driving</option>
            <option value="other">Other</option>
          </select>
        </label>
        <button type="submit">{t.submit}</button>
      </form>
      <p>{status}</p>
    </div>
  )
}


