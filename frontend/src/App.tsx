import { useState } from 'react'
import './App.css'
import { Login } from '../wailsjs/go/main/Auth'

import sinncLogo from '../src/assets/images/sinnc-logo.png'

export default function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setStatus('idle')
    try {
      const res = await Login(username, password)
      setMessage(res.message)
      setStatus(res.ok ? 'ok' : 'err')
      if (res.ok) {
        setMessage("201")
      }
    } catch (err: any) {
      setMessage(err?.message ?? 'Login error')
      setStatus('err')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <div className="hero">
        <div className="brand">
          <img src={sinncLogo} className="logo" />
          <h1 className="title">Bem-vindo</h1>
          <p className="subtitle">Entre para continuar</p>
        </div>

        <form className="card" onSubmit={handleLogin}>
          <div className="field">
            <label htmlFor="username">Usuário</label>
            <input
              id="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="field">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {message && (
            <div className={`banner ${status === 'ok' ? 'ok' : 'err'}`}>
              {message}
            </div>
          )}

          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </div>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Sinnc</span>
      </footer>
    </div>
  )
}
