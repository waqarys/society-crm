# Society CRM

Personal open-source CRM for housing society members.

Track flats available for sale or rent, resident vehicle counts, maintenance bills, and manage leads (with HubSpot integration) so you can help facilitate deals and earn commissions when you join a society.

## Features

- **Units / Flats**: Track apartments in the society with status (occupied, available for rent, available for sale).
- **Residents**: Record residents and their vehicle counts (cars, bikes).
- **Vehicles**: Detailed vehicle registry per resident.
- **Bills & Maintenance**: Track society maintenance bills and payments.
- **Listings**: Explicit sale and rental listings with price, description, and availability.
- **Leads**: Capture potential buyers/renters and sync to HubSpot as contacts/deals.
- **Commissions**: Log commission earned on closed deals.

## Tech Stack

- Next.js 14 (App Router) + TypeScript
- Prisma + SQLite (easy local/personal use; swap to Postgres for production)
- Tailwind CSS
- HubSpot CRM API for lead sync

## Quick Start

```bash
# Install dependencies
npm install

# Setup database
npx prisma generate
npx prisma db push

# Seed sample data (optional)
npx prisma db seed

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## HubSpot Integration

Set environment variables:

```env
HUBSPOT_ACCESS_TOKEN=your_private_app_token
```

The app can create Contacts and Deals in HubSpot when a lead is marked as hot or when a listing is shared.

See `src/lib/hubspot.ts` for the integration code.

## Personal Use Notes

This is designed for **personal use** as a society member who wants to:

1. Know which flats are available for rent/sale.
2. Track vehicles registered in the society.
3. Monitor maintenance and bills.
4. Capture leads from neighbors/WhatsApp groups and push them to your HubSpot portal for follow-up and commission tracking.

It is **not** a full multi-tenant society management platform (those exist — see recommendations below). It is a lightweight personal tool you control.

## Recommended Existing Open-Source Alternatives

If you prefer to fork/extend something more mature:

- [OpenSociety](https://github.com/opencore-x/opensociety) — Best match for Indian gated communities (vehicles, bills, maintenance, parking, visitor management). Modern stack.
- [Condo (open-condo-platform)](https://github.com/open-condo-software/open-condo-platform) — Mature condominium management.
- [OpenProperty](https://github.com/clawnify/OpenProperty) — Excellent for rental property management.
- [InsulaCRM](https://github.com/InsulaCRM/InsulaCRM) — Real estate lead/deal CRM.

## License

MIT
