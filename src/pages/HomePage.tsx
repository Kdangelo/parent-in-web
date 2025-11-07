import React from "react";
import { userStore } from "../stores/userStore";


const HomePage: React.FC = () => {

  const logged = userStore(state => state.logged);

  return logged ? (
      <div>HomePage</div>
  ) : (
    <div>Formulario de loguin</div>
  );
}

export default HomePage;