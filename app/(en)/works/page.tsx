import { WorksPage, worksMetadata } from "../../lib/pages";

export const metadata = worksMetadata("en");

export default function Page() {
  return <WorksPage lang="en" />;
}
