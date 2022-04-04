import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text
} from '@chakra-ui/react';

interface ModalDeleteImageProps {
  isOpen: boolean;
  onClose: () => void;
  deleteImage: () => void;
}

export function ModalDeleteImage({
  isOpen,
  onClose,
  deleteImage
}: ModalDeleteImageProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
        bg="blackAlpha.700"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent bg="pGray.900" p={[4, 8]} mx={5} my="auto">
        <ModalBody p="0">
          <Text fontSize={['md', 'lg']}>
            Tem certeza de que quer excluir essa imagem?
          </Text>
        </ModalBody>
        <ModalFooter p={0} mt={10} display="flex" justifyContent="end">
          <Button mr={5} colorScheme="green" size="md" onClick={deleteImage}>
            Confirmar
          </Button>
          <Button colorScheme="red" size="md" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
