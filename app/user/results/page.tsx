'use client'
import ElectionResults from "@/app/components/ElectionResults";
import MainWrapper from "@/app/components/MainWrapper";
import UserSidebar from "@/app/components/UserComponents/UserSidebar";
import withAuth from "@/app/utils/withAuth";

function ResultsPage() {
    return (
        <MainWrapper>
            <UserSidebar />

            <ElectionResults />
        </MainWrapper>
    )
}

export default withAuth(ResultsPage);
