import { redirect } from 'next/navigation'
import { parseOrder } from '@/lib/order'
import { OrderSummary } from '@/components/order-summary'

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ConfirmationPage({ searchParams }: Props) {
  const params = await searchParams
  const order = parseOrder(params)

  if (!order) {
    redirect('/')
  }

  return (
    <main>
      <OrderSummary order={order} />
    </main>
  )
}
