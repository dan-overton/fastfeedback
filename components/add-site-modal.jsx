import { useRef } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  FormLabel,
  Input,
  ModalFooter,
  FormControl,
  ModalBody,
  ModalContent,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { mutate } from 'swr';
import { useForm } from 'react-hook-form';
import { createSite } from '@/lib/db';
import { useAuth } from '@/lib/auth';

function AddSiteModal({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const auth = useAuth();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit
  } = useForm();

  const initialRef = useRef(null);

  const onSubmit = async ({ name, link }) => {
    const newSite = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      link
    };
    const { id } = await createSite(newSite);

    toast({
      title: 'Succcess!',
      description: `We've added your site`,
      status: 'success',
      duration: 5000,
      isClosable: true
    });
    mutate('/api/sites', (data) => ({
      sites: [{ id, ...newSite }, ...data.sites]
    }));
    onClose();
  };

  const { ref, ...rest } = register('name');

  return (
    <>
      <Button
        onClick={() => {
          reset();
          onOpen();
        }}
        id="add-site-modal-button"
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)'
        }}
      >
        {children}
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                {...rest}
                name="name"
                ref={(e) => {
                  ref(e), (initialRef.current = e);
                }}
                placeholder="My site"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input {...register('link')} placeholder="https://website.com" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button backgroundColor="#99FFFE" color="#194D4C" type="submit">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddSiteModal;
