import React, { PropsWithChildren } from 'react'

const ErrorMessaje = ({children}:PropsWithChildren) => {
  return (
    <p className="bg-red-600 p-2 text-white font-bold text-sm text-center">
        {children}
    </p>
  )
}

export default ErrorMessaje