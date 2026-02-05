import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Logo from "../../assets/logo.png";
import { 
  IconInicio, 
  IconRecursos, 
  IconChecklist, 
  IconCheckIn, 
  IconComunidad, 
  IconAgenda, 
  IconAjustes, 
  IconLogout
} from "../Icons/Icons"; 

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: "Inicio", path: "/dashboard", icon: IconInicio },
  { label: "Recursos", path: "/dashboard/resources", icon: IconRecursos },
  { label: "Checklist", path: "/dashboard/checklist", icon: IconChecklist },
  { label: "Check In", path: "/dashboard/checkin", icon: IconCheckIn },
  { label: "Comunidad", path: "/dashboard/community", icon: IconComunidad }, 
  { label: "Agenda", path: "/dashboard/agenda", icon: IconAgenda },
  { label: "Ajustes", path: "/dashboard/settings", icon: IconAjustes },
];

export default function SidebarComponent({ open, onClose }: SidebarProps) {
  const { logout } = useAuth();

  const getTextStyle = (isActive: boolean) => ({
    width: '185px',
    height: '22px',
    color: isActive ? '#949CB1' : '#3939394D', 
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '140%',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 300ms ease-out'
  } as React.CSSProperties);

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={onClose} />
      )}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-[365px] flex flex-col transition-transform duration-[300ms] ease-out
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        bg-white
      `}>
        
        {/* Logo Section */}
        <div className=" pt-8 px-8 pb-4">
          <img src={Logo} alt="Parent In" className="w-[265px] h-[57px]" />
        </div>

        <div className="mb-[44px] border-t border-[#8F9AB2] w-[355px]" />

        {/* Navigation Container */}
        <div className="flex-1 flex flex-col items-start px-[25px]">           
          <nav className="flex flex-col gap-5 w-full">
            {menuItems.map(({ label, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/dashboard"} 
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 group
                  w-[305px] h-[38px] rounded-[10px]
                  transition-all duration-[300ms] ease-out
                  ${isActive ? "bg-[#EDF0F9]" : "bg-transparent hover:bg-[#EDF0F9]/40"}`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon 
                      className="w-6 h-6 flex-shrink-0 transition-colors duration-[300ms]" 
                      style={{ color: isActive ? '#949CB1' : '#3939394D' }} 
                    />
                    <span style={getTextStyle(isActive)}>
                      {label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        
          <button
            onClick={() => logout()}
            className="mt-auto mb-10 flex items-center gap-3 px-4 group 
                      w-[305px] h-[38px] rounded-[10px] 
                      transition-all duration-[300ms] ease-out
                      hover:bg-[#EDF0F9]/40"
          >
            <IconLogout 
              className="w-6 h-6 transition-colors" 
              style={{ color: '#3939394D' }} 
            />
            <span 
              style={getTextStyle(false)}
            >
              Cerrar sesión
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}