import { createContext, ReactNode, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
};

export const BookmarksContext = createContext(null);

function BookmarksContextProvider({ children }: Props) {
  const bookmarkedIdsFromLocalStorage = JSON.parse(
    localStorage.getItem("bookmarkedIds") || "[]",
  );
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(
    bookmarkedIdsFromLocalStorage,
  );

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
    }
  };

  useEffect(() => {
    localStorage.setItem("bookmarkedIds", JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  return (
    <BookmarksContext.Provider value={{ bookmarkedIds, handleToggleBookmark }}>
      {children}
    </BookmarksContext.Provider>
  );
}

export default BookmarksContextProvider;
