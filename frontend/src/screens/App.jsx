import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import MapView from './MapView.jsx'
import ReportForm from './ReportForm.jsx'
import { strings } from '../i18n.js'

export default function App() {
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

  const [lang, setLang] = React.useState('en')
  const t = strings[lang]

  return (
    <div style={{ fontFamily: 'system-ui, Arial', padding: 16, maxWidth: 960 }}>
      <h1>Smart Matatu</h1>
      <nav style={{ display: 'flex', gap: 12 }} aria-label="Primary">
        <Link to="/">{t.nav_home}</Link>
        <Link to="/report">{t.nav_report}</Link>
        <Link to="/map">{t.nav_map}</Link>
        <a href="#" aria-disabled>Admin</a>
      </nav>
      <div style={{ marginTop: 8 }}>
        <label htmlFor="lang">Language: </label>
        <select id="lang" value={lang} onChange={e => setLang(e.target.value)}>
          <option value="en">English</option>
          <option value="sw">Kiswahili</option>
        </select>
      </div>
      <hr />
      <Routes>
        <Route path="/" element={<p>Welcome. Use Report to submit, Map to view.</p>} />
        <Route path="/report" element={<ReportForm lang={lang} />} />
        <Route path="/map" element={<MapView />} />
      </Routes>
      <hr />
      <p>Week 3: layout, simple form & map placeholder.</p>
    </div>
  )
}

function LegacyInlineForm() {
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
    <form onSubmit={submitReport} style={{ display: 'grid', gap: 8 }}>
        <label>
          Route ID (demo ok)
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
        <button type="submit">Submit Report</button>
    </form>
  )
}


