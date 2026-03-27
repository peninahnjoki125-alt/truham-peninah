import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Getproducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")
  const img_url = "http://peninahtruham.alwaysdata.net//static/images/"
  const navigate = useNavigate()


  // function to fetch products from the database
  const getProducts = async () => {
    // updating the loading message
    setLoading("Pliz wait, we are retrieving the products...")
    // connecting axios to flask api to fetch data from the database
    try {
      const response = await axios.get("http://peninahtruham.alwaysdata.net//api/get_product_details")

      setLoading("")
      setProducts(response.data)


    } catch (error) {
      setLoading("")
      setError(error.message)
    }
  }
  useEffect(() => {
    getProducts()
  }, [])
  return (
    <div className='row'>
      <h2>Available Products</h2>
      {loading}
      {error}


      {/* mapping the card to all the products */}

      <section class="row">
        <div class="col-md-12">
          <div class="carousel slide" data-bs-ride="carousel" id="mycarousel">
            <img src="" alt="" sizes="" srcset="" />
            <div class="carousel-inner ">

              <div class="carousel-item active">
                {/* <img src="images/slide4.jpg" alt="slide4" class="w-100 d-block"> */}

              </div>

              <div class="carousel-item">
                {/* <img src="images/slide2.jpg" alt="slide2" class="w-100 d-block"> */}
              </div>

              <div class="carousel-item">
                {/* <img src="images/slide3.jpg" alt="slide3" class="w-100 d-block"> */}
                <img src="" alt="" />
              </div>
            </div>

            <a href="#mycarousel" data-bs-slide="prev" class="carousel-control-prev">
              <span class="carousel-control-prev-icon bg-danger"></span>
            </a>

            <a href="#mycarousel" data-bs-slide="next" class="carousel-control-next ">
              <span class="carousel-control-next-icon bg-danger"></span>
            </a>
          </div>
        </div>
      </section>

      {products.map((product) => (
        <div className='col-md-4 justify-content-center mb-4'>
          <div className='card shadow'>
            <img src={img_url + product.product_photo} alt="" className='product_img' />
            <div className="card-body">
              <h5>{product.product_name}</h5>
              <p>{product.product_description}</p>
              <p>{product.producct_cost}</p>
              <button className='btn btn-dark mt-2 w-100' onClick={() => navigate('/makepayment', { state: { product } })}>Buy Now</button>
              <button className='btn btn-dark mt-2 w-100' onClick={() => navigate('/addtocart', { state: { product } })}>Add to cart</button>
            </div>
          </div>
        </div>
      ))
      }

    </div>
  )
}

export default Getproducts