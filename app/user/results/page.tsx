import ElectionResults from "@/app/components/ElectionResults";
import MainWrapper from "@/app/components/MainWrapper";
import UserSidebar from "@/app/components/UserComponents/UserSidebar";

function ResultsPage() {
    return (
        <MainWrapper>
            <UserSidebar />

            <ElectionResults />
        </MainWrapper>
    )
}

export default ResultsPage;
