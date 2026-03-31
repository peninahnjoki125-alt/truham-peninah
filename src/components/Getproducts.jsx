import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import slide1 from "../images/Baby Girl Clothes Long Sleeve.jpeg"
import slide2 from "../images/Mens brown double breasted suit _ Custom tailored pinstripe outfit.jpeg"
import slide3 from "../images/Step into Spring 17 Floral Maxidresses Youll Adore.jpeg"


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
      
              <section className ="row">
                <div className="col-md-12">
                  <div className="carousel slide" data-bs-ride="carousel" id="mycarousel">
                    {/* <!--container for the first part--> */}
                    <div className="carousel-inner ">
                      {/* <!--first image--> */}
                      <div className="carousel-item active">
                        <img src={slide1} alt="slide4" width = "100%" height="800px" />
                      </div>
                      {/* <!--second image--> */}
                      <div className="carousel-item">
                        <img src={slide2} alt="slide2" width = "100%" height="800px" />
                      </div>
                      {/* <!--third image--> */}
                      <div className="carousel-item">
                        <img src={slide3} alt="slide3" width = "100%" height="800px" />
                      </div>
                    </div>
                    {/* <!--conatiner for second part--> */}
                    <a href="#mycarousel" data-bs-slide="prev" className="carousel-control-prev">
                      <span className="carousel-control-prev-icon bg-danger"></span>
                    </a>
                    {/* <!--conatiner for the third part--> */}
                    <a href="#mycarousel" data-bs-slide="next" className="carousel-control-next ">
                      <span className="carousel-control-next-icon bg-danger"></span>
                    </a>
                  
                  </div>
                </div>
              </section>
              <hr />
              
     
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