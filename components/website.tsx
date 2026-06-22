import Link from "next/link";
import type { Website } from "@/types/website";

type Props = {
    website: Website;
};

export default function WebsiteCard({ website }: Props) {
    return (
      <Link href={`/websites/${website.slug}`}>
        <img src={`/websites/${website.thumbnail}`} />
        <h2>{website.title}</h2>
      </Link>
    );
}
