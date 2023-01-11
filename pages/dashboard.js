import useSWR from 'swr';

import { useAuth } from '@/lib/auth'
import EmptyState from '@/components/empty-state'
import Head from 'next/head'
import SiteTableSkeleton from '@/components/site-table-skeleton'
import DashboardShell from '@/components/dashboard-shell'
import fetcher from '@/utils/fetcher'
import SiteTable from '@/components/site-table';
import SiteTableHeader from '@/components/site-table-header';


export default function Dashboard() {
  const auth = useAuth()
  const { data, error } = useSWR('/api/sites', fetcher);

  return <>
    <Head>
      <title>Fast Feedback</title>
    </Head>

    <DashboardShell>
      <SiteTableHeader />
      {!data && <SiteTableSkeleton />}
      {data && (data.sites.length ? <SiteTable sites={data.sites} /> : <EmptyState />)}
    </DashboardShell>
  </>
}
