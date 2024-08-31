import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SystemDesign from "./components/SystemDesign";

function App() {
  return (
    <>
      <nav className="flex h-16 w-full items-center justify-around bg-black">
        <NavLink
          to={"/"}
          className={(navLinkProp) => {
            const { isActive } = navLinkProp;
            return isActive
              ? `rounded-lg bg-slate-800 transition-colors ease-in`
              : "";
          }}
        >
          <button className="rounded-lg px-4 py-2 text-white transition-colors ease-in hover:bg-slate-800">
            URL Shortener
          </button>
        </NavLink>

        <NavLink
          to={"/system-design"}
          className={(navLinkProp) => {
            const { isActive } = navLinkProp;
            return isActive
              ? `rounded-lg bg-slate-800 transition-colors ease-in`
              : "";
          }}
        >
          <button className="rounded-lg px-4 py-2 text-white transition-colors ease-in hover:bg-slate-800">
            System Design Diagram
          </button>
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/system-design" element={<SystemDesign />}></Route>
      </Routes>
    </>
  );
}

export default App;
