import React, { useState } from 'react'
import { Header, Icon, Modal, List } from 'semantic-ui-react'
import { FcLike } from 'react-icons/fc'
import { AiFillDislike } from 'react-icons/ai'
import { GrRefresh } from 'react-icons/gr'
//import { BiArrowBack } from 'react-icons/bi'

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
        {/* <List.Item>
          <List.Header><BiArrowBack /> BACK button</List.Header>Former image
        </List.Item> */}
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
          {/* <List.Item>
            <List.Header><BiArrowBack /> BACK button</List.Header>
            If you want to see the former nature image, press this 'Back' button.
          </List.Item> */}
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
            New set of nature images will be shown! If you are not seeing new set of nature images, please try again...!
            Sometimes, it could be caused by network connection issue. Sorry for that.
          </List.Item>
        </List>
      </Modal.Content>
      </Modal>

    )
}

export default HowToUseModal