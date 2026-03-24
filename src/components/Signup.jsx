import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
const Signup = () => {
  // adding state to all user inputs
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")

  // states for succes error and loading mesages
  const [laoding, setLoading] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")


  // function to post user inputs in the database
  const submit = async (e) => {
    // prevents the page from reloading before the data is saved in the database
    e.preventDefault()
    setLoading("Please wait as we upload your data!")

    // sending user inputs to the database
    try {
      const data = new FormData()
      // appending data to the form data varriable
      data.append("username", username)
      data.append("email", email)
      data.append("password", password)
      data.append("phone", phone)

      // using axios to post our data to the database
      const response = await axios.post("http://peninahtruham.alwaysdata.net/api/signup", data)
      // removing the loading message by setting it to empty
      setLoading("")
      // adding succes message after successful data posting in the database
      setSuccess(response.data.Success)

      // clearing the form fields making the work easier for the user
      setUsername("")
      setEmail("")
      setPassword("")
      setPhone("")
    } catch (error) {
      setLoading("")
      setError(error.message)
    }
  }
  return (
    <div className="row mt-4 justify-content-center">
      <div className="col-md-6 card shadow p-4">
        <h2>Sign Up</h2>
        <form action="" onSubmit={submit}>
          {laoding}
          {success}
          {error}
          <input type="text" placeholder="Enter Username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required /><br />

          <input type="email" placeholder="Enter Email" className="form-control" value={email} onChange={(e) =>
            setEmail(e.target.value)
          } required /><br />

          <input type="password" placeholder="Enter Password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />

          <input type="tel" placeholder="Enter Phone" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required /><br />

          <button className="btn btn-primary w-100" type="submit">
            Sign Up
          </button>

        </form>
        <p>Already have an account? <Link to="/SignIn" >Sign In</Link></p>
      </div>
    </div>
  )
}

export default Signup