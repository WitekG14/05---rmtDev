// import BookmarkIcon from "./BookmarkIcon";

import { useBookmarksContext } from "../lib/hooks";
import JobList from "./JobList";

export default function BookmarksPopover() {
  const { bookmarkedIds } = useBookmarksContext();

  return (
    <div className="bookmarks-popover">
      <div className="bookmarks__start-view">
        <JobList />
        {/* <p>Your Bookmarks</p>
        <p>
          Add bookmarks by clicking the bookmark icon (
          <BookmarkIcon id={1} disabled />) on the job cards.
        </p> */}
      </div>
    </div>
  );
}
