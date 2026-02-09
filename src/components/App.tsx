import { useState } from "react";
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
import Sorting from "./SortingControls";
import JobList from "./JobList";
import Pagination from "./PaginationControls";
import HeaderTop from "./HeaderTop";
import SidebarTop from "./SidebarTop";
import { useDebounce, useJobItems } from "../lib/hooks";
import { Toaster } from "react-hot-toast";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { PageDirection, SortBy } from "../lib/types";

function App() {
  // state
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 250);
  const { jobItems, isLoading } = useJobItems(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");

  // derived / computed state
  const totalNumberOfResults = jobItems?.length || 0;
  const totalNumberOfPages = Math.ceil(totalNumberOfResults / RESULTS_PER_PAGE);
  const jobItemsSorted = [...(jobItems || [])]?.sort((a, b) => {
    if (sortBy === "relevant") return b.relevanceScore - a.relevanceScore;
    else return a.daysAgo - b.daysAgo;
  });
  const jobItemsSortedSliced = jobItemsSorted?.slice(
    currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE,
  );

  // event handlers / actions

  const handleChangePage = (direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => Math.min(prev + 1, totalNumberOfPages));
    } else if (direction === "previous") {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    }
  };

  const handleChangeSortBy = (newSortBy: SortBy) => {
    setSortBy(newSortBy);
  };

  return (
    <>
      <Background />

      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>

      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount totalNumberOfResults={totalNumberOfResults} />
            <Sorting sortBy={sortBy} onClick={handleChangeSortBy} />
          </SidebarTop>

          <JobList jobItems={jobItemsSortedSliced} isLoading={isLoading} />

          <Pagination
            currentPage={currentPage}
            onClick={handleChangePage}
            totalNumberOfPages={totalNumberOfPages}
          />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />

      <Toaster position="top-center" />
    </>
  );
}

export default App;
