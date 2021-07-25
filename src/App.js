//Credits:
// Copyright file:"https://github.com/3DJakob/react-tinder-card-demo/blob/master/src/examples/Advanced.js" 
// Copyright (c) 2020 All Rights Reserved
// Author: Jakob Unnebäck
// Summary: react-tinder-card Advanced Example

import './App.css'
import React, { useState, useMemo } from 'react'
import TinderCard from 'react-tinder-card'
import { Popup, Header, Icon, Modal, List } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { FcLike } from 'react-icons/fc'
import { AiFillDislike } from 'react-icons/ai'
import { GrRefresh } from 'react-icons/gr'
import { BiArrowBack } from 'react-icons/bi'

if (localStorage.getItem("photos")) {
  var db = JSON.parse(localStorage.getItem("photos"))
} else {
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
    }
  ]
}

var alreadyRemoved = []
let charactersState = db

function App () {
  localStorage.setItem("photos", JSON.stringify(db))
  const [characters, setCharacters] = useState(db)
  const [lastDirection, setLastDirection] = useState()
  const [open, setOpen] = useState(false)

  const buttonDescription = [
    {
      name: 'Back',
      description: 'If you want to see the former nature image, press this button!',
    },
    {
      name: 'Like',
      description: 'If you like this image, press this button! Then the image will be swiped to the left and ❤️ will be added on the bottom of the image',
    },
    {
      name: 'Dislike',
      description: 'If you do NOT like this image, press this button! Then the image will be swiped to the right',
    },
    {
      name: 'Refresh',
      description: 'New set of nature images will be shown! But...you should wait for less than a minute to see new nature images...!',      
    }
  ]
  

  const childRefs = useMemo(() => Array(db.length).fill(0).map(i => React.createRef()), [])

  const swiped = (direction, nameToDelete) => {
    const index = db.map(person => person.name).indexOf(nameToDelete)
    setLastDirection(direction)
    if (direction === 'left') db[index].liked = true
    if (direction === 'right') db[index].liked = false
    //alreadyRemoved.push(nameToDelete)
  }

  const outOfFrame = (name) => {
    charactersState = charactersState.filter(character => character.name !== name)
    setCharacters(charactersState)
  }

  const swipe = (dir) => {
   
    const cardsLeft = characters.filter(person => !alreadyRemoved.includes(person.name))
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
      const index = db.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir) // Swipe the card
      if (dir === 'left') db[index].liked = true
      if (dir === 'right') db[index].liked = false
    }
  }

  const refresh = () => {
    window.location.reload()
  }

  // const showOldImages = () => {
    
  //   const characterPlusOld = characters.concat(db.filter(data => alreadyRemoved[0] === data.name))
  //   console.log(alreadyRemoved)
  //   alreadyRemoved.pop()
  //   console.log('characters:', characters)
  //   console.log('characterPlusOld', characterPlusOld)
  //   setCharacters(characterPlusOld)
  // }

  return (
    <div className="App">
      <Modal
        closeIcon
        open={open}
        trigger={<button className='how-to-use'><Icon name='book' /> How To Use</button>}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      ><Header icon='book' content='How To Use' />
      <Modal.Content>
      
      <List>
        <List.Item>
          <List.Header>Swipe Left</List.Header>If you LIKE the image, swipe it to the left.
        </List.Item>
        <List.Item>
          <List.Header>Swipe Right</List.Header>If you DISLIKE the image, swipe it to the right.
        </List.Item>
        <List.Item>
          <List.Header><BiArrowBack /> BACK button</List.Header>Former image
        </List.Item>
        <List.Item>
          <List.Header><FcLike /> LIKE button</List.Header>If you LIKE the image, press this button!
        </List.Item>
        <List.Item>
          <List.Header><AiFillDislike /> DISLIKE button</List.Header>If you DISLIKE the image, press this button!
        </List.Item>
        <List.Item>
          <List.Header><GrRefresh /> REFRESH button</List.Header>New set of nature images
        </List.Item>
      </List>
        
      </Modal.Content>
      <Header icon='book' content='How To Use (in detail)' />
      <Modal.Content>
        <List>
          <List.Item>
            <List.Header>Swipe images</List.Header>If you like an image and swipe the image to the LEFT, <FcLike /> will be added to the image.
            If you do NOT like an image and swipe the image to the RIGHT, <FcLike /> will be removed the image or not be added to the image.
          </List.Item>
          <List.Item>
            <List.Header><BiArrowBack /> BACK button</List.Header>
            If you want to see the former nature image, press this 'Back' button.
          </List.Item>
          <List.Item>
            <List.Header><FcLike /> LIKE button</List.Header>
            If you like an image, press this 'Like' button. Then the image will be swiped to the left and <FcLike /> will be added to the image.
          </List.Item>
          <List.Item>
            <List.Header><AiFillDislike /> DISLIKE button</List.Header>
            If you do NOT like an image, press this 'Dislike' button. 
            Then the image will be swiped to the right and <FcLike /> will be removed from the image or not be added to the image
          </List.Item>
          <List.Item>
            <List.Header><GrRefresh /> REFRESH button</List.Header>
            New set of nature images will be shown! But...you might wait for less than a minute to see new nature images.
          </List.Item>
        </List>
      </Modal.Content>
      </Modal>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&display=swap" rel="stylesheet" />
      
      <h1>We <FcLike/> Nature</h1>

      <div className='cardContainer'>
        {characters.map((character, index) =>
          <TinderCard ref={childRefs[index]} className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
              <h3>{character.liked ? <FcLike />:" "} {character.name}</h3>
            </div>
          </TinderCard>
        )}
      </div>
      <div className='buttons'>
        
        <Popup
          key={buttonDescription[0].name}
          header={buttonDescription[0].name}
          trigger={<button onClick={() => showOldImages()}><BiArrowBack /></button>}
          content={buttonDescription[0].description}
          position='bottom left'
        />
        <Popup
          key={buttonDescription[1].name}
          header={buttonDescription[1].name}
          trigger={<button onClick={() => swipe('left')}><FcLike /></button>}
          content={buttonDescription[1].description}
          position='bottom center'
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
          trigger={<button onClick={() => refresh()}><GrRefresh /></button>}
          content={buttonDescription[3].description}
          position='bottom right'
        />
      </div>
      {lastDirection === 'left' ?<h2 key={lastDirection} className='infoText'>You  <FcLike /></h2> : (lastDirection === 'right' ? <h2 key={lastDirection} className='infoText'>You  <AiFillDislike /></h2>:<h2 className='infoText'>Swipe left =<FcLike />, right = <AiFillDislike /> , or press a button</h2>)}
    </div>
  )
}

export default App;
