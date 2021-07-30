import React, { useState } from 'react'
import { Header, Icon, Modal, Button } from 'semantic-ui-react'
import { GrRefresh } from 'react-icons/gr'

function RefreshButton() {

    const [open, setOpen] = useState(false)

    const refresh = () => {
        setOpen(false)
        window.location.reload()
    }

    return (
        <Modal
          basic
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          size='small'
          trigger={<button><GrRefresh /></button>}
        >
        <Header icon>
          <Icon name='question' />
            Are you sure?
        </Header>
        <Modal.Content>
          <p>
            By pressing 'Refresh' button, you will see NEW set of nature images.
            If you are not seeing new set of nature images, please try again...!
            Sometimes, it could be caused by network connection issue. Sorry for that.
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
    )
}

export default RefreshButton