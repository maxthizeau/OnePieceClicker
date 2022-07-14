import { FC, useEffect, useState } from "react"

const ClientOnly: FC<any> = ({ children, ...delegated }) => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return <div {...delegated}>{children}</div>
}

export default ClientOnly
