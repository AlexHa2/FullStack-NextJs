import React from 'react'
import "./LinkClick.scss"
import clsx from 'clsx'
import Link from 'next/link'
export default function LinkClick({ icon, text, link }: {
  icon: React.ReactNode,
  text: string,
  link: string
}) {
  return (
    <Link href={`/${link}`} style={{textDecoration:"none"}}>
      <div className="container_link">
        <div className="Icon_link">
          {icon}
        </div>
        <div className='Text_link'>
          <p>{text}</p>
        </div>
      </div>
    </Link>
  )
}
