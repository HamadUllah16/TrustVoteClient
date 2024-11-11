import React from 'react'
import RenderPendingCandidates from '@/app/components/Candidate/RenderPendingCandidates';
import MainWrapper from '@/app/components/MainWrapper';
import AdminSidebar from '@/app/components/AdminComponents/AdminSidebar';
import RenderTableHead from '@/app/components/RenderTableHead';
import PageHeader from '@/app/components/PageHeader';
import PendingCandidatesTable from '@/app/components/Candidate/PendingCandidatesTable';
function PendingCandidatesPage() {
  return (
    <MainWrapper>

      <AdminSidebar />

      <PageHeader
        title='Pending Candidates'
        subtitle={'Review the details of pending candidates and perform actions.'}
        action={null}
      >

        <PendingCandidatesTable />

      </PageHeader>

    </MainWrapper>
  )
}

export default PendingCandidatesPage