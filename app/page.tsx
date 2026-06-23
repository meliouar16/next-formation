import { ButtonLink } from "@/composants/ui/ButtonLink";
import Video from "@/composants/ui/Video";
import Title from "@/composants/ui/Title";
import Website from "@/composants/ui/Website";
import WebsiteHeader from "@/composants/ui/WebsiteHeader";
import { WebsiteType } from "@/types/website";

export default async function HomePage() {
  const websites: WebsiteType[] = await fetch(
    "http://localhost:3000/websites.json",
  ).then((res) => res.json());

  return (
    <main>
      <WebsiteHeader website={websites[0]} />
      <div className="bg-white px-6 py-12">
        <Title
          tag="h2"
          topLine="Voir les derniers"
          bottomLine="et ajoute tes propres reviews"
        >
          Sites web
        </Title>
        <div className="grid md:grid-cols-3 gap-4 pt-12">
          {websites
            .filter((_, i) => i > 0 && i <= 3)
            .map((w, i) => (
              <Website key={`website-${i}`} website={w} />
            ))}
        </div>
        <footer className="pt-12 flex justify-center">
          <ButtonLink href="/websites" variant="link">
            Voir tous les sites
          </ButtonLink>
        </footer>
      </div>

      <div className="bg-white px-6 py-12">
        <Title tag="h2" topLine="découvrez notre dernier">
          Highlight
        </Title>

        <Video src="/highlight.mp4" />
      </div>
    </main>
  );
}
