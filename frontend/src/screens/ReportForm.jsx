import React from 'react'

export default function ReportForm() {
  const [form, setForm] = React.useState({ routeId: '', fare: '', waitMinutes: '', crowding: 3, incident: 'none' })
  const [status, setStatus] = React.useState('')

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
      <h2>Submit Report</h2>
      <form onSubmit={submitReport} style={{ display: 'grid', gap: 8, maxWidth: 480 }}>
        <label>
          Route ID
          <input value={form.routeId} onChange={e => setForm({ ...form, routeId: e.target.value })} placeholder="demo-route-id" />
        </label>
        <label>
          Fare (KES)
          <input type="number" value={form.fare} onChange={e => setForm({ ...form, fare: e.target.value })} />
        </label>
        <label>
          Wait (mins)
          <input type="number" value={form.waitMinutes} onChange={e => setForm({ ...form, waitMinutes: e.target.value })} />
        </label>
        <label>
          Crowding (1-5)
          <input type="number" min="1" max="5" value={form.crowding} onChange={e => setForm({ ...form, crowding: e.target.value })} />
        </label>
        <label>
          Incident
          <select value={form.incident} onChange={e => setForm({ ...form, incident: e.target.value })}>
            <option value="none">None</option>
            <option value="harassment">Harassment</option>
            <option value="theft">Theft</option>
            <option value="dangerous-driving">Dangerous driving</option>
            <option value="other">Other</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
      <p>{status}</p>
    </div>
  )
}


