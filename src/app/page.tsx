import { prisma } from '@/lib/prisma'

export default async function Home() {
  const [unitCount, residentCount, openListings, openLeads] = await Promise.all([
    prisma.unit.count(),
    prisma.resident.count(),
    prisma.listing.count({ where: { available: true } }),
    prisma.lead.count({ where: { status: { not: 'closed' } } }),
  ])

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Society CRM</h1>
        <p className="text-gray-600 mb-8">
          Personal tracker for flats, vehicles, bills and leads.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <StatCard label="Units" value={unitCount} />
          <StatCard label="Residents" value={residentCount} />
          <StatCard label="Open Listings" value={openListings} />
          <StatCard label="Active Leads" value={openLeads} />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Next steps</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Add your society and units</li>
            <li>Record residents and their car/bike counts</li>
            <li>Create sale or rental listings</li>
            <li>Capture leads and sync them to HubSpot</li>
            <li>Log commissions on closed deals</li>
          </ul>
        </div>
      </div>
    </main>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-3xl font-bold text-indigo-600">{value}</div>
    </div>
  )
}
