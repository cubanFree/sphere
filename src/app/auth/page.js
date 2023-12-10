'use client'

import { useState, useRef } from 'react';
import { NextUIProvider, Tabs, Tab, Card, CardBody, Divider } from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { handleSignIn, handleSignUp } from '../lib/action';
import Link from 'next/link';
import { VscArrowLeft, VscEye, VscEyeClosed } from "react-icons/vsc";
import toast, { Toaster } from 'react-hot-toast';
import BtnDesign from '../ui/general/btnDesign';

export default function Auth() {

  const supabase = createClientComponentClient();
  const [selected, setSelected] = useState('login');
  const [handlingShowPassword, setHandlingShowPassword] = useState(false);
  const formRegister = useRef();
  const route = useRouter();

  const handleSignInGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`
      }
    });
    if (error) return toast.error(error.message);
  };

  const handleSignInAction = async (formData) => {
    const error = await handleSignIn(formData);
    if (error) return toast.error(error.message);
    route.push('/home');
  };

  const handleSignUpAction = async (formData) => {
    formRegister.current.reset();
    const error = await handleSignUp(location.origin, formData);
    if (error) return toast.error(error.message);
    alert('Verifica tu correo para confirmar tu cuenta -> ' + formData.get('email'));
  };

  return (
    <main className="w-full h-screen flex flex-col justify-center items-center">
      <NextUIProvider>
        <div className="flex flex-col w-full">
          <Card className="max-w-full w-[400px] h-[455px] p-10 dark">
            <CardBody className="overflow-hidden p-0 dark">
              <Tabs
                fullWidth
                size="lg"
                aria-label="Formulario de pestañas"
                selectedKey={selected}
                onSelectionChange={setSelected}
                className='w-full flex flex-col justify-cenrter items-cente'
              >
                
                <Tab key="login" title="Sign in" className="w-full h-full flex flex-col gap-4 justify-between px-0 dark">
                  <button 
                    onClick={handleSignInGithub} 
                    type="submit" 
                    className="text-white justify-center bg-[#24292F] hover:bg-gray-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd"/>
                    </svg>
                    Continue with Github
                  </button>
                  <div className="w-full flex justify-center items-center gap-2">
                    <Divider className="w-[45%]"/>
                    <span className="flex justify-center items-center">or</span>
                    <Divider className="w-[45%]"/>
                  </div>
                  <form
                      className="w-full h-full flex flex-col justify-start gap-2 text-sm"
                      action={handleSignInAction}
                  >
                    <input
                      type="text"
                      name="email"
                      placeholder="email"
                      className="w-full border border-gray-800 rounded-lg p-4 bg-black focus:outline-none"
                      autoComplete="on"
                      required
                    />
                    <label className='w-full flex items-center bg-black border border-gray-800 rounded-lg p-4'>
                      <input
                        type={handlingShowPassword ? "text" : "password"}
                        name="password"
                        placeholder="password"
                        className="w-full bg-black focus:outline-none"
                        autoComplete="on"
                        required
                      />
                      <button
                        className='focus:outline-none'
                        onClick={(e) => {
                          e.preventDefault()
                          setHandlingShowPassword(!handlingShowPassword)
                        }}
                        >
                          {
                            handlingShowPassword ? (
                              <VscEyeClosed size={24} className='text-gray-400'/>
                            ) : (
                              <VscEye size={24} className='text-gray-400'/>
                            )
                          }
                      </button>
                    </label>
                    <BtnDesign 
                      text="Ready?"
                    />
                  </form>
                  <Link href="/" className='w-full flex justify-center items-center p-2 border border-gray-800 hover:border-gray-700 rounded-full'>
                    <VscArrowLeft size={24}/>
                  </Link>
                </Tab>

                <Tab key="sign-up" title="Register" className="w-full h-full flex flex-col gap-4 justify-between px-0 dark">
                  <form
                    ref={formRegister}
                    action={handleSignUpAction}
                    className="w-full h-full flex flex-col justify-start gap-2 text-sm"
                  >
                    <input
                      type="text"
                      name="email"
                      placeholder="email"
                      className="w-full border border-gray-800 rounded-lg p-4 bg-black focus:outline-none"
                      autoComplete="on"
                      required
                    />
                    <label className='w-full flex items-center bg-black border border-gray-800 rounded-lg p-4'>
                      <input
                        type={handlingShowPassword ? "text" : "password"}
                        name="password"
                        placeholder="password (min. 8 characters)"
                        className="w-full bg-black focus:outline-none"
                        autoComplete="off"
                        required
                      />
                      <button
                        className='focus:outline-none'
                        onClick={(e) => {
                          e.preventDefault()
                          setHandlingShowPassword(!handlingShowPassword)
                        }}
                        >
                          {
                            handlingShowPassword ? (
                              <VscEyeClosed size={24} className='text-gray-400'/>
                            ) : (
                              <VscEye size={24} className='text-gray-400'/>
                            )
                          }
                      </button>
                    </label>
                    <BtnDesign
                      text="Join to Sphere"
                    />
                  </form>
                  <Link href="/" className='w-full flex justify-center items-center p-2 border border-gray-800 hover:border-gray-700 rounded-full'>
                    <VscArrowLeft size={24}/>
                  </Link>
                </Tab>

              </Tabs>
            </CardBody>
          </Card>
        </div>
      </NextUIProvider>
      <Toaster position="bottom-right"/>
    </main>
  );
}
