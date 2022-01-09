import { useState, useEffect } from 'react';
import Card from "../src/components/Card"
import './App.css';
import image1 from "./assets/pexels-pixabay-220201.jpg"
import Loading from './components/Loading';
// console.log(process.env.REACT_APP_MY_API_KEY);

function App() {
  const [gallery, setGallery] = useState(undefined)
  const [favorites, setFavorites] = useState([undefined])
  const [showGallery, setShowGallery] = useState("all")
  const favArr = () => {
    let newArr = []
    for (let i = 0; i < favorites.length; i++) {
      for (let j = 0; j < gallery.length; j++) {
        if (favorites[i] === gallery[j].id) {
          newArr.push(gallery[i])
        }
        
      }
      return newArr
      
    }
  }

  let currentPage = showGallery === "all" ? gallery : favArr()
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(10)
  const [pageNum, setPageNum] = useState(1)
  const nasaEndpoint = 'https://api.nasa.gov/planetary/apod?start_date=2021-11-25&end_date=2022-01-05&api_key=';
  // const apiKey =  "ChlAw8Gjh9CO853FohjidSgiSrKQMd1VdaRIiVkR";
  const apiKey =  process.env.REACT_APP_MY_API_KEY;
  const localStorageValue = "favPics43"

  // https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY
  

  // Handle functionality for an like and unlike action
  const handleLike = (value) => {
    const myVal = value
    if (favorites.length === 0) {
      setFavorites([myVal])
      modifyLikes(myVal,"add")
      localStorage.setItem(localStorageValue, JSON.stringify(favorites))
      
    }   else if (favorites.length > 0 && !favorites.includes(myVal)) {
      setFavorites(prevState => (
        [
          ...prevState,
          value
        ]
      ))
      localStorage.setItem(localStorageValue, JSON.stringify(favorites))
      modifyLikes(myVal,"add")
    } else if (favorites.includes(myVal)) {
      setFavorites(prevState => (
        prevState.filter(item => item !== myVal)
      ))
      localStorage.setItem(localStorageValue, JSON.stringify(favorites))
      modifyLikes(myVal,"subtract")
    }
    console.log(favorites);
    console.log(value);
  }

  // modify number of likes
  const modifyLikes = (value, operation) => {
    const newArr = gallery

    for (let index = 0; index < newArr.length; index++) {
      if (newArr[index].id === value) {
        if (operation === "add") {
          newArr[index].likes += 1
        } else {
          newArr[index].likes -= 1        
        }
      }  
    }
   setGallery(newArr)
  }

  const display = (value) => {
      setShowGallery(value)
  }

  // generate mock likes
  const randomNum = (min, max) => {
    return Math.trunc(Math.random() * (max - min) + min)
  }

  const handleNav = (value) => {
    if (value === "back") {
      setStart(prevState => prevState - 10)
      if (end === gallery.length) {
        setEnd(prevState => prevState - prevState % 10)
      } else {
        setEnd(prevState => prevState - 10)        
      }
    } else {
      setStart(prevState => prevState + 10)
      if (gallery.length - end < 10) {
        setEnd(prevState => prevState + (gallery.length - prevState))
      } else {
        setEnd(prevState => prevState + 10)   
      }
    }
  }

  useEffect(() => {
    // localStorage.setItem(localStorageValue, JSON.stringify(favorites))
    
  }, [favorites])

  // Get data from localStorage and update app favorite state
  useEffect(() => {
    let tempStore = localStorage.getItem(localStorageValue)
    if (tempStore) {
      tempStore = JSON.parse(tempStore)
    } else {
      tempStore = []
    }

    setFavorites(tempStore)

  }, [])

  // Fetch data from nasa's api and populate the app's local gallery state
  useEffect(() => {
    function fetchData (){
      try{
        fetch(nasaEndpoint+apiKey)
        .then(response=>response.json())
        .then(json=>{
          console.log(json)
          const newArr = json.map(item => ({
              id: item.title,
              title: item.title,
              date: item.date,
              img: item.url,
              description: item.description,
              likes: randomNum(100, 400)
          }))
          setGallery(newArr)
        })
      }catch(error){
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="App">
     <header className="header">
       <div>
        <h2>Spacetagram</h2>
       </div>
     </header>
     <main className="main">
      <section className="intro">
        <h4>
          Welcome to <br/><span>Spacetagram</span>.
        </h4>
        <p>Get a view of what outer space has to offer.</p>
      </section>
      <section className="gallery">
        <div className="gallery_subheading">
          <h3>Gallery</h3>
        </div>
        {
          gallery !== undefined? (
            <div>
              <ul>
                {
                  gallery.slice(start,end).map(item => (
                    <li key = {item.id}>
                       <Card 
                        img={item.img}
                        title={item.title}
                        altText={item.title}
                        date={item.date}
                        likeNumber={item.likes}
                        favorite={favorites.includes(item.id) ? true : false}
                        handleLike={()=>handleLike(item.id)}
                      />
                    </li>
                  ))
                }
              </ul>
              <div className="page_nav">
                <button className={`${start === 0 ? "hide" : undefined}`} onClick={()=>handleNav("back")}>prev</button>
                <p>{`page ${pageNum}`}</p>
                <button className={`${end === gallery.length ? "hide" : undefined}`} onClick={()=>handleNav("forward")}>next</button>
              </div>
            </div>
          ) : (
            <Loading />
          )
        }
      </section>
     </main>
    </div>
  );
}

export default App;
