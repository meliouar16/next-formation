
import WebsiteCard from "@/components/website";
import type { Website } from "@/types/website";

type Props = {
    websites: Website[];
};

export default function WebsitesPage({ websites }: Props) {
    return (
      <>
        <h1>Sites web</h1>

        {websites.map((website) => (
          <WebsiteCard key={website.slug} website={website} />
        ))}
      </>
    );
}

export async function getStaticProps() {
    const response = await fetch("http://localhost:3000/websites.json");
    const websites: Website[] = await response.json();

    return {
      props: {
        websites,
      },
    };
}
