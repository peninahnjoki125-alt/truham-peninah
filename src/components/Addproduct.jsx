import axios from 'axios'
import React, { useState } from 'react'

const Addproduct = () => {
  const [productname, setProductname] = useState ("")
  const [description, setDescription] = useState ("")
  const [cost, setCost] = useState ("")
  const [productphoto, setProductphoto] = useState ("")

  // setting states for loading
  const [loading, setLoading] = useState ("")
  const [error, setError] = useState ("")
  const [succes, setSuccess] = useState ("")
  
  // function to post user input
  const submit = async (e) => {
    e.preventDefault ()
    setLoading ("Kindly wait!")
    try {
      const data = new FormData ()
      data.append("product_name", productname)
      data.append("product_description", description)
      data.append("producct_cost", cost)
      data.append("product_photo", productphoto)


      // using axios
      const response = await axios.post ("http://peninahtruham.alwaysdata.net//api/add_product",data)
      setLoading ("")
      setSuccess (response.data.Message)

      setProductname ("")
      setDescription ("")
      setCost("")
      setProductphoto("")
    } catch (error) {
      setLoading ("")
      setError (error.message)
      
    }
   
  }

  return (
    <div>
        <div className='row mt-4 justify-content-center'>
          <h2>Add Product</h2>
            <form action="" onSubmit={submit} className='col-md-6 p-4 card shadow'>
              {loading}
              {succes}
              {error}
              <label htmlFor="" className='text-start' >Product Name</label><br />
              
              <input type="text" className='form-control ' value={productname} onChange={(e) => setProductname(e.target.value)} required/><br />
              
              <label htmlFor="" className='text-start'> Description</label><br />

              <textarea name="text" id=""className='form-control' value={description} onChange={(e) => setDescription (e.target.value)} required  ></textarea><br />
              
              <label htmlFor=""className='text-start'>Cost (Ksh)</label><br />

              <input type="number" className='form-control' value={cost} onChange={(e) => setCost (e.target.value)} required /><br />
             

              <label htmlFor=""className='text-start'>Product Photo</label><br />
              
              <input type="file" accept='image/*' onChange={(e) =>setProductphoto (e.target.files[0])} className='form-control' /><br />
              <button  className='btn btn-primary w-100'type='submit'> Add Product</button>
              

            </form>
          
        </div>
    </div>
  )
}

export default Addproduct