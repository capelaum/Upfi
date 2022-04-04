import { Box, Button, Flex, Image, useDisclosure } from '@chakra-ui/react';
import { ModalAddImage } from './Modal/AddImage';

export function Header(): JSX.Element {
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bgColor="pGray.800" borderBottom="1px" borderColor="orange.600">
        <Flex
          flexDirection={['column', 'row']}
          justifyContent="space-between"
          alignItems="center"
          maxW={1120}
          mx="auto"
          px={[10, 20]}
          py={6}
        >
          <Image src="logo.svg" h={10} alt="Upfi Logo" mb={[7, 0]} />
          <Button w={['100%', 'auto']} onClick={() => onOpen()}>
            Adicionar imagem
          </Button>
        </Flex>
      </Box>

      <ModalAddImage isOpen={isOpen} onClose={onClose} />
    </>
  );
}
