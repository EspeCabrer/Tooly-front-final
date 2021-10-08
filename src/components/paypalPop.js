
//import { useEffect, useRef } from "react"

import { PayPalButton } from "react-paypal-button-v2"
import axios from "axios"
import { useHistory } from "react-router"
import {useEffect, useState, useContext} from "react"
import { AuthContext } from "../context/auth.context";


const API_URL = process.env.REACT_APP_API_URL

const PaypalPop = (props) =>{
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState("");
 const {price, product, endDate, startDate, excludedDays} = props
 const history = useHistory()

 let userId = user._id;

const ProductDetails ={
    product,
    endDate,
    startDate,
    excludedDays,
    userId
}



useEffect(
  () => {
    axios
    .get(`${API_URL}/user/${userId}`)
      .then((response) => {
        console.log("response: ", response);
        setUserInfo(response);
    });
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []
);

const createTransaction = ()=>{
    
axios
.post(API_URL + "/transaction", ProductDetails  )
.then(response => {
  console.log ("***************RESPONES : ", response.data)
  history.push("/")})
}
    return(
    <div>
         <PayPalButton
        options={{
          clientId: process.env.REACT_APP_PAYPAL,
          currency:"EUR"

        }}
        amount={price}
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={(details, data) => {
          createTransaction()
          
          // OPTIONAL: Call your server to save the transaction
          return (fetch(API_URL+"/tortuga", {
            method: "post",
            body: JSON.stringify({
            })
            .then (response => console.log ("RESPONSE DE FETCH Y YA ESTA: ", response))
          }));
        }}
      />
    </div>
       
           
    )
}

export default PaypalPop