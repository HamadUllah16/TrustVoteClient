import React from 'react'
import RenderPendingCandidates from '@/app/components/Candidate/RenderPendingCandidates';
import MainWrapper from '@/app/components/MainWrapper';
import AdminSidebar from '@/app/components/AdminComponents/AdminSidebar';
import RenderTableHead from '@/app/components/RenderTableHead';
function PendingCandidatesPage() {
  return (
    <MainWrapper>

      <AdminSidebar />

      <RenderTableHead
        title='Pending Candidates'
        subtitle={'Review the details of pending candidates and perform actions.'}
        labels={['#', 'Name', 'Party Affiliation', 'Constituency Type', 'Status', 'Gender', 'DOB', 'Actions']}
        action={null}
      >
        <RenderPendingCandidates />

      </RenderTableHead>

    </MainWrapper>
  )
}

export default PendingCandidatesPage