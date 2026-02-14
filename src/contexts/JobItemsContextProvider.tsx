import { createContext, ReactNode, useState } from "react";
import { useSearchQuery, useSearchTextContext } from "../lib/hooks";
import { JobItem, PageDirection, SortBy } from "../lib/types";
import { RESULTS_PER_PAGE } from "../lib/constants";

type Props = {
  children: ReactNode;
};

type JobItemsContext = {
  jobItems: JobItem[];
  isLoading: boolean;
  totalNumberOfResults: number;
  totalNumberOfPages: number;
  currentPage: number;
  sortBy: SortBy;
  handleChangePage: (direction: PageDirection) => void;
  handleChangeSortBy: (newSortBy: SortBy) => void;
};

export const JobItemsContext = createContext<JobItemsContext | null>(null);

function JobItemsContextProvider({ children }: Props) {
  // dependency on other contexts
  const { searchText } = useSearchTextContext();

  // state
  const { jobItems, isLoading } = useSearchQuery(searchText);
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
    setCurrentPage(1);
    setSortBy(newSortBy);
  };
  return (
    <JobItemsContext.Provider
      value={{
        jobItems: jobItemsSortedSliced,
        isLoading,
        totalNumberOfResults,
        totalNumberOfPages,
        currentPage,
        sortBy,
        handleChangePage,
        handleChangeSortBy,
      }}
    >
      {children}
    </JobItemsContext.Provider>
  );
}

export default JobItemsContextProvider;
