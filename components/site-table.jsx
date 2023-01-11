import React from 'react';
import { Box, Link } from '@chakra-ui/react';
import { Table, Tr, Th, Td } from './Table';
import { format, parseISO } from 'date-fns';
import NextLink from 'next/link';

const SiteTable = ({ sites }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Feedback Link</Th>
          <Th>Date Added</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {sites.map((site) => (
          <Tr key={site.id}>
            <Td fontWeight="medium">{site.name}</Td>
            <Td>{site.link}</Td>
            <Td>
              <Link as={NextLink} href={`/p/${encodeURIComponent(site.id)}`}>
                View Feedback
              </Link>
            </Td>
            <Td>{format(parseISO(site.createdAt), 'PPpp')}</Td>
            <Td></Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SiteTable;
