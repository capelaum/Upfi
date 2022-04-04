import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { Card } from 'pages';
import { useState } from 'react';
import { CardItem } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  function viewImage(url: string) {
    setSelectedImageUrl(url);
    onOpen();
  }

  return (
    <SimpleGrid columns={3} spacing={10} minChildWidth="250px">
      {cards.map((card) => (
        <CardItem key={card.id} card={card} viewImage={viewImage} />
      ))}

      <ModalViewImage
        isOpen={isOpen}
        onClose={onClose}
        imgUrl={selectedImageUrl}
      />
    </SimpleGrid>
  );
}
