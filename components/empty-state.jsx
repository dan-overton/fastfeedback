import React from 'react';
import { Heading, Flex, Text, Button } from '@chakra-ui/react';
import DashboardShell from './dashboard-shell';
import AddSiteModal from './add-site-modal';

const EmptyState = () => (
  <Flex
    backgroundColor="white"
    width="100%"
    borderRadius="8px"
    p={16}
    direction="column"
    align="center"
  >
    <Heading size="lg" mb={2}>
      You haven&apos;t added any sites.
    </Heading>
    <Text mb={4}>Welcome, let&apos;s get started</Text>
    <AddSiteModal>Add Your First Site</AddSiteModal>
  </Flex>
);

export default EmptyState;
