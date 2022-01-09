import React, {useState} from 'react'
import close from "../assets/close.svg"
import "../styles/ImageDetails.css"

function ImageDetails({item}) {
    const [show, setShow] = useState(false)
    item && setShow(true)

    return (
        <div className={`active_img_container ${ show ? "show": "hide"}`}>
         <img src={close} alt= "close"/>
         <figure>
            <img src={item.img} alt="active" onClick={setShow(false)}/>
            <figcaption>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
            </figcaption>
         </figure>
            
        </div>
    )
}

export default ImageDetails
