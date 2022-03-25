import React from 'react'
import Image from "react-bootstrap/Image";

const Emptycart = () => {
    return (
        <div>
            <div className="img_container " style={{ display: "block", width: 700, padding: 30, margin: 'auto' }}>
                <h1 className="text-center text-capitalize" style={{ fontFamily: ['Oswald', 'sans-serif']}}>Opps!!! Your bag is empty....</h1>
                <hr />
                <Image
                    src="/Empty_cart.jpg"
                    rounded
                    fluid
                />
            </div>
        </div >
    )
}

export default Emptycart
