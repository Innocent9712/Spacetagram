import { useState, useEffect } from 'react';
import Card from "../src/components/Card"
import './App.css';
import image1 from "./assets/pexels-pixabay-220201.jpg"
import Loading from './components/Loading';
// console.log(process.env.REACT_APP_MY_API_KEY);

function App() {
  const [gallery, setGallery] = useState(undefined)
  const [testCard, setTestCard] = useState(undefined)
  const [favorites, setFavorites] = useState([undefined])
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(10)
  const [showGallery, setShowGallery] = useState("all")
  const [pageNum, setPageNum] = useState(1)
  const [like, setLike] = useState(false)
  const nasaEndpoint = 'https://api.nasa.gov/planetary/apod?start_date=2021-12-25&end_date=2022-01-05&api_key=';
  // const apiKey =  "ChlAw8Gjh9CO853FohjidSgiSrKQMd1VdaRIiVkR";
  const apiKey =  process.env.REACT_APP_MY_API_KEY;
  const localStorageValue = "favPics43"

  // https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY
  
  const newObj = {
    id: "lorem dolor sit",
    title: "lorem dolor sit",
    date: "2021-21-13",
    img: image1

  }

  const handleLike = (value) => {
    const myVal = value
    if (favorites.length === 0) {
      setFavorites([myVal])
      localStorage.setItem(localStorageValue, JSON.stringify(favorites))
    }   else if (favorites.length > 0 && !favorites.includes(myVal)) {
      setFavorites(prevState => (
        [
          ...prevState,
          value
        ]
      ))
      localStorage.setItem(localStorageValue, JSON.stringify(favorites))
    } else if (favorites.includes(myVal)) {
      setFavorites(prevState => (
        prevState.filter(item => item !== myVal)
      ))
      localStorage.setItem(localStorageValue, JSON.stringify(favorites))
    }
    console.log(favorites);
    console.log(value);
  }

  const display = (value) => {
    setShowGallery(value)
  }

  useEffect(() => {
    // localStorage.setItem(localStorageValue, JSON.stringify(favorites))
    
  }, [favorites])

  useEffect(() => {
    let tempStore = localStorage.getItem(localStorageValue)
    if (tempStore) {
      tempStore = JSON.parse(tempStore)
    } else {
      tempStore = []
    }

    setFavorites(tempStore)
    console.log(favorites);

  }, [])

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
              description: item.description
          }))
          setGallery(newArr)
          // setTestCard(newArr[0])
        })
      }catch(error){
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const isAFavorite = (value) => {
    let check = undefined
    for (let index = 0; index < favorites.length; index++) {
      if (value === favorites[0]) {
        check = true
      } else {
        check = false
      }
      
    }

    return check;
  }
  console.log(gallery);
  console.log(testCard);

  return (
    <div className="App">
     <header className="header">
       <div>
        <h2>Spacetagram</h2>
       </div>
     </header>
     {/* <Loading /> */}
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
          <div>
            <button onClick={()=>display("all")}>all</button>
            <button onClick={()=>display("favorite")}>favorite</button>
          </div>
        </div>
        {
          gallery !== undefined? (
            <div>
              <ul>
                {
                  gallery.map(item => (
                    <li key = {item.id}>
                       <Card 
                        img={item.img}
                        title={item.title}
                        altText={item.title}
                        date={item.date}
                        likeNumber={123}
                        favorite={favorites.includes(item.id) ? true : false}
                        handleLike={()=>handleLike(item.id)}
                      />
                    </li>
                  ))
                }

                {/* <li>
                  <Card 
                  img={newObj.img}
                  title={newObj.title}
                  altText={newObj.title}
                  date={newObj.date}
                  likeNumber={123}
                  favorite={like ? true : false}
                  handleLike={handleLike}
                  />
                </li>
                <li>
                  <Card 
                  img={newObj.img}
                  title={newObj.title}
                  altText={newObj.title}
                  date={newObj.date}
                  likeNumber={123}
                  favorite={like ? true : false}
                  handleLike={handleLike}
                  />
                </li>
                <li>
                  <Card 
                  img={newObj.img}
                  title={newObj.title}
                  altText={newObj.title}
                  date={newObj.date}
                  likeNumber={123}
                  favorite={like ? true : false}
                  handleLike={handleLike}
                  />
                </li> */}
              </ul>
              <div className="page_nav">
                <button>prev</button>
                <p>{`page ${pageNum}`}</p>
                <button>next</button>
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
