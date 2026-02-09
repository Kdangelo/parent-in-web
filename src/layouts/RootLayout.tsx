import { Outlet } from "react-router-dom";
// import NavbarComponent from "../components/NavBarComponent";

const RootLayout: React.FC = () => (  
  <div className="min-h-screen flex flex-col">
    {/* <NavbarComponent />*/}
    <main className="bg-[#F7F6F1] p-4 grow">
      <Outlet /> 
    </main>
  </div>
);

export default RootLayout;