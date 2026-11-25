import { NavLink, Outlet } from 'react-router'

export function Layout() {
  return (
    <div className="layout">
      <header className="header">
        <span className="logo">PULSE</span>
        <nav>
          <NavLink to="/">Accueil</NavLink>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">PULSE © {new Date().getFullYear()}</footer>
    </div>
  )
}
