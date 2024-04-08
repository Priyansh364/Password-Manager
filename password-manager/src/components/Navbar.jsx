import React from 'react'

const Navbar = () => {
  return (
    <>
    <div className='h-10'></div>
    <nav className='bg-slate-800 fixed w-full top-0 z-10 text-white '>
        <div className=' container px-2 md:px-40 mx-auto  flex justify-between text-xl'>

        <div className='hover:cursor-pointer font-bold flex items-center '>

            <span className='text-green-500'>&lt; </span>
            Pass
            <span className='text-green-500'>Op/&gt; </span>
        </div>
        {/* <ul>
            <li className='flex gap-10 px-3'>
            <a className='hover:font-bold' href="/">Home</a>
            <a className='hover:font-bold' href="/">About</a>
            <a className='hover:font-bold' href="/">Contact</a>
            </li>
          </ul> */}
        <a className='text-white flex items-center text-lg gap-1 m-2 px-3 bg-green-700 rounded-full border border-white' href="https://github.com/Priyansh364" target='_blank'>
          <img className='w-10 invert hover:cursor-pointer' src="/icons/Githubicon.png" alt="github icon" /> Github
        </a>


      
        </div>
    </nav>
          </>
  )
}

export default Navbar
