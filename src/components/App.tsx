import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";
import SearchForm from "./SearchForm";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import Sidebar from "./Sidebar";
import JobItemContent from "./JobItemContent";
import ResultsCount from "./ResultsCount";
import JobList from "./JobList";
import HeaderTop from "./HeaderTop";
import SidebarTop from "./SidebarTop";
import { Toaster } from "react-hot-toast";
import SortingControls from "./SortingControls";
import PaginationControls from "./PaginationControls";

function App() {
  // state
  // const { searchText } = useSearchTextContext();

  return (
    <>
      <Background />

      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm />
      </Header>

      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount />
            <SortingControls />
          </SidebarTop>

          <JobList />

          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />

      <Toaster position="top-center" />
    </>
  );
}

export default App;
