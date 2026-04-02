import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const Signin = () => {
  const [email, setEmail] = useState("")
  const [passowrd, setPassword] = useState("")
  const [loading, setloading] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  // function to submit data to the database
  const submit = async (e) => {
    // preventing the default behaviour of the form reloading
    e.preventDefault()
    // updating the loading message
    setloading("Pliz wait as we log you in")
    // updating data into the database
    try {
      // adding user inputs to data varriable
      const data = new FormData()
      data.append("email", email)
      data.append("password", passowrd)
      // connecting and posting data to the database
      const response = await axios.post("http://peninahtruham.alwaysdata.net//api/signin", data)
      // updating the loading message to empty
      setloading("")
      // checking if a user exists
      if (response.data.user) {
        // storing the user in the browser local storage
        localStorage.setItem("user", JSON.stringify(response.data.user))
        // redirecting the logged in user to landing page
        navigate("/")
      }
      else {
        // error for log in failed
        setError(response.data.message)
      }
    } catch (error) {
      // updating loading message to empty
      setloading("")
      // update the error messsage
      setError(error.response.data.message)
    }
  }

  return (
    <div className='row mt-4 justify-content-center'>
      <div className='col-md-6 p-4 card shadow'>
        <h2>Sign In</h2>
        <form action="" onSubmit={submit} >
          {loading}
          {error}
          <input type="email"
            placeholder='Email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
          <input type="password"
            placeholder='Password' className='form-control' value={passowrd} onChange={(e) => setPassword(e.target.value)} required /><br /><br />
          <button className='btn btn-primary w-100' type='submit'>
            SignIn
          </button>
          <p>Don't have an account? <Link to="/SignUp">Sign Up</Link> </p>
        </form>
      </div>
    </div>
  )
}

export default Signin