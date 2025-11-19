import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import madre from "../../assets/madre.jpg";
import type { UserCreate } from "../../types/types";
import Swal from "sweetalert2";
import { createUserService } from "../../services/userService";

const RegisterFormComonent = () => {
  const { register, handleSubmit } = useForm<UserCreate>();
  const [loading, setLoading] = useState(false);

  const [errorPasswd, setErrorPasswd] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (values: UserCreate) => {
    setErrorPasswd("");
    setLoading(false);
    if (values.password !== values.passwordConfirm) {
      setErrorPasswd("Las contraseñas deben coincidir.");
      return;
    }

    try {
      setLoading(true);

      await createUserService(values);

      Swal.fire({
        title: 'Usuario creado. Se envió un código de verificación a tu email.',
        icon: "success",
        draggable: true,
      });

      navigate('/verification');
      
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: error.message,
        });
      }
    } finally {
      setLoading(false);
    }
  };
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

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                  {...register("name")}
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
                  {...register("email")}
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
                  {...register("password")}
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
                  {...register("passwordConfirm")}
                />
                {errorPasswd && <p style={{ color: "red" }}>{errorPasswd}</p>}
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

              <button
                disabled={loading}
                className={`w-full rounded-xl py-3 px-6 flex items-center justify-center gap-2 font-semibold transition-colors duration-300 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gray-600 hover:bg-gray-700 text-white"
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                  </>
                ) : (
                  "Registrarme"
                )}
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
