import Link from "next/link";

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="TalionQA home">
      <span className="brand-mark" aria-hidden="true">
        <span />
      </span>
      <span>TalionQA</span>
    </Link>
  );
}
