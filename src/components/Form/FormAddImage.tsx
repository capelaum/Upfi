import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { FileInput } from 'components/Input/FileInput';
import { TextInput } from 'components/Input/TextInput';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { api } from 'services/api';

interface FormAddImageProps {
  closeModal: () => void;
}

interface ImageData {
  url: string;
  title: string;
  description: string;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');

  const toast = useToast();
  const queryClient = useQueryClient();

  const regexInputImageAcceptedFormats = new RegExp('^image\\/(gif|jpeg|png)$');

  const formValidations = {
    image: {
      required: 'Arquivo obrigatório',
      validate: {
        lessThan10MB: (fileList: FileList) =>
          fileList[0].size < 10 * 1024 * 1024 ||
          'O arquivo deve ser menor que 10MB',

        acceptedFormats: (fileList: FileList) =>
          regexInputImageAcceptedFormats.test(fileList[0].type) ||
          'Somente são aceitos arquivos PNG, JPEG e GIF'
      }
    },
    title: {
      required: 'Título obrigatório',
      minLength: {
        value: 2,
        message: 'Mínimo de 2 caracteres'
      },
      maxLength: {
        value: 20,
        message: 'Máximo de 20 caracteres'
      }
    },
    description: {
      required: 'Descrição obrigatória',
      maxLength: {
        value: 65,
        message: 'Máximo de 65 caracteres'
      }
    }
  };

  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm();

  const { errors, isSubmitting } = formState;

  const mutation = useMutation(
    async (data: Record<string, string>) => {
      const response = await api.post('/images', {
        url: imageUrl,
        title: data.title,
        description: data.description
      });

      return response.data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries('images')
    }
  );

  const onSubmit = async (data: Record<string, string>): Promise<void> => {
    if (!data.image) {
      toast({
        title: 'Imagem não adicionada',
        description:
          'É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro.',
        status: 'error'
      });

      return;
    }

    try {
      await mutation.mutateAsync(data);

      toast({
        title: 'Imagem cadastrada',
        description: 'Sua imagem foi cadastrada com sucesso.',
        status: 'success'
      });
    } catch {
      toast({
        title: 'Falha no cadastro',
        description: 'Ocorreu um erro ao tentar cadastrar a sua imagem.',
        status: 'warning'
      });
    } finally {
      reset(data);
      setLocalImageUrl('');
      setImageUrl('');
      closeModal();
    }
  };

  return (
    <Box as="form" w="full" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          {...register('image', formValidations.image)}
          error={errors.image}
        />

        <TextInput
          placeholder="Título da imagem..."
          error={errors.title}
          {...register('title', formValidations.title)}
        />

        <TextInput
          placeholder="Descrição da imagem..."
          error={errors.description}
          {...register('description', formValidations.description)}
        />
      </Stack>

      <Button
        my={6}
        isLoading={isSubmitting}
        isDisabled={isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
