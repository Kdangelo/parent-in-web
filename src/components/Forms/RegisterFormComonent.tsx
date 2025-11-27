import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import familiaS from "../../assets/familiaS.png";
import parentinlogo from "../../assets/parentinlogo.png";
import type { UserCreate } from "../../types/types";
import Swal from "sweetalert2";
import { createUserService } from "../../services/userService";

const RegisterFormComonent = () => {
  const { register, handleSubmit } = useForm<UserCreate>();
  const [loading, setLoading] = useState(false);
  const [errorPasswd, setErrorPasswd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
    <div className="relative flex min-h-screen w-full font-sans bg-[#C2D0F0] overflow-hidden">
      
      <div 
        className="absolute bottom-0 left-0 pointer-events-none z-0 transform translate-y-[30%] -translate-x-[20%]"
        style={{
            width: 'clamp(800px, 58vw, 1400px)',
            minWidth: '800px',
            transform: 'translate(41.9%, -6%) rotate(60.13deg)', 
        }}
      >
        <svg 
            viewBox="0 0 1021 719" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full overflow-visible"
        >
            <path d="M692.791 243.003C682.36 249.249 672.686 256.344 663.391 263.863C664.928 253.962 665.908 243.949 666.174 233.733C670.112 108.042 585.576 3.50854 477.41 0.085879C369.244 -3.33693 278.603 96.0012 274.666 221.692C274.353 232.711 274.933 243.62 275.848 254.307C269.032 249.563 261.969 244.886 254.483 240.587C145.456 177.982 13.4065 203.15 -40.5038 297.035C-94.414 390.92 -49.5879 517.653 59.4387 580.258C70.9809 586.885 82.9939 592.332 94.9637 597.131C84.559 601.525 74.3768 606.255 64.2147 612.033C-44.5555 675.039 -88.6955 802.115 -34.3876 895.72C19.9203 989.325 152.002 1013.95 260.862 950.784C268.947 946.095 276.408 941.047 283.647 935.665C283.011 941.106 282.376 946.548 282.208 952.258C276.508 1077.77 359.435 1183.66 467.598 1188.53C575.671 1193.56 667.849 1095.52 673.548 970.009C674.228 954.016 673.524 938.266 671.503 923.004C681.681 930.923 692.62 938.24 704.408 944.802C814.33 1005.85 946.093 978.649 998.51 884.113C1050.93 789.578 1004.29 663.466 894.371 602.421C886.728 598.033 879.039 594.447 871.171 591.173C878.875 587.509 886.602 583.444 894.196 578.887C1002.1 514.139 1044.26 386.546 988.607 293.83C932.959 201.115 800.449 178.322 692.546 243.069L692.791 243.003Z" fill="#DDE7FD" />
        </svg>
      </div>

      <div className="hidden lg:flex relative z-10 w-1/2 flex-col items-center justify-center">
        <div className="absolute top-[41px] left-[48px]">
            <Link 
                to="/" 
                className="flex items-center bg-white shadow-sm hover:scale-105 transition-transform cursor-pointer w-[185px] h-[69px] rounded-[40px]"
            >
                <div className="flex items-center justify-center border border-[#393939] w-[47px] h-[47px] ml-[13px] rounded-full bg-[#FDFD96]">
                    <ArrowLeft size={20} color="#000000" strokeWidth={2.5} />
                </div>
                <span className="ml-4 text-[#000000] font-bold text-base leading-none">Regresar</span>
            </Link>
        </div>

        <div className="flex flex-col items-center mt-10 w-full px-4">
            <div className="w-[85%] max-w-[500px] xl:max-w-[600px] 2xl:max-w-[650px] mb-4 transition-all duration-300">
                <img src={familiaS} alt="Familia" className="w-full h-full object-contain" />
            </div>
            
            <h2 className="text-center mt-4 text-[#6B7280] font-bold text-[32px] leading-none w-full max-w-[402px] 2xl:max-w-[500px]">
                Te acompañamos <br />
                antes, durante y después de la licencia parental
            </h2>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 relative z-10">
        <div className="bg-white flex flex-col items-center w-full max-w-[670px] 2xl:max-w-[850px] min-h-[900px] shadow-[0px_4px_60px_0px_#A4B5DB99] rounded-[20px] py-[49px] px-[5%] justify-center transition-all duration-300">
            
            <div className="mb-8">
                <img src={parentinlogo} alt="Parent-in Logo" className="object-contain w-[265px] h-auto" />
            </div>

            <div className="flex items-end mb-8 w-full max-w-[556px] 2xl:max-w-[700px] gap-2 md:gap-[10px] pb-[25px]">
                <Link to="/login" className="flex items-center justify-center w-1/2 h-[68px] border-b-2 border-[#D9D9D9] hover:bg-gray-50 transition cursor-pointer">
                    <span className="font-bold text-[18px] md:text-[20px] text-[#737373]">Sign In</span>
                </Link>
                <div className="flex items-center justify-center w-1/2 h-[68px] border-b-2 border-black">
                    <span className="font-bold text-[18px] md:text-[20px] text-[#393939]">Sign Up</span>
                </div>
            </div>

            <button type="button" className="flex items-center justify-center gap-4 hover:bg-gray-50 transition w-full max-w-[556px] 2xl:max-w-[700px] h-[80px] rounded-[10px] border border-[#8F9AB2] bg-white mb-0">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" alt="Google" />
                <span className="font-bold text-[16px] md:text-[20px] text-[#393939]">Sign up with Google</span>
            </button>

            <div className="flex items-center justify-center w-full max-w-[556px] 2xl:max-w-[700px] h-[64px]">
                <span className="font-medium text-[20px] text-[#737373]">Or</span>
            </div>

            <form className="w-full flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
              
              <div className="flex flex-col gap-[15px] w-full max-w-[556px] 2xl:max-w-[700px]">
                <div className="flex flex-col justify-center w-full h-[80px] rounded-[10px] bg-white px-4 md:px-[32px] transition-all duration-300 border border-[#8F9AB2] focus-within:border-[#C2D0F0] focus-within:ring-2 focus-within:ring-[#C2D0F0]">
                    <label htmlFor="email" className="font-bold text-[16px] text-[#393939] mb-[5px]">Email</label>
                    <input type="email" id="email" placeholder="example@mail.com" className="w-full outline-none text-gray-600 placeholder-gray-400 bg-transparent text-[16px]" required {...register("email")} />
                </div>

                <div className="flex flex-col justify-center w-full h-[80px] rounded-[10px] bg-white px-4 md:px-[32px] transition-all duration-300 border border-[#8F9AB2] focus-within:border-[#C2D0F0] focus-within:ring-2 focus-within:ring-[#C2D0F0] relative">
                    <label htmlFor="password" className="font-bold text-[16px] text-[#393939] mb-[5px]">Password</label>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      id="password" 
                      placeholder="your password" 
                      className="w-full outline-none text-gray-600 placeholder-gray-400 bg-transparent text-[16px] pr-10" 
                      required 
                      {...register("password")} 
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                <div className="flex flex-col justify-center w-full h-[80px] rounded-[10px] bg-white px-4 md:px-[32px] transition-all duration-300 border border-[#8F9AB2] focus-within:border-[#C2D0F0] focus-within:ring-2 focus-within:ring-[#C2D0F0]">
                    <label htmlFor="firstName" className="font-bold text-[16px] text-[#393939] mb-[5px]">First Name</label>
                    <input type="text" id="firstName" placeholder="your name" className="w-full outline-none text-gray-600 placeholder-gray-400 bg-transparent text-[16px]" required {...register("name")} />
                </div>

                <div className="flex flex-col justify-center w-full h-[80px] rounded-[10px] bg-white px-4 md:px-[32px] transition-all duration-300 border border-[#8F9AB2] focus-within:border-[#C2D0F0] focus-within:ring-2 focus-within:ring-[#C2D0F0]">
                    <label htmlFor="lastName" className="font-bold text-[16px] text-[#393939] mb-[5px]">Last Name</label>
                    <input id="lastName" type="text" placeholder="your last name" className="w-full outline-none text-gray-600 placeholder-gray-400 bg-transparent text-[16px]" required />
                </div>
              </div>

              {errorPasswd && <p className="text-red-500 text-sm mt-2 w-full max-w-[556px] 2xl:max-w-[700px]">{errorPasswd}</p>}

              <div className="flex items-center justify-center w-full max-w-[556px] 2xl:max-w-[700px] h-[64px] py-[15px] gap-[10px] mt-4">
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="terms-checkbox"
                    required
                    className="mr-3 w-5 h-5"
                  />
                  <label
                    htmlFor="terms-checkbox"
                    className="text-[14px] text-[#393939] cursor-pointer text-center leading-[100%]"
                    style={{ fontFamily: 'Glacial Indifference, sans-serif', fontWeight: 400 }}
                  >
                    By creating an account, I agree to the{" "}
                    <span style={{ fontFamily: 'Glacial Indifference, sans-serif', fontWeight: 700, textDecoration: 'underline' }}>Privacy Policy</span>{" "}
                    and the{" "}
                    <span style={{ fontFamily: 'Glacial Indifference, sans-serif', fontWeight: 700, textDecoration: 'underline' }}>Terms of Service</span>.
                  </label>
                </div>
              </div>

              <button type="submit" disabled={loading} className="flex items-center justify-center transition-all duration-200 hover:bg-[#FDFD75] hover:scale-[1.01] hover:shadow-lg w-full max-w-[556px] 2xl:max-w-[700px] h-[80px] rounded-[10px] bg-[#FDFD96] border border-[#393939] mt-4 disabled:opacity-70 disabled:cursor-not-allowed">
                {loading ? <svg className="animate-spin h-6 w-6 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg> : <span className="font-bold text-[20px] text-[#393939] uppercase">SIGN UP</span>}
              </button>

              <div className="flex items-center justify-center text-center w-full max-w-[556px] 2xl:max-w-[700px] h-[64px] mt-4">
                  <p className="text-[14px] text-[#393939] leading-[1.4]">
                    Already have an account? <br/>
                    <Link to="/login" className="underline">Sign in to your account</Link>
                  </p>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterFormComonent;
