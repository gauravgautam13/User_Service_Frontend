import useUpdateUser from '@/hooks/api/useUpdateUser';
import useUserById from '@/hooks/api/useUserById';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const UpdateUserForm = () => {

    const {updateUser} = useUpdateUser();
    const {getUserById} = useUserById();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [initialUserDetails, setInitialUserDetails] = useState({});
    const router = useRouter();
    const id = router.query.id;

    console.log(initialUserDetails);


    useEffect(() => {
        getUserById({id}).then(res => setInitialUserDetails(res?.data));
    },[])

    const onSubmit = () => {
      updateUser(id,initialUserDetails).then(res => console.log(res));
    } 

    const handleChange = (e) => {
        setInitialUserDetails({...initialUserDetails,
            [e.target.id] : e.target.value
        })
    }



  return (
    <main>
        <form onSubmit={handleSubmit(onSubmit)} >

             <label htmlFor="name" className=''>Name </label>
             <input type="text" id='name' placeholder='Enter Your Name' value={initialUserDetails.name} onChange={handleChange} />

             <label htmlFor="email">Email</label>
             <input type="email" id='email' placeholder='Enter Your Email' value={initialUserDetails.email} onChange={handleChange}/>

             <label htmlFor="username">UserName </label>
             <input type="text" id='username' placeholder='Enter Your UserName' value={initialUserDetails.username} onChange={handleChange}/>
             
             <label htmlFor="gender" className='ml-4 text-base font-semibold'>
            Gender:
            <select className='mx-2 border border-indigo-500 px-2' name="gender" id="gender" value={initialUserDetails.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </label>

             <label htmlFor="date">Date Of Birth </label>
             <input type="date" id='date' placeholder='Enter Your Name' value={initialUserDetails.date} onChange={handleChange}/>
             
             <label htmlFor="mobile">Contact No.</label>
             <input type="integer" id='mobile' placeholder='Enter Your Name' value={initialUserDetails.mobile} onChange={handleChange}/>
             
             <button type='submit'>Update</button>
        </form>
    </main>
    )
}

export default UpdateUserForm