'use client'

import dynamic from 'next/dynamic'

const RecentActivityToast = dynamic(() => import('@/components/tetto94/recent-activity-toast'), { ssr: false })

export default function RecentActivityLoader() {
  return <RecentActivityToast />
}
