import { Navigate } from "react-router-dom";
import { userStore } from "../stores/userStore";


const HomePage: React.FC = () => {

  const logged = userStore(state => state.isAuthenticated);

  return logged ? (
      <div>HomePage</div>
  ) : (
    // <div>Formulario de loguin</div>
    <Navigate to="/login" replace />
  );
}

export default HomePage;