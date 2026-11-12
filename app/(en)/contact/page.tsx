import { ContactPage, contactMetadata } from "../../lib/pages";

export const metadata = contactMetadata("en");

export default function Page() {
  return <ContactPage lang="en" />;
}
