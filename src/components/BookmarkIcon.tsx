import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";

type Props = {
  id: number;
};

export default function BookmarkIcon({ id }: Props) {
  const { bookmarkedIds, handleToggleBookmark } = useContext(BookmarksContext)!;

  return (
    <button className="bookmark-btn" onClick={() => handleToggleBookmark(id)}>
      <BookmarkFilledIcon
        className={bookmarkedIds.includes(id) ? "filled" : ""}
      />
    </button>
  );
}
