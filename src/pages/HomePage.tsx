import { Navigate } from "react-router-dom";
//import { userStore } from "../stores/userStore";
import { useAuth } from "../hooks/useAuth";


const HomePage: React.FC = () => {

  //const logged = userStore(state => state.isAuthenticated);
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
      <div>HomePage</div>
  ) : (
    // <div>Formulario de loguin</div>
    <Navigate to="/login" replace />
  );
}

export default HomePage;