type Props = {
  totalNumberOfResults: number;
};

export default function ResultsCount({ totalNumberOfResults }: Props) {
  return (
    <p className="count">
      <span className="u-bold">{totalNumberOfResults}</span> results
    </p>
  );
}
