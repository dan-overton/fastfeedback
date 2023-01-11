import React from 'react';
import {
  Flex,
  Link,
  Stack,
  Avatar,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button
} from '@chakra-ui/react';
import { LogoIcon } from '@/lib/icons';
import { useAuth } from '@/lib/auth';
import { signOut } from 'firebase/auth';

const DashboardShell = ({ children }) => {
  const { user } = useAuth();

  return (
    <Flex flexDirection="column" height="100vh">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        backgroundColor="white"
        p={4}
      >
        <Stack spacing={4} isInline>
          <LogoIcon boxSize={5} />
          <Link>Feedback</Link>
          <Link>Sites</Link>
        </Stack>
        <Flex alignItems="center">
          {user && (
            <Button variant="ghost" mr={2} onClick={() => signOut()}>
              Log Out
            </Button>
          )}
          <Avatar size="sm" src={user?.photoUrl} />
        </Flex>
      </Flex>
      <Flex backgroundColor="gray.100" p={8} flex={1}>
        <Flex
          direction="column"
          width="100%"
          maxWidth="800px"
          ml="auto"
          mr="auto"
        >
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardShell;
