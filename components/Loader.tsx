/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { TbLoader3 } from "react-icons/tb";
type Props = {}

const Loader = (props: Props) => {
  return (
    <div className='flex-col flex justify-center items-center w-full h-full'>
      <TbLoader3 className='animate-spin text-4xl dark:text-white text-black'/>
      <div>Loading...</div>
    </div>
  )
}

export default Loader