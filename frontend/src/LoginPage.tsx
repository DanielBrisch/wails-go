import { useState } from 'react'
import './App.css'
import { Login } from '../wailsjs/go/bindings/Auth'
import { useNavigate } from "react-router-dom";
import sinncLogo from '../src/assets/images/sinnc-logo.png'
import { models } from '../wailsjs/go/models';

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')              

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const res: models.LoginResult = await Login(username, password);
      if (res.ok) {                              
        navigate("/home");
      } else {
        setErr(res.message || "Invalid credentials");
      }
    } catch (e: any) {
      setErr(e?.message || "Erro ao autenticar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="hero">
        <div className="brand">
          <img src={sinncLogo} className="logo" />
          <h1 className="title">Bem-vindo</h1>
          <p className="subtitle">Entre para continuar</p>
        </div>

        <form className="card" onSubmit={onSubmit}>
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
