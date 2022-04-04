import {
  Box,
  Heading,
  Image,
  Skeleton,
  SkeletonText,
  Text
} from '@chakra-ui/react';
import { useState } from 'react';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
}

interface CardProps {
  data: Card;
  viewImage: (url: string) => void;
}

export function Card({ data, viewImage }: CardProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Box key={data.ts} borderRadius="md" bgColor="pGray.800">
      <Skeleton
        isLoaded={!isLoading}
        startColor="pGray.800"
        endColor="pGray.900"
      >
        <Image
          src={data.url}
          alt={data.title}
          objectFit="cover"
          w="max"
          h={48}
          borderTopRadius="md"
          onClick={() => viewImage(data.url)}
          onLoad={() => setIsLoading(false)}
          cursor="pointer"
        />
      </Skeleton>

      <Box pt={5} pb={4} px={4}>
        {isLoading ? (
          <>
            <SkeletonText
              fontSize="2xl"
              mt={2}
              noOfLines={1}
              startColor="pGray.800"
              endColor="pGray.900"
            />
            <SkeletonText
              fontSize="md"
              mt={7}
              noOfLines={1}
              startColor="pGray.800"
              endColor="pGray.900"
            />
          </>
        ) : (
          <>
            <Heading color="orange.500" fontSize="2xl">
              {data.title}
            </Heading>
            <Text mt={2} fontSize="sm">
              {data.description}
            </Text>
          </>
        )}
      </Box>
    </Box>
  );
}
