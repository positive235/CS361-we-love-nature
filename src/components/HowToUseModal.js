// Author: Hae-Ji Park (github.com/positive235)
// Date: Jul 2021 
// Summary: How to use modal component

import React, { useState } from 'react'
import { Header, Icon, Modal, List } from 'semantic-ui-react'
import { FcLike } from 'react-icons/fc'
import { AiFillDislike } from 'react-icons/ai'
import { GrRefresh } from 'react-icons/gr'

function HowToUseModal() {

    const [open, setOpen] = useState(false)

    return (
        <Modal
        closeIcon
        open={open}
        trigger={<button className='how-to-use'><Icon name='book' /> How To Use</button>}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        >
        <Header icon='book' content='How To Use' />
      <Modal.Content>
      
      <List>
        <List.Item>
          <List.Header>Swipe Left</List.Header>If you LIKE the image, swipe it to the left.
        </List.Item>
        <List.Item>
          <List.Header>Swipe Right</List.Header>If you DISLIKE the image, swipe it to the right.
        </List.Item>
        <List.Item>
          <List.Header><FcLike /> LIKE button</List.Header>If you LIKE the image, press this button!
        </List.Item>
        <List.Item>
          <List.Header><AiFillDislike /> DISLIKE button</List.Header>If you DISLIKE the image, press this button!
        </List.Item>
        <List.Item>
          <List.Header>STYLE Button</List.Header>
          Change the style of the image by pressing this button! 
          If you click again, you can see the original one!
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
            <List.Header>Swipe images</List.Header>If you like an image, swipe the image to the LEFT.
            If you do NOT like an image, swipe the image to the RIGHT
          </List.Item>
          <List.Item>
            <List.Header><FcLike /> LIKE button</List.Header>
            If you like an image, press this 'Like' button. Then the image will be swiped to the left.
          </List.Item>
          <List.Item>
            <List.Header><AiFillDislike /> DISLIKE button</List.Header>
            If you do NOT like an image, press this 'Dislike' button. 
            Then the image will be swiped to the right.
          </List.Item>
          <List.Item>
            <List.Header>STYLE Button</List.Header>
            Change the style of the image by pressing this button! 
            If you click again, you can see the original one!
          </List.Item>
          <List.Item>
            <List.Header><GrRefresh /> REFRESH button</List.Header>
            New set of nature images will be shown! 
            But you need to wait for seconds to see the new images.
          </List.Item>
        </List>
      </Modal.Content>
      </Modal>

    )
}

export default HowToUseModal