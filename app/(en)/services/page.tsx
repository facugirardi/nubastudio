import { ServicesPage, servicesMetadata } from "../../lib/pages";

export const metadata = servicesMetadata("en");

export default function Page() {
  return <ServicesPage lang="en" />;
}
