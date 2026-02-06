import PaginationButton from "./PaginationButton";

type Props = {
  currentPage: number;
  onClick: (direction: "next" | "previous") => void;
};

export default function Pagination({ currentPage, onClick }: Props) {
  return (
    <section className="pagination">
      {currentPage > 1 ? (
        <PaginationButton
          direction="previous"
          currentPage={currentPage}
          onClick={onClick}
        />
      ) : null}
      <PaginationButton
        direction="next"
        currentPage={currentPage}
        onClick={onClick}
      />
    </section>
  );
}
