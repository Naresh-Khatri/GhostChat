import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'

function ShareConfessionModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>Modal Body</p>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3}>
            Save
          </Button>
          <Button>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ShareConfessionModal
