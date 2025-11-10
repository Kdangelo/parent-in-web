import { Link } from "react-router-dom";
import madre from "../../assets/madre.jpg";

const RegisterFormComonent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="relative hidden lg:block h-full w-full">
          <div className="flex flex-col items-center justify-center h-full p-8 bg-[#B5CCBE] text-white">
            <div className="max-w-md mx-auto text-center space-y-6">
              <img
                src={madre}
                alt="madre"
                width={300}
                height={300}
                className="mx-auto"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-sm space-y-8">
            <div className="text-center">
              <h1 className="text-2xl font-script mb-6">
                Registro Nuevo Usuario
              </h1>
              <h2 className="text-xl text-gray-600">Bienvenid@ a Parent-In</h2>
            </div>

            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-500" htmlFor="name">
                  Apellido y Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Apellido y Nombre"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-500" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="example@mail.com"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-500" htmlFor="password">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Ingrese aquí su contraseña"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm text-gray-500"
                  htmlFor="passwordConfirm"
                >
                  Contraseña
                </label>
                <input
                  id="passwordConfirm"
                  type="password"
                  placeholder="Repita su contraseña"
                  className="w-full p-2 border rounded"
                  required
                />
                {/* <div className="text-right">
                  <input type="checkbox" name="" id="" required/>
                  <label className="text-sm text-gray-500 hover:text-gray-700">Acepto téminos y condiciones.</label>
                </div> */}
                <div className="text-right">
                  <div className="flex items-center justify-end">
                    <input
                      type="checkbox"
                      name=""
                      id="terms-checkbox"
                      required
                      className="mr-2"
                    />
                    <label
                      htmlFor="terms-checkbox"
                      className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                      Acepto términos y condiciones.
                    </label>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gray-600 hover:bg-gray-700 text-white rounded-xl py-3 px-6">
                Registrarme
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">O</span>
                </div>
              </div>

              <p className="text-center text-sm text-gray-500">
                <Link to="/login" className="text-gray-600 hover:text-gray-800">
                  Igresar al sitio
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterFormComonent;
