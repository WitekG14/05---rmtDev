import JobListItem from "./JobListItem";

type JobItem = {
  id: number;
  badgeLetters: string;
  title: string;
  company: string;
  date: string;
  relevanceScore: number;
  daysAgo: number;
};

type Props = {
  jobItems: JobItem[];
};

export function JobList({ jobItems }: Props) {
  return (
    <ul className="job-list">
      {jobItems.map((jobItem) => (
        <JobListItem jobItem={jobItem} />
      ))}
    </ul>
  );
}

export default JobList;
