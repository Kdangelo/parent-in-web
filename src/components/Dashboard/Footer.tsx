import Logo from "../../assets/logo-footer.png";
import { IconInstagram, IconYoutube, IconLinkedin } from "../Icons/Icons"; 

export default function Footer() {
  const titleStyle = {
    fontWeight: '600',
    fontSize: '15px',
    lineHeight: '140%',
    color: '#FFFFFF'
  };

  return (
    <footer 
      className="w-full bg-[#393939] text-white flex items-center overflow-hidden py-10 md:py-0"
      style={{ minHeight: '250px', opacity: 1 }}
    >
      <div 
        className="w-full max-w-[1512px] mx-auto flex flex-col md:flex-row items-start md:items-baseline px-8 md:px-0"
        style={{ 
          paddingLeft: window.innerWidth > 768 ? '117px' : '32px',
          paddingRight: window.innerWidth > 768 ? '117px' : '32px' 
        }}
      >
        
        {/* mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 w-full md:flex-1 order-1 md:order-2">
          
          <div className="flex flex-col">
            <h4 style={titleStyle} className="mb-4">Contacto</h4>
            <div className="text-[#A3A3A3] text-[14px] space-y-1">
              <p>+54 **********</p>
              <p className="break-all">helloparentin@gmail.com</p>
            </div>
          </div>

          <div className="flex flex-col">
            <h4 style={titleStyle} className="mb-4">Recursos</h4>
            <ul className="text-[#A3A3A3] text-[14px] space-y-2">
              <li className="cursor-pointer hover:text-white">Lectura</li>
              <li className="cursor-pointer hover:text-white">Videos</li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h4 style={titleStyle} className="mb-4">Legales</h4>
            <ul className="text-[#A3A3A3] text-[14px] space-y-2">
              <li className="cursor-pointer hover:text-white">Privacidad</li>
              <li className="cursor-pointer hover:text-white">Términos</li>
            </ul>
          </div>

          <div className="flex flex-col"> 
            <h4 style={titleStyle} className="mb-4">Siguenos</h4>
            <div className="flex items-center gap-4">
              <a href="#" className="text-[#A3A3A3] hover:text-white"><IconInstagram /></a>
              <a href="#" className="text-[#A3A3A3] hover:text-white"><IconYoutube /></a>
              <a href="#" className="text-[#A3A3A3] hover:text-white"><IconLinkedin /></a>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start mt-12 md:mt-0 md:w-1/4 order-2 md:order-1 md:mr-20">
          <img src={Logo} alt="Parent In" className="w-[180px] mb-4" />
          <div className="text-[#A3A3A3] text-[12px] whitespace-nowrap">
            <p>© 2026 Parent In™ All rights reserved</p>
          </div>
        </div>

      </div>
    </footer>
  );
}