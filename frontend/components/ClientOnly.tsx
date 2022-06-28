import { useEffect, useState } from 'react'

// This is implemented according to this following tutorial
// https://www.apollographql.com/blog/apollo-client/next-js/next-js-getting-started/

export default function ClientOnly({
  children,
  ...delegated
}: {
  children: any
  delegated: any
}) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return <div {...delegated}>{children}</div>
}
