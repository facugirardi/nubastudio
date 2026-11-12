import { AboutPage, aboutMetadata } from "../../lib/pages";

export const metadata = aboutMetadata("en");

export default function Page() {
  return <AboutPage lang="en" />;
}
