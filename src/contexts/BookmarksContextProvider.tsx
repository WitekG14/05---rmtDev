import { createContext, ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
};

export const BookmarksContext = createContext(null);

function BookmarksContextProvider({ children }: Props) {
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
    }
  };
  return (
    <BookmarksContext.Provider value={{ bookmarkedIds, handleToggleBookmark }}>
      {children}
    </BookmarksContext.Provider>
  );
}

export default BookmarksContextProvider;
