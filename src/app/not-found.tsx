import Link from 'next/link'
import React from 'react'

export default function PageNotFound() {
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
        <div>
            <h1>404 page not found</h1>
            <Link href={"/dashboard"}>Return</Link>
        </div>
    </div>
  )
}
