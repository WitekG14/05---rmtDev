import { PageDirection } from "../lib/types";
import PaginationButton from "./PaginationButton";

type Props = {
  currentPage: number;
  totalNumberOfPages: number;
  onClick: (direction: PageDirection) => void;
};

export default function Pagination({
  currentPage,
  onClick,
  totalNumberOfPages,
}: Props) {
  return (
    <section className="pagination">
      {currentPage > 1 ? (
        <PaginationButton
          direction="previous"
          currentPage={currentPage}
          onClick={onClick}
        />
      ) : null}
      {currentPage < totalNumberOfPages ? (
        <PaginationButton
          direction="next"
          currentPage={currentPage}
          onClick={onClick}
        />
      ) : null}
    </section>
  );
}
