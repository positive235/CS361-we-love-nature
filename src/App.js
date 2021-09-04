// Author: Hae-Ji Park (github.com/positive235)
// Date: Jul 2021
// Summary: 'We Love Nature' - Reacting(Like or Dislike) to nature images 
// by swiping left or right, or pressing a button, Seeing new set of nature images, 
// Styling nature images

//Credits:
// Copyright file:"https://github.com/3DJakob/react-tinder-card-demo/blob/master/src/examples/Advanced.js" 
// Copyright (c) 2020 All Rights Reserved
// Author: Jakob Unnebäck
// Summary: react-tinder-card Advanced Example

import './App.css'
import React, { useState, useMemo } from 'react'
import TinderCard from 'react-tinder-card'

import { Popup, Header, Icon, Modal, Button, Loader } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import HowToUseModal from './components/HowToUseModal'

import { FcLike } from 'react-icons/fc'
import { AiFillDislike } from 'react-icons/ai'
import { GrRefresh } from 'react-icons/gr'

// Default images
import waterfall from './img/waterfall.jpeg'
import sea from './img/sea.jpeg'
import trees from './img/trees.jpeg'
import flower from './img/flower.jpeg'
import flowers from './img/flowers.jpeg'
import palmTrees from './img/palm-trees.jpeg'
import purpleFlowers from './img/purple-flowers.jpeg'
import sunset from './img/red-sky.jpeg'


const DEFAULT_IMAGES = [
  {
    name: 'Sea',
    url: sea,
    liked: false
  },
  {
    name: 'Trees',
    url: trees,
    liked: false
  },
  {
    name: 'Flower',
    url: flower,
    liked: false
  },
  {
    name: 'Flowers',
    url: flowers,
    liked: false
  },
  {
    name: 'Palm Trees',
    url: palmTrees,
    liked: false
  },
  {
    name: 'Purple Flowers',
    url: purpleFlowers,
    liked: false
  },
  {
    name: 'Sunset',
    url: sunset,
    liked: false
  },
  {
    name: 'Waterfall',
    url: waterfall,
    liked: false
  }
]

if (localStorage.getItem("photos")) {
  var db = JSON.parse(localStorage.getItem("photos"))
} else {
  // default nature images (not from nature image web scraping)
  db = DEFAULT_IMAGES
}

var alreadyRemoved = []
let charactersState = db

function App () {
  const [characters, setCharacters] = useState(db)
  const [lastDirection, setLastDirection] = useState()
  const [styleChange, setStyleChange] = useState(false)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  
  
  async function natureImageScraper() {
    const response = await fetch("https://nature-image-web-scraper.wl.r.appspot.com/a-set-of-nature-images", {}) 
    if (!response.ok) {
      throw Error(response.statusText)
    }
    return response.text()
  }
  
  if (localStorage.getItem("photos")) {
    db = JSON.parse(localStorage.getItem("photos"))
  } else {
    // default nature images (not from nature image web scraping)
    db = DEFAULT_IMAGES
    localStorage.setItem("photos", JSON.stringify(db))
  }

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
      description: 
      'If you do NOT like this image, press this button! Then the image will be swiped to the right',
    },
    {
      name: 'Change Style',
      description: 
      'If you want to change the style of image(**only the images which have URL**), press this button!',
    },
    {
      name: 'Refresh',
      description: 
      'New set of nature images will be shown! But you need to wait for seconds..!', 
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
      // Find the card object to be removed
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name
      // Find the index of which to make the reference to 
      const index = db.map(person => person.name).indexOf(toBeRemoved)
      // Make sure the next card gets removed next time if this card do not have time to exit the screen
      alreadyRemoved.push(toBeRemoved) 
      if (childRefs[index] === undefined) {
        alert("Sorry! the window will be refreshed!")
        window.location.reload()
      }
      childRefs[index].current.swipe(dir) // Swipe the card
    }
  }

  const imageStyleChange = () => {
    setStyleChange(true)
  }

  async function refresh() {
    (async() => {
      setLoading(true)
      var result = await natureImageScraper()
      db = [];
      result = JSON.parse(result)
      result.forEach(function(item) {
        if (item !== null) {
          db.push({
            name: item,
            url: item,
            liked: false
          })
        }
      })
      localStorage.setItem("photos", JSON.stringify(db))
      setLoading(false)
      window.location.reload()
    })()

    //close the modal
    setOpen(false)
  }

  return (
    <div className="App">
      <HowToUseModal />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&display=swap" rel="stylesheet" />
      <h1>We <FcLike/> Nature</h1>
      {loading ? (<Loader active size='massive' inline='centered'>Preparing New Images</Loader>)
      :
      <div className='cardContainer'>
        {characters.map((character, index) =>
          <TinderCard 
            ref={childRefs[index]} 
            className='swipe' 
            key={character.name} 
            onSwipe={(dir) => swiped(dir, character.name)} 
            onCardLeftScreen={() => outOfFrame(character.name)}>
            {character.url.startsWith('https://') && styleChange ? 
            <div style={{ backgroundImage: 'url(' + character.url 
              + '?brightness=-5&contrast=42&exposure=98&shadows=28&highlights=73&hue=36&saturation=-8&lightness=51)'}} 
              className='card'>
              <span>{character.name}</span></div> 
              : <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
              <span>{character.name}</span></div>}
          </TinderCard>
        )}
      </div>}
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
        <Modal
          basic
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          size='small'
          trigger={<button className="refreshButton"><GrRefresh /></button>}
        >
        <Header icon>
          <Icon name='question' />
            Are you sure?
        </Header>
        <Modal.Content>
          <p>
            By pressing 'Refresh' button, you will see NEW set of nature images.
            But you need to wait for seconds.
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' inverted onClick={() => setOpen(false)}>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' inverted onClick={() => refresh()}>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
        </Modal>
        
      </div>
      {lastDirection === 'left' ?
      <h2 
        key={lastDirection} 
        className='infoText'>You  <FcLike /></h2> 
        : (lastDirection === 'right' ? 
        <h2 key={lastDirection} className='infoText'>You  <AiFillDislike /></h2>
          : <h2 className='infoText'>Swipe left =<FcLike />, right = <AiFillDislike /> , or press a button</h2>)}
    </div>
  )
}

export default App;