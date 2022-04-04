import {
  Box,
  Heading,
  Icon,
  Image,
  Skeleton,
  SkeletonText,
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { Card } from 'pages';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useMutation, useQueryClient } from 'react-query';
import { api } from 'services/api';
import { ModalDeleteImage } from './Modal/DeleteImage';

interface CardProps {
  card: Card;
  viewImage: (url: string) => void;
}

export function CardItem({ card, viewImage }: CardProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      const response = await api.delete('/images', {
        params: {
          id: card.id
        }
      });

      return response.data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries('images')
    }
  );

  async function deleteImage() {
    try {
      await mutation.mutateAsync();

      toast({
        title: 'Imagem deletada',
        description: 'Sua imagem foi deletada com sucesso.',
        status: 'success'
      });
    } catch (error) {
      toast({
        title: 'Falha ao deletar imagem',
        description: 'Ocorreu um erro ao tentar deletar a sua imagem.',
        status: 'error'
      });
    }
  }

  return (
    <Box key={card.ts} borderRadius="md" bgColor="pGray.800">
      <Skeleton
        isLoaded={!isLoading}
        startColor="pGray.800"
        endColor="pGray.900"
      >
        <Image
          src={card.url}
          alt={card.title}
          objectFit="cover"
          w="full"
          h={48}
          borderTopRadius="md"
          onClick={() => viewImage(card.url)}
          onLoad={() => setIsLoading(false)}
          cursor="pointer"
        />
      </Skeleton>

      <Box pt={5} pb={4} px={4} position="relative">
        {isLoading ? (
          <>
            <SkeletonText
              fontSize="2xl"
              mt={2}
              mr={6}
              noOfLines={1}
              startColor="pGray.800"
              endColor="pGray.900"
            />
            <SkeletonText
              fontSize="md"
              mt={7}
              mr={6}
              noOfLines={1}
              startColor="pGray.800"
              endColor="pGray.900"
            />
          </>
        ) : (
          <>
            <Heading color="orange.500" fontSize="2xl">
              {card.title}
            </Heading>
            <Text mt={2} fontSize="sm">
              {card.description}
            </Text>
          </>
        )}

        <Icon
          as={FaTrash}
          color="orange.600"
          position="absolute"
          right={4}
          bottom={4}
          _hover={{ cursor: 'pointer', color: 'orange.700' }}
          onClick={onOpen}
        />
      </Box>

      <ModalDeleteImage
        isOpen={isOpen}
        onClose={onClose}
        deleteImage={deleteImage}
      />
    </Box>
  );
}
