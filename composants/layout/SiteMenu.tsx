import { ButtonLink } from "../ui/ButtonLink";
import Logo from "../ui/Logo";

type SiteMenuType = {
  slug: string;
};
export default function SiteMenu({ slug }: SiteMenuType) {
  return (
    <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 bg-medium rounded-md p-2 z-90">
      <ul className="flex items-stretch gap-2">
        <li className="bg-dark rounded-lg flex items-center p-2">
          <Logo size={38} color="light" />
        </li>
        <li>
          <ButtonLink href="/websites" variant="outline" color="light">
            Voir les sites
          </ButtonLink>
        </li>
        <li>
          <ButtonLink href={`/websites/${slug}`} color="light">
            Voir le site
          </ButtonLink>
        </li>
      </ul>
    </nav>
  );
}
