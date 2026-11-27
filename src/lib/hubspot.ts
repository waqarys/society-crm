/**
 * HubSpot CRM integration helpers.
 * Create a Private App in HubSpot and set HUBSPOT_ACCESS_TOKEN.
 */

const HUBSPOT_BASE = 'https://api.hubapi.com'

export async function createHubSpotContact(lead: {
  name: string
  email?: string | null
  phone?: string | null
  notes?: string | null
}) {
  const token = process.env.HUBSPOT_ACCESS_TOKEN
  if (!token) throw new Error('HUBSPOT_ACCESS_TOKEN not set')

  const [firstName, ...rest] = lead.name.split(' ')
  const lastName = rest.join(' ') || ''

  const res = await fetch(`${HUBSPOT_BASE}/crm/v3/objects/contacts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        firstname: firstName,
        lastname: lastName,
        email: lead.email || undefined,
        phone: lead.phone || undefined,
        notes: lead.notes || undefined,
        lifecyclestage: 'lead',
      },
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`HubSpot error: ${err}`)
  }

  return res.json()
}

export async function createHubSpotDeal(contactId: string, title: string, amount: number) {
  const token = process.env.HUBSPOT_ACCESS_TOKEN
  if (!token) throw new Error('HUBSPOT_ACCESS_TOKEN not set')

  const res = await fetch(`${HUBSPOT_BASE}/crm/v3/objects/deals`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        dealname: title,
        amount: amount.toString(),
        dealstage: 'appointmentscheduled',
        pipeline: 'default',
      },
      associations: [
        {
          to: { id: contactId },
          types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }],
        },
      ],
    }),
  })

  if (!res.ok) throw new Error(await res.text())
  return res.json()
}
