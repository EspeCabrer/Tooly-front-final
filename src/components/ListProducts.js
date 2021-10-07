import ProductCard from './ProductCard'
    
  function ListProducts(props) {

  const {products} = props;
  console.log ("LISTPRODUCTs: ", products)  
  let productsToShow = products
  console.log ("ListProducts product array is: ", productsToShow)
  
if (products.length > 0) {

  return (
    <>
       {/* <Filter setProductsByFilter={setProducts} products={products} /> */}
       <div className="cards-container">
        {productsToShow.map((product) => (
          <>
          <ProductCard key={product._id} product={product}/>
          </>
        ))}      
      </div>
    </>
  );
} else if (products.length === 0){

  return (
    <div className="not-found">
    <img src="./no-results.png"/>
    </div>
  )

  } else { 
    
    return (
    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    )
  }
}

export default ListProducts;
