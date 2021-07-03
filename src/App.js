//Credits:
// Copyright file:"https://github.com/3DJakob/react-tinder-card-demo/blob/master/src/examples/Advanced.js" 
// Copyright (c) 2020 All Rights Reserved
// Author: Jakob Unnebäck
// Summary: react-tinder-card Advanced Example

import './App.css'
import React, { useState, useMemo } from 'react'
import TinderCard from 'react-tinder-card'
import { FcLike } from 'react-icons/fc'
import { AiFillDislike } from 'react-icons/ai'
import { GrRefresh } from 'react-icons/gr'

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

  const childRefs = useMemo(() => Array(db.length).fill(0).map(i => React.createRef()), [])

  const swiped = (direction, nameToDelete) => {
    const index = db.map(person => person.name).indexOf(nameToDelete)
    setLastDirection(direction)
    if (direction === 'left') db[index].liked = true
    if (direction === 'right') db[index].liked = false
    alreadyRemoved.push(nameToDelete)
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

  return (
    <div className="App">
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
        <button onClick={() => swipe('left')}><FcLike /></button>
        <button onClick={() => swipe('right')}><AiFillDislike /></button>
        <button onClick={() => refresh()}><GrRefresh /></button>
      </div>
      {lastDirection === 'left' ?<h2 key={lastDirection} className='infoText'>You  <FcLike /></h2> : (lastDirection === 'right' ? <h2 key={lastDirection} className='infoText'>You  <AiFillDislike /></h2>:<h2 className='infoText'>Swipe left =<FcLike />, right = <AiFillDislike /> , or press a button</h2>)}
    </div>
  )
}

export default App;
