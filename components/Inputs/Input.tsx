/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from "react";
import { MdVisibilityOff, MdVisibility } from 'react-icons/md'


interface InputProps{
  id: string;
  value: any;
  label: string;
  type?: string;
  name?: string;
  onError:boolean;
}

const Input: React.FC<InputProps> = ({id,value,label,name,type = "text",onError}) => {
  
  const [show,setShow] = useState(false);
  const [inputType,setType] = useState(type)

  useEffect(() => {
      if(show) {
          setType('text')
      }else if(type == "password"){
          setType('password')
      }

  }, [show]);
  return (
      <>
      <label htmlFor={label} className="block relative w-full">
      <input
      required={true}
      type={inputType}
      name={name}
      id={id}
      autoComplete='new-password'
      className={onError 
      ? "peer valid:pt-4 transition-all ease-linear w-full dark:bg-neutral-900/60 bg-neutral-200 my-2 py-2 px-4 max-2xl:py-1 rounded-lg dark:text-red-900 text-red-500 dark:placeholder:text-red-900 placeholder:text-red-500 outline-hidden active:border-2 active:border-blue-500 focus:border-blue-500 border-2 dark:border-red-800 border-red-500 hover:border-2 hover:border-blue-500 " 
      : "peer valid:pt-4 transition-all ease-linear w-full dark:bg-neutral-900/60 bg-neutral-200 my-2 py-2 px-4 max-2xl:py-1 rounded-lg text-neutral-400 dark:text-white outline-hidden dark:border-2 dark:border-neutral-800 dark:hover:border-neutral-600 dark:focus:border-teal-500"
      }/>
      <small className={onError 
        ? "absolute left-4 top-1/2 -translate-y-1/2 text-lg max-2xl:text-sm cursor-text pointer pointer-events-none dark:text-red-900 text-red-500 antialiased peer-valid:text-sm peer-valid:top-1/3 transition-all ease-linear" 
        : "absolute left-4 top-1/2 -translate-y-1/2 text-lg max-2xl:text-sm cursor-text pointer pointer-events-none text-neutral-700 antialiased peer-valid:text-sm peer-valid:top-1/3 transition-all ease-linear"}>{label}</small>
      {type == 'password' && value && (
          <div onClick={() => setShow(!show)} className="absolute top-0 right-3 h-full flex items-center select-none">
               {show ? <MdVisibilityOff size={20} className="cursor-pointer"/>
               : <MdVisibility size={20} className="cursor-pointer"/>}
          </div>    
      )}
      </label>
      </>
  );
};

export default Input;


