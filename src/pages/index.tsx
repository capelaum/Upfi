import { Box, Button } from '@chakra-ui/react';
import { CardList } from 'components/CardList';
import { Error } from 'components/Error';
import { Header } from 'components/Header';
import { Loading } from 'components/Loading';
import Head from 'next/head';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { api } from 'services/api';

export interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

type GetImagesResponse = {
  data: Card[];
  after: string | null;
};

export default function Home(): JSX.Element {
  const getImages = async ({
    pageParam = null
  }): Promise<GetImagesResponse> => {
    const data = await api
      .get('/images', {
        params: {
          after: pageParam
        }
      })
      .then((response) => response.data);

    return data;
  };

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery('images', getImages, {
    getNextPageParam: (lastPage) => {
      return lastPage.after ?? null;
    }
  });

  const formattedCards = useMemo(() => {
    return data?.pages.map((page) => page.data).flat();
  }, [data]);

  if (isLoading) return <Loading />;

  if (isError) return <Error />;

  return (
    <>
      <Head>
        <title>Upfi</title>
      </Head>
      <Header />

      <Box maxW={1120} px={[8, 20]} mx="auto" my={20}>
        <CardList cards={formattedCards ?? ([] as Card[])} />
        {hasNextPage && (
          <Button mt="8" onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
