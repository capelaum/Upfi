import { Box, Button } from '@chakra-ui/react';
import { CardList } from 'components/CardList';
import { Error } from 'components/Error';
import { Header } from 'components/Header';
import { Loading } from 'components/Loading';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { api } from 'services/api';

interface Card {
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
    getNextPageParam: (lastPage) => lastPage.after ?? null
  });

  // TODO FORMAT AND FLAT DATA ARRAY
  const formattedData = useMemo(() => {
    return data?.pages.map((page) => page.data).flat();
  }, [data]);

  if (isLoading) return <Loading />;

  if (isError) return <Error />;

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData ?? ([] as Card[])} />
        {hasNextPage}
        {hasNextPage && (
          <Button mt="5" onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
