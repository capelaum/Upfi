import {
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        borderRadius="7px"
        mx={5}
        my="auto"
        w="auto"
        h="auto"
        maxW={['300px', '500px', '900px']}
        maxH={['350px', '350px', '600px']}
      >
        <ModalBody p="0">
          <Image borderTopRadius="5px" src={imgUrl} alt="image" />
        </ModalBody>
        <ModalFooter
          bg="pGray.900"
          h="2rem"
          py="20px"
          borderBottomRadius="5px"
          display="flex"
          justifyContent="start"
        >
          <Link
            href={imgUrl}
            isExternal
            fontSize="1rem"
            color="pGray.100"
            ml={-2}
            _hover={{
              color: 'orange.600'
            }}
          >
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
