import React from 'react'

const FeatureText = ({
    children
}) => {
  return (
    <span
    className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600"
  >
    {children}
  </span>
  )
}

export default FeatureText