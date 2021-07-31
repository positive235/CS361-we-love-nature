// Author: Hae-Ji Park (github.com/positive235)
// Date: Jul 2021
// Summary: Nature image web scraping

//Credits:
// Copyright file:"https://github.com/3DJakob/react-tinder-card-demo/blob/master/src/examples/Advanced.js" 
// Copyright (c) 2020 All Rights Reserved
// Author: Jakob Unnebäck
// Summary: react-tinder-card Advanced Example

import './App.css'
import React, { useState, useMemo } from 'react'
import TinderCard from 'react-tinder-card'
import { Popup } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import HowToUseModal from './components/HowToUseModal'
import RefreshButton from './components/RefreshButton'
import { FcLike } from 'react-icons/fc'
import { AiFillDislike } from 'react-icons/ai'

if (localStorage.getItem("photos")) {
  var db = JSON.parse(localStorage.getItem("photos"))
} else {
  // default nature images (not from nature image web scraping)
  db = [
    {
      name: 'Sea',
      url: './img/sea.jpeg',
      liked: false
    },
    {
      name: 'Trees',
      url: './img/trees.jpeg',
      liked: false
    },
    {
      name: 'Flower',
      url: './img/flower.jpeg',
      liked: false
    },
    {
      name: 'Flowers',
      url: './img/flowers.jpeg',
      liked: false
    },
    {
      name: 'Palm Trees',
      url: './img/palm-trees.jpeg',
      liked: false
    },
    {
      name: 'Purple Flowers',
      url: './img/purple-flowers.jpeg',
      liked: false
    },
    {
      name: 'Sunset',
      url: './img/red-sky.jpeg',
      liked: false
    },
    {
      name: 'Waterfall',
      url: './img/waterfall.jpeg',
      liked: false
    }
  ]
}


var alreadyRemoved = []
let charactersState = db

function App () {
  const [characters, setCharacters] = useState(db)
  const [lastDirection, setLastDirection] = useState()
  const [styleChange, setStyleChange] = useState(false)

  async function natureImageScraper() {
    const response = await fetch("https://nature-image-web-scraper.wl.r.appspot.com/a-set-of-nature-images", {}) // type: Promise<Response>
    if (!response.ok) {
      throw Error(response.statusText)
    }
    return response.text()
  }
  
  (async() => {
    var result = await natureImageScraper()
    db = [];
    result = JSON.parse(result)
    result.forEach(function(item) {
      db.push({
        name: item,
        url: item,
        liked: false
      })
    })
    localStorage.setItem("photos", JSON.stringify(db))
  })()
  
  db = JSON.parse(localStorage.getItem("photos"))

  const childRefs = useMemo(() => Array(db.length).fill(0).map(i => React.createRef()), [])

  const buttonDescription = [
    {
      name: 'Back',
      description: 'If you want to see the former nature image, press this button!',
    },
    {
      name: 'Like',
      description: 'If you like this image, press this button! Then the image will be swiped to the left',
    },
    {
      name: 'Dislike',
      description: 'If you do NOT like this image, press this button! Then the image will be swiped to the right',
    },
    {
      name: 'Change Style',
      description: 'If you want to change the style of image, press this button!',
    },
    {
      name: 'Refresh',
      description: 'New set of nature images will be shown! But...sometimes it shows the same images, please wait and try again...!', 
    }
  ]

  const swiped = (direction, nameToDelete) => {
    const index = db.map(person => person.name).indexOf(nameToDelete)
    setLastDirection(direction)
    if (direction === 'left') db[index].liked = true
    if (direction === 'right') db[index].liked = false
  }

  const outOfFrame = (name) => {
    charactersState = charactersState.filter(character => character.name !== name)
    setCharacters(charactersState)
  }

  const swipe = (dir) => {
    setStyleChange(false)
    const cardsLeft = characters.filter(person => !alreadyRemoved.includes(person.name))
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
      const index = db.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
      if (childRefs[index] === undefined) {
        alert("Sorry! Your new set of images has been loaded now.")
        window.location.reload()
      }
      childRefs[index].current.swipe(dir) // Swipe the card
      // if (dir === 'left') db[index].liked = true
      // if (dir === 'right') db[index].liked = false
    }
  }

  const imageStyleChange = () => {
    setStyleChange(true)
  }

  return (
    <div className="App">
      <HowToUseModal />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&display=swap" rel="stylesheet" />
      {/* Wesley(One of my teammates)'s microservice(CS361 requirement): https://github.com/WesDH/ImageMicroservice_v2 */}
      <script src="https://weshavens.info/CS361_image/wesMS_helper.js"></script>
      <h1>We <FcLike/> Nature</h1>

      <div className='cardContainer'>
        {characters.map((character, index) =>
          <TinderCard ref={childRefs[index]} className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
            { character.url.startsWith('https://') && styleChange ? 
            <div service="wesMS" style={{ backgroundImage: 'url(' + character.url +'?brightness=-5&contrast=42&exposure=98&shadows=28&highlights=73&hue=36&saturation=-8&lightness=51)' }} className='card'>
              <span>{character.name}</span>
            </div> 
              : <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
              <span>{character.name}</span>
            </div>} 
          </TinderCard>
        )}
      </div>
      <div className='buttons'>
        <Popup
          key={buttonDescription[1].name}
          header={buttonDescription[1].name}
          trigger={<button onClick={() => swipe('left')}><FcLike /></button>}
          content={buttonDescription[1].description}
          position='bottom left'
        />
        <Popup
          key={buttonDescription[2].name}
          header={buttonDescription[2].name}
          trigger={<button onClick={() => swipe('right')}><AiFillDislike /></button>}
          content={buttonDescription[2].description}
          position='bottom center'
        />
        <Popup
          key={buttonDescription[3].name}
          header={buttonDescription[3].name}
          trigger={<button onClick={() => imageStyleChange()}>Style</button>}
          content={buttonDescription[3].description}
          position='bottom center'
        />
        <RefreshButton />
        
      </div>
      {lastDirection === 'left' ?<h2 key={lastDirection} className='infoText'>You  <FcLike /></h2> : (lastDirection === 'right' ? <h2 key={lastDirection} className='infoText'>You  <AiFillDislike /></h2>:<h2 className='infoText'>Swipe left =<FcLike />, right = <AiFillDislike /> , or press a button</h2>)}
    </div>
  )
}

export default App;
