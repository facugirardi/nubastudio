export const NIGHT_EVENT = "nuba:night";

/** De noche en Argentina (20 a 7 h), sin importar dónde esté quien visita. */
export function isArgentinaNight(date = new Date()) {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", { hour: "numeric", hourCycle: "h23", timeZone: "America/Argentina/Buenos_Aires" }).format(date)
  );
  return hour >= 20 || hour < 7;
}
