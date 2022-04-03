import { Box, Button } from '@chakra-ui/react';
import { CardList } from 'components/CardList';
import { Error } from 'components/Error';
import { Header } from 'components/Header';
import { Loading } from 'components/Loading';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { api } from 'services/api';

export default function Home(): JSX.Element {
  const getImages = async ({ pageParam = null }) => {
    const data = await api
      .get('/images', {
        params: {
          after: pageParam
        }
      })
      .then((response) => response.data);

    console.log(data);

    return data;
  };

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery(
    'images',

    // TODO AXIOS REQUEST WITH PARAM
    getImages,

    // TODO GET AND RETURN NEXT PAGE PARAM
    {
      getNextPageParam: (lastPage) => lastPage.after ?? null
    }
  );

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    return data?.pages.map((page) => page.data).flat();
  }, [data]);
  console.log('🚀 ~ formattedData', formattedData);

  // TODO RENDER LOADING SCREEN
  if (isLoading) return <Loading />;

  // TODO RENDER ERROR SCREEN
  if (isError) return <Error />;

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
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
