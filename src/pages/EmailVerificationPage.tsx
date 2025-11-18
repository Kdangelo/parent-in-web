import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import type { Rta, UserVerify } from "../types/types";
import { sendUserVerificationCodeService } from "../services/userService";

const EmailVerificationPage = () => {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm<UserVerify>();

  const onSubmit = async (values: UserVerify) => {

    setLoading(false);

    try {

        setLoading(true);

        const rta: Rta = await sendUserVerificationCodeService(values);

        
    } catch (error) {
      if (error instanceof Error) {
        //console.log(error.message);
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
      <div className="w-full max-w-6xl grid lg:grid-cols-1 bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-sm space-y-8">
            <div className="text-center">
              <h1 className="text-2xl font-script mb-6">
                Verificación de Usuario
              </h1>
              <h2 className="text-xl text-gray-600">Bienvenid@ a Parent-In</h2>
            </div>

            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-500" htmlFor="email">
                  Email con el que se registró:
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
                <label className="text-sm text-gray-500" htmlFor="name">
                  Ingrese el código recibido por correo electrónico
                </label>
                <input
                  type="text"
                  id="code"
                  placeholder="Código"
                  className="w-full p-2 border rounded"
                  required
                  {...register("code")}
                />
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
                  "Enviar Código Verificación"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
