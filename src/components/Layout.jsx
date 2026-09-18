import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ children }) {
  return (
    <div className="layout">

      <Sidebar />

      <div className="content-area">
        <Header />

        <main className="content">
          {children}
        </main>
      </div>

    </div>
  );
}

export default Layout;