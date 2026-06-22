import type { GetStaticPaths, GetStaticProps } from "next";
import type { Website } from "@/types/website";

type Props = {
  website: Website;
};

export default function WebsiteDetailPage({ website }: Props) {
  return (
    <>
      <h1>{website.title}</h1>
      <img src={`/websites/${website.thumbnail}`} alt={website.title} width="300" />
      <p>{website.description}</p>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const websites = (await import("@/public/websites.json")).default as Website[];

  return {
    paths: websites.map((website) => ({
      params: {
        slug: website.slug,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const websites = (await import("@/public/websites.json")).default as Website[];
  const slug = params?.slug;

  if (typeof slug !== "string") {
    return {
      redirect: {
        destination: "/websites",
        permanent: false,
      },
    };
  }

  const website = websites.find((website) => website.slug === slug);

  if (!website) {
    return {
      redirect: {
        destination: "/websites",
        permanent: false,
      },
    };
  }

  return {
    props: {
      website,
    },
  };
};
