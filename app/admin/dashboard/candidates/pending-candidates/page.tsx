import React from 'react'
import RenderPendingCandidates from '@/app/components/Candidate/RenderPendingCandidates';
import MainWrapper from '@/app/components/MainWrapper';
import AdminSidebar from '@/app/components/AdminComponents/AdminSidebar';
import RenderTableHead from '@/app/components/RenderTableHead';
import PageHeader from '@/app/components/PageHeader';
function PendingCandidatesPage() {
  return (
    <MainWrapper>

      <AdminSidebar />

      <PageHeader
        title='Pending Candidates'
        subtitle={'Review the details of pending candidates and perform actions.'}
        action={null}
      >

        <RenderTableHead
          labels={['#', 'Name', 'Party Affiliation', 'Constituency Type', 'Status', 'Gender', 'DOB', 'Actions']}
          action={null}
        >
          <RenderPendingCandidates />

        </RenderTableHead>
      </PageHeader>

    </MainWrapper>
  )
}

export default PendingCandidatesPage