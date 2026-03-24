import axios from 'axios'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const Makepayment = () => {
    const { product } = useLocation().state || {}
    const img_url = "http://peninahtruham.alwaysdata.net/static/images/"
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    // function for makepayment
    const submit = async (e) => {
        // preventing the default loading behaviour of a form
        e.preventDefault()
        // set message
        setMessage("Please wait as we process... ")
        // connecting axios to flask api end point
        try {
            // attaching user inputs to data variable
            const data = new FormData()
            data.append("phone", phone)
            data.append("amount", product.producct_cost)
            // posting the data to the database
            const response = await axios.post("http://peninahtruham.alwaysdata.net/api/mpesa_payment", data)
            // update the message
            setMessage("Please complete the payment in your phone")
        } catch (error) {
            setMessage("")
            setError(error.message)
            console.log(error)
        }
    }

    return (
        <div className='row  mt-4  justify-content-center'>
            <div className='card shadow col-md-6 p-4' >
                <h1>Makepayment - Lipa na Mpesa</h1>
                <img src={img_url + product.product_photo} alt="" />
                <p>The product name is: {product.product_name}</p>
                <p>The product description is: {product.product_description}</p>
                <p>The product cost is: {product.producct_cost}</p>
                <form onSubmit={submit}>
                    {error}
                    {message}
                    <input type="tel" placeholder='Enter phone 254XXX' className='form-control' value={phone} onChange={(e) => setPhone(e.target.value)} /><br />
                    <button type='submit' className='btn btn-info  w-100'>Make Payment</button>
                </form>
            </div>
        </div>
    )
}

export default Makepayment