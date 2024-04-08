import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import uuid from 'react-uuid';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef()

    const passwordRef = useRef()

    const [form, setform] = useState({ site: "", password: "", username: "" })

    const [passArr, setpassArr] = useState([])

    const getpasswords = async ()=>{
        let req = await fetch("http://localhost:3000/")

        let passwords= await req.json()

        setpassArr(passwords)

    }

    useEffect(() => {
        getpasswords()

        return () => {
        }
    }, [])




    const savepassword = async () => {

        if(form.site.length<3 || form.password.length<3 || form.username.length<3){
            toast('🦄 Fill more than 3 characters in fields!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        }else{

            let res= await fetch ('http://localhost:3000/' , { method: "POST", headers: { "Content-Type": "application/json"} , body: JSON.stringify({...form,id:uuid()}) } )
            
            setpassArr([...passArr, { ...form, id: uuid() }])
            // localStorage.setItem('passwords', JSON.stringify([...passArr, { ...form, id: uuid() }]))
            setform({ site: "", password: "", username: "" })
        }   
        
    }
    const deletepassword = async (id) => {
        console.log(passArr)
        console.log(passArr.filter(item => item.id !== id))
        
        await fetch ('http://localhost:3000/' , { method: "DELETE", headers: { "Content-Type": "application/json"} , body: JSON.stringify({id}) } )

        setpassArr(passArr.filter(item => item.id !== id))

        // localStorage.setItem('passwords', JSON.stringify(passArr.filter(item => item.id !== id)))

    }
    const editpassword = async(id) => {
        
        setform(passArr.filter(i => i.id === id)[0])
        
        await fetch ('http://localhost:3000/' , { method: "DELETE", headers: { "Content-Type": "application/json"} , body: JSON.stringify({id}) } )

        setpassArr(passArr.filter(item => item.id !== id))

    }

    const showpassword = () => {

        if (ref.current.src.includes("icons/eye-close.svg")) {
            passwordRef.current.type = "password"
            ref.current.src = "icons/eye-open.svg"

        }
        else {
            passwordRef.current.type = "text"
            ref.current.src = "icons/eye-close.svg"


        }
    }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copytext = (e) => {
        navigator.clipboard.writeText(e)
        toast('🦄 Copied to Clipboard!', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }


    return (



        <>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition=" Bounce"
            />
            <ToastContainer />
            <div>
                <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

            </div>
            <div className="container mx-auto bg-green-100 md:px-10 py-16 items-center flex flex-col text-center max-w-4xl">

                <h1 className='hover:cursor-pointer text-4xl text font-bold text-center'>
                    <span className='text-green-500'>&lt;</span>

                    Pass
                    <span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center '>Your own Password Manager</p>


                <div className='text-black flex w-full flex-col gap-8 p-4'>
                    <input value={form.site} onChange={handlechange} placeholder='Enter Website Url' className='rounded-full border border-green-500 w-full px-4 py-1' type="text" name='site' id='1' />
                    <div className="flex gap-8 flex-col md:flex-row justify-between">
                        <input value={form.username} onChange={handlechange} placeholder='Enter UserName' className='rounded-full border border-green-500 md:w-3/4 px-4 py-1' type="text" name='username' id='2' />
                        <div className='relative'>

                            <input value={form.password} onChange={handlechange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full px-4 pr-9 py-1' type="password" ref={passwordRef} name='password' id='3' />
                            <span onClick={showpassword} className='absolute right-2 top-1'> <img ref={ref} className='w-6 hover:cursor-pointer' src="/icons/eye-open.svg" alt="" /></span>
                        </div>
                    </div>

                </div>
                <button onClick={savepassword} className='m-2 px-4 py-1 rounded-full flex gap-2 justify-center font-medium items-center bg-green-500'>
                    <lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover"></lord-icon>
                    Add Password</button>

                <div className="items-start w-full flex text-xl font-semibold p-3  ">

                    <h2> Your Passwords</h2>
                </div>



                {passArr.length == 0 ? <div className="w-full flex justify-start p-3 text-green-900 ">

                    No  passwords to display
                </div> :




                    <div className="w-full rounded-xl relative overflow-x-auto">
                        <table className="w-full text-xs text-left text-gray-500 ">
                            <thead className="text-xs text-white uppercase  bg-green-700 ">
                                <tr>
                                    <th scope="col" className="px-6 w-1/3 py-3">
                                        Site
                                    </th>
                                    <th scope="col" className="px-6 w-2/6 py-3">
                                        Username
                                    </th>
                                    <th scope="col" className="px-6 w-1/6 py-3">
                                        Password
                                    </th>
                                    <th scope="col" className="px-6 w-1/6 py-3">
                                        Actions
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {passArr.map((item, index) => {

                                    return <tr key={index} className="bg-green-100 border-b  ">
                                        <th scope="row" className="px-6 py-4 w-1/2 font-medium text-gray-900 whitespace-nowrap ">
                                            <div className='flex justify-between'>
                                                <a className='' href={item.site} target='_blank'> {item.site}   </a>
                                                <img onClick={() => { copytext(item.site) }} className='w-5 cursor-pointer' src="/icons/Copy.gif" alt="copy" />
                                            </div>
                                        </th>
                                        <td className="px-6 w-1/6  text-gray-900 py-4">
                                            <div className='flex justify-between'>

                                                {item.username}

                                                <img onClick={() => { copytext(item.username) }} className='w-5 cursor-pointer' src="/icons/Copy.gif" alt="copy" />
                                            </div>

                                        </td>
                                        <td className="px-6 text-gray-900 w-1/6 py-4">
                                            <div className='flex justify-between'>

                                                {"*".repeat(item.password.length)}
                                                <img onClick={() => { copytext(item.password) }} className='w-5 cursor-pointer' src="/icons/Copy.gif" alt="copy" />
                                            </div>
                                        </td>
                                        <td className="px-6 text-gray-900 w-1/6 py-4">
                                            <div className='flex justify-between'>
                                                <img onClick={() => { editpassword(item.id) }} className='w-5' src="/icons/Edit.gif" alt="edit" />
                                                <img onClick={() => { deletepassword(item.id) }} className='w-5' src="/icons/Delete.gif" alt="delete" />

                                            </div>
                                        </td>
                                    </tr>
                                })}


                            </tbody>
                        </table>
                    </div>

                }
            </div>
        </>

    )
}

export default Manager
