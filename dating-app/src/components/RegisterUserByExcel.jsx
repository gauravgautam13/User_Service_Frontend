import useMultipart from '@/hooks/api/useMultipart'
import React, { useState } from 'react'

const RegisterUserByExcel = () => {
    const {uploadExcelFile} = useMultipart();
    const [file, setFile] = useState('');

  return (
    <>
    <form onSubmit={(e) => {
        e.preventDefault();
        uploadExcelFile(file)} }>
    <input type="file" placeholder='Upload Your Excel File' onChange={(e) => setFile(e.target.files[0])}  />
    <button type='submit'>Submit</button>
    </form>
    </>
    )
}

export default RegisterUserByExcel