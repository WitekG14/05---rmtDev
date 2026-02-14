import { useActiveId, useJobItemsContext } from "../lib/hooks";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

export function JobList() {
  const activeId = useActiveId();
  const { jobItems, isLoading } = useJobItemsContext();

  return (
    <ul className="job-list">
      {isLoading ? <Spinner /> : null}
      {!isLoading
        ? jobItems?.map((jobItem) => (
            <JobListItem
              key={jobItem.id}
              jobItem={jobItem}
              isActive={jobItem.id === activeId}
            />
          ))
        : null}
    </ul>
  );
}

export default JobList;
