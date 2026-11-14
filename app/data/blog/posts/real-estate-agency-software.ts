import type { Post } from "../types";

const post: Post = {
  slug: "real-estate-agency-software",
  date: "2026-11-30",
  category: "industry",
  cases: ["tivvu", "kennedys"],
  content: {
    en: {
      title: "How to digitize a real estate agency: CRM, listings and leads in one place",
      seoTitle: "Real estate agency software: CRM and listings",
      description:
        "What software a real estate agency needs to stop working across spreadsheets and disconnected tools: listings, CRM, offers, rentals and a website it can edit.",
      excerpt:
        "Listings in spreadsheets, clients in a CRM nobody opens, offers as PDFs. What a real estate agency needs to run the whole operation from one place.",
      body: `
Most real estate agencies run on a patchwork: listings in spreadsheets, clients in a CRM nobody opens, offers sent as PDFs, rentals tracked on a calendar and a website that someone else has to update. Every piece lives in a different tool, so nothing connects. An inquiry never reaches the right agent, an offer goes out and nobody knows whether it was opened, and publishing a listing means doing the work twice.

We designed and built [Tivvu](/cases/tivvu), a platform for real estate agencies that puts the whole operation in one place. This is what we learned about what an agency needs.

## The pieces of a real estate operation

### 1. Properties

Sales and rentals, with photos, features, prices and status. The property record is the center of everything: it feeds the website, the offers and the reports. It should be loaded once and used everywhere.

### 2. Clients and inquiries (CRM)

A CRM (customer relationship management) is the system that tracks each client: what they are looking for, which properties they saw, what they were sent, at what stage they are. The key is that it fills itself: in Tivvu, inquiries from the public site create the client and log the history automatically. A CRM that depends on agents typing everything by hand ends up empty.

### 3. Offers

Sending an offer as a PDF by email leaves the agency blind. In Tivvu, offers go out as a link and the agency sees when they are opened. Knowing that a client opened the offer three times yesterday changes the follow-up call.

### 4. Rentals and availability

Temporary rentals need bookings and an availability calendar connected to the properties, so the website never shows a property as free when it is not.

### 5. Reports and owner statements

Owners want to know how their property is performing. Generating reports and statements from the same data saves hours each month and improves the relationship. We built a similar owner report generator, with PDF export, for [Kennedy's Group](/cases/kennedys) in the luxury rental market.

### 6. Roles

Agents need to see their own work; owners of the agency need to see everything. Roles and permissions keep the information organized and protected.

## The website, on top of the same data

An agency's website should not be a separate project. When it reads from the same database as the back office, a property published internally appears on the site automatically, with the right price and status.

In Tivvu, every agency gets its own public site with an editor to choose the layout, colors, fonts and content blocks, with no developer involved. Sites are server-rendered and cached, which makes them fast and good for search engines.

## Moving over without starting from zero

The biggest barrier to adopting new software in an agency is migration. Nobody wants to re-type hundreds of properties. Tivvu includes a data importer that brings listings in from spreadsheets and portal feeds, so moving over takes an afternoon.

## Languages

Real estate, especially in tourist areas, works with foreign clients. Tivvu runs in eight languages across the app, the site and the emails, with each email sent in the reader's language.

## Generic CRM, real estate software or custom?

- **Generic CRM:** flexible, but it does not know what a property, an offer or a rental is. You end up adapting the agency to the tool.
- **Real estate software:** covers the standard operation and is the right choice for most agencies.
- **Custom platform:** makes sense for networks of agencies, developers, luxury segments or agencies with a very particular operation. We explain how to decide in [custom software vs. SaaS](/blog/custom-software-vs-saas).

If you run an agency or are building software for the real estate industry, [let's talk](/contact).
`,
      faq: [
        {
          question: "What software does a real estate agency need?",
          answer:
            "At minimum, property management, a CRM for clients and inquiries, a way to send and track offers, and a website connected to the same data. Agencies with rentals also need bookings and availability.",
        },
        {
          question: "Can I import my properties from spreadsheets or portals?",
          answer:
            "With the right software, yes. Tivvu includes an importer for spreadsheets and portal feeds so agencies can move over in an afternoon.",
        },
        {
          question: "Should my agency's website be connected to the CRM?",
          answer:
            "Yes. When the site and the back office share data, listings are always up to date and every inquiry from the site lands in the CRM automatically.",
        },
      ],
    },
    es: {
      title: "Cómo digitalizar una inmobiliaria: CRM, propiedades y consultas en un solo lugar",
      seoTitle: "Software para inmobiliarias: CRM y propiedades",
      description:
        "Qué software necesita una inmobiliaria para dejar de trabajar con planillas y herramientas sueltas: propiedades, CRM, ofertas, alquileres y un sitio editable.",
      excerpt:
        "Propiedades en planillas, clientes en un CRM que nadie abre, ofertas en PDF. Qué necesita una inmobiliaria para manejar toda la operación desde un solo lugar.",
      body: `
La mayoría de las inmobiliarias funcionan con un rompecabezas: propiedades en planillas, clientes en un CRM que nadie abre, ofertas enviadas en PDF, alquileres anotados en un calendario y un sitio web que tiene que actualizar otra persona. Cada pieza vive en una herramienta distinta, así que nada se conecta. Una consulta nunca le llega al agente correcto, una oferta sale y nadie sabe si la abrieron, y publicar una propiedad significa hacer el trabajo dos veces.

Diseñamos y desarrollamos [Tivvu](/cases/tivvu), una plataforma para inmobiliarias que reúne toda la operación en un solo lugar. Esto es lo que aprendimos sobre lo que necesita una inmobiliaria.

## Las piezas de una operación inmobiliaria

### 1. Propiedades

Ventas y alquileres, con fotos, características, precios y estado. La ficha de la propiedad es el centro de todo: alimenta el sitio, las ofertas y los reportes. Debería cargarse una vez y usarse en todos lados.

### 2. Clientes y consultas (CRM)

Un CRM (sistema de gestión de clientes) registra a cada cliente: qué busca, qué propiedades vio, qué se le envió y en qué etapa está. La clave es que se llene solo: en Tivvu, las consultas del sitio público crean el cliente y registran el historial automáticamente. Un CRM que depende de que los agentes carguen todo a mano termina vacío.

### 3. Ofertas

Mandar una oferta en PDF por email deja a la inmobiliaria a ciegas. En Tivvu, las ofertas se envían como link y la inmobiliaria ve cuándo se abren. Saber que un cliente abrió la oferta tres veces ayer cambia la llamada de seguimiento.

### 4. Alquileres y disponibilidad

Los alquileres temporarios necesitan reservas y un calendario de disponibilidad conectados a las propiedades, para que el sitio nunca muestre como libre una propiedad que no lo está.

### 5. Reportes y liquidaciones a propietarios

Los propietarios quieren saber cómo rinde su propiedad. Generar reportes y liquidaciones a partir de los mismos datos ahorra horas cada mes y mejora la relación. Construimos un generador de reportes para propietarios similar, con exportación a PDF, para [Kennedy's Group](/cases/kennedys) en el mercado de alquileres de lujo.

### 6. Roles

Los agentes necesitan ver su propio trabajo; los dueños de la inmobiliaria, todo. Los roles y permisos mantienen la información ordenada y protegida.

## El sitio web, sobre los mismos datos

El sitio de una inmobiliaria no debería ser un proyecto aparte. Cuando lee de la misma base de datos que el backoffice, una propiedad publicada internamente aparece en el sitio automáticamente, con el precio y el estado correctos.

En Tivvu, cada inmobiliaria tiene su propio sitio público con un editor para elegir el diseño, los colores, las tipografías y los bloques de contenido, sin necesidad de un desarrollador. Los sitios se generan en el servidor y se guardan en caché, lo que los hace rápidos y buenos para los buscadores.

## Mudarse sin empezar de cero

La mayor barrera para adoptar un software nuevo en una inmobiliaria es la migración. Nadie quiere volver a cargar cientos de propiedades. Tivvu incluye un importador que trae las propiedades desde planillas y desde los feeds de los portales, así la mudanza lleva una tarde.

## Idiomas

El negocio inmobiliario, sobre todo en zonas turísticas, trabaja con clientes extranjeros. Tivvu funciona en ocho idiomas en la app, el sitio y los emails, y cada email se envía en el idioma de quien lo lee.

## ¿CRM genérico, software inmobiliario o a medida?

- **CRM genérico:** flexible, pero no sabe qué es una propiedad, una oferta o un alquiler. Terminás adaptando la inmobiliaria a la herramienta.
- **Software inmobiliario:** cubre la operación estándar y es la opción correcta para la mayoría de las inmobiliarias.
- **Plataforma a medida:** tiene sentido para redes de inmobiliarias, desarrolladoras, segmentos de lujo o inmobiliarias con una operación muy particular. Explicamos cómo decidir en [software a medida vs. SaaS](/blog/custom-software-vs-saas).

Si tenés una inmobiliaria o estás construyendo software para el sector, [hablemos](/contact).
`,
      faq: [
        {
          question: "¿Qué software necesita una inmobiliaria?",
          answer:
            "Como mínimo, gestión de propiedades, un CRM para clientes y consultas, una forma de enviar y seguir ofertas y un sitio web conectado a los mismos datos. Las inmobiliarias con alquileres también necesitan reservas y disponibilidad.",
        },
        {
          question: "¿Puedo importar mis propiedades desde planillas o portales?",
          answer:
            "Con el software adecuado, sí. Tivvu incluye un importador de planillas y feeds de portales para que una inmobiliaria pueda mudarse en una tarde.",
        },
        {
          question: "¿El sitio de mi inmobiliaria debería estar conectado al CRM?",
          answer:
            "Sí. Cuando el sitio y el backoffice comparten los datos, las propiedades siempre están actualizadas y cada consulta del sitio entra al CRM automáticamente.",
        },
      ],
    },
  },
};

export default post;
