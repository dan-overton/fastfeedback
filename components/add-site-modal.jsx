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
  useDisclosure
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import { createSite } from '@/lib/db';

function AddSiteModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm();

  const initialRef = useRef(null);

  const onSubmit = (values) => {
    createSite(values);
  };

  const { ref, ...rest } = register('site');

  return (
    <>
      <Button
        onClick={onOpen}
        fontWeight="medium"
        variant="solid"
        size="md"
        maxWidth="200px"
      >
        Add Your First Site
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
                name="site"
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
