import AdminSidebar from '@/app/components/AdminComponents/AdminSidebar'
import ElectionResults from '@/app/components/ElectionResults'
import MainWrapper from '@/app/components/MainWrapper'
import React from 'react'

function Results() {
    return (
        <MainWrapper>
            <AdminSidebar />
            <ElectionResults />
        </MainWrapper>
    )
}

export default Results