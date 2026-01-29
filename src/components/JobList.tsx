import { type JobItem } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type Props = {
  jobItems: JobItem[];
  isLoading: boolean;
};

export function JobList({ jobItems, isLoading }: Props) {
  return (
    <ul className="job-list">
      {isLoading ? <Spinner /> : null}
      {!isLoading
        ? jobItems.map((jobItem) => <JobListItem jobItem={jobItem} />)
        : null}
    </ul>
  );
}

export default JobList;
