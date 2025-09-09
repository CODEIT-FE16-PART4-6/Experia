'use client'

import { BREAKPOINTS, POPULAR_ACTIVITIES_VIEW_COUNT } from "@/constants"
import useWindowWidth from "@/hooks/useWindowWidth"
import { Activities } from "@/types/schema/activitiesSchema"
import { useEffect, useState } from "react"
import PopularList from "./PopularList.client"

const getPageSize = (width: number) => {
  if (width >= BREAKPOINTS.lg) return POPULAR_ACTIVITIES_VIEW_COUNT.lg
  if (width >= BREAKPOINTS.md) return POPULAR_ACTIVITIES_VIEW_COUNT.md
  return POPULAR_ACTIVITIES_VIEW_COUNT.sm
}

const PopularPageClient = ({ initialData }: { initialData: Activities }) => {
  const innerWidth = useWindowWidth()
  const [pageSize, setPageSize] = useState(POPULAR_ACTIVITIES_VIEW_COUNT.md)

  useEffect(() => {
    if (innerWidth) setPageSize(getPageSize(innerWidth))
  }, [innerWidth])

  return (
    <div className="pl-4 lg:px-0 mb-10 md:mb-14 lg:mb-20">
      <PopularList data={{ pages: [initialData], pageParams: [null] }} />
    </div>
  )
}

export default PopularPageClient