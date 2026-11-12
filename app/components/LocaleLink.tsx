"use client";

import { forwardRef, type ComponentProps } from "react";
import Link from "next/link";
import { useLanguage } from "../lib/i18n";

type Props = ComponentProps<typeof Link>;

/** next/link que agrega el prefijo de idioma (/es) a las rutas internas. */
const LocaleLink = forwardRef<HTMLAnchorElement, Props>(function LocaleLink({ href, ...rest }, ref) {
  const { path } = useLanguage();
  const localized = typeof href === "string" && href.startsWith("/") ? path(href) : href;
  return <Link ref={ref} href={localized} {...rest} />;
});

export default LocaleLink;
