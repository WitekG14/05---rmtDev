import BookmarkIcon from "./BookmarkIcon";

import { useBookmarksContext } from "../lib/hooks";
import JobList from "./JobList";

export default function BookmarksPopover() {
  const { bookmarkedJobItems, isLoading } = useBookmarksContext();

  return (
    <div className="bookmarks-popover">
      <JobList jobItems={bookmarkedJobItems} isLoading={isLoading} />
      {!bookmarkedJobItems && !isLoading ? (
        <div className="bookmarks__start-view">
          <p>Your Bookmarks</p>
          <p>
            Add bookmarks by clicking the bookmark icon (
            <BookmarkIcon id={1} disabled />) on the job cards.
          </p>
        </div>
      ) : null}
    </div>
  );
}
