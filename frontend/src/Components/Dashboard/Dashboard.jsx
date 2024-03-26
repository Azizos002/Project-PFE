import * as React from "react";

function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <div className="logo" />
        <nav className="navigation">
          <div className="nav-item active">Home</div>
          <div className="nav-item">Web designs</div>
          <div className="nav-item">Mobile designs</div>
          <div className="nav-item">Design principles</div>
          <div className="nav-item">Illustrations</div>
        </nav>
      </div>
      <div className="user-actions">
        <div className="language-selector">
          <div className="language">English (united States)</div>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e96e2951d4d4149907f5719f66c0f1c708912cefd040e5214f5c1c4ccc053728?apiKey=bb51d1f85b4142cca2054214c8edbd7b&" alt="" className="language-icon" />
        </div>
        <div className="auth-button">
          <div className="auth-content">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/2e587b7a8c19bcbddbad7d4451679fd368cbc0ce84802be8c33baf6a0b4cc212?apiKey=bb51d1f85b4142cca2054214c8edbd7b&" alt="" className="auth-icon" />
            <div className="auth-text">Sign in or create an account</div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Divider() {
  return <div className="divider" />;
}

function Dashboard() {
  return (
    <>
      <div className="container">
        <Header />
        <Divider />
      </div>
      <style jsx>{`
        .container {
          background-color: #fff;
          display: flex;
          flex-direction: column;
          font-size: 16px;
          font-weight: 400;
          padding-top: 16px;
        }
        
        .header {
          align-self: center;
          display: flex;
          gap: 20px;
          justify-content: space-between;
          max-width: 1360px;
          width: 100%;
        }
        
        @media (max-width: 991px) {
          .header {
            flex-wrap: wrap;
            max-width: 100%;
          }
        }
        
        .logo-container {
          display: flex;
          gap: 20px;
          color: rgba(102, 102, 102, 0.8);
          flex-grow: 1;
          flex-basis: auto;
        }
        
        @media (max-width: 991px) {
          .logo-container {
            flex-wrap: wrap;
          }
        }
        
        .logo {
          background-color: #c4c4c4;
          border-radius: 50%;
          height: 40px;
          width: 40px;
        }
        
        .navigation {
          align-self: start;
          display: flex;
          gap: 20px;
          justify-content: space-between;
          flex-grow: 1;
          flex-basis: auto;
          margin-top: 12px;
          padding: 0 20px;
        }
        
        @media (max-width: 991px) {
          .navigation {
            flex-wrap: wrap;
          }
        }
        
        .nav-item {
          font-family: Poppins, sans-serif;
        }
        
        .active {
          color: #111;
          font-weight: 500;
        }
        
        .user-actions {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-grow: 1;
          flex-basis: auto;
        }
        
        @media (max-width: 991px) {
          .user-actions {
            flex-wrap: wrap;
          }
        }
        
        .language-selector {
          display: flex;
          gap: 2px;
          justify-content: center;
          color: #333;
          margin: auto 0;
          padding: 0 20px 0 8px;
        }
        
        .language {
          font-family: Poppins, sans-serif;
        }
        
        .language-icon {
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
          width: 24px;
        }
        
        .auth-button {
          border: 1px solid rgba(17, 17, 17, 1);
          border-radius: 8px;
          color: #111;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 8px 13px;
          text-align: center;
        }
        
        .auth-content {
          display: flex;
          gap: 8px;
          justify-content: center;
        }
        
        .auth-icon {
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
          width: 24px;
        }
        
        .auth-text {
          font-family: Poppins, sans-serif;
        }
        
        .divider {
          background-color: rgba(102, 102, 102, 0.25);
          margin-top: 15px;
          min-height: 1px;
          width: 100%;
        }
        
        @media (max-width: 991px) {
          .divider {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
}
export default Dashboard;