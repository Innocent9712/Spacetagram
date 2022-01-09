import React from 'react'
import like from "../assets/heart_filled.svg"
import unlike from "../assets/heart_hollow.svg"
import people from "../assets/group-people.svg"
import "../styles/Card.css"

function Card({img, title, altText, date, likeNumber, favorite, handleLike}) {
    return (
        <figure className="figure">
            <img src={img} alt={altText} className='image' />
            <figcaption>
                <h4>{title}</h4>
                <p>{date}</p>
            </figcaption>
            <div>
                <button className= { `like_button ${favorite ? "like" : undefined}`} onClick={(value)=>handleLike(value)}>
                {
                        favorite ? (
                                <img src={like} alt="like" className="heart" />

                        ) : (
                            <img src={unlike} alt="unlike" className="heart" />
                        )
                    }
                    <p>like</p>
                </button>
                <div>

                <img src={people} alt="like" className="heart"/>
                    <p>{likeNumber}</p>
                </div>
            </div>
        </figure>
    )
}

export default Card
