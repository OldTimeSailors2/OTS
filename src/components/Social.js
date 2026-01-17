import Link from "next/link";

export default function Social({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        IG
      </Link>
    </div>
  );
}
