import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarksContext } from "../lib/hooks";

type Props = {
  id: number;
};

export default function BookmarkIcon({ id }: Props) {
  const { bookmarkedIds, handleToggleBookmark } = useBookmarksContext();

  return (
    <button
      className="bookmark-btn"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handleToggleBookmark(id);
      }}
    >
      <BookmarkFilledIcon
        className={bookmarkedIds.includes(id) ? "filled" : ""}
      />
    </button>
  );
}
