import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type Props = {
  currentPage: number;
  onClick: (direction: "next" | "previous") => void;
};

export default function Pagination({ currentPage, onClick }: Props) {
  return (
    <section className="pagination">
      <button
        className="pagination__button"
        onClick={() => onClick("previous")}
      >
        <ArrowLeftIcon /> Page {currentPage - 1}
      </button>
      <button className="pagination__button" onClick={() => onClick("next")}>
        Page {currentPage + 1} <ArrowRightIcon />
      </button>
    </section>
  );
}
