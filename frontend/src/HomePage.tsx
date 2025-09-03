import React from "react";
import { motion } from "framer-motion";
import "./HomeTotem.css";                         
import sinncLogo from "../src/assets/images/sinnc-logo.png"; 

export default function HomePage() {
  return (
    <div className="totem-page">
      <header className="totem-header">
        <div className="brand">
          <img src={sinncLogo} alt="Logo" className="brand__logo" />
          <div className="brand__name">Sinnc</div>
        </div>
      </header>

      <main className="totem-main">
        <div className="container">
          <div className="card">
            <h1 className="title">Bem-vindo</h1>
            <p className="subtitle">Escolha uma opção para retirar sua senha</p>

            <div className="grid">
             
            </div>
          </div>
        </div>
      </main>

      <footer className="totem-footer">© {new Date().getFullYear()} Sinnc</footer>
    </div>
  );
}
