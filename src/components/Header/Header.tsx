import React from 'react'
import HeaderStyle from "./Header.module.scss"
import { Col, Row } from 'react-bootstrap'
import clsx from 'clsx'
import Image from 'next/image'
import Logo from "../../../public/logoWeb.jpg"
export default function Header() {
  return (
    <>
      <Row>
        <Col xl={12}>
          <div className="header-left">
            <Image alt='day la logo' src={Logo} width={100} />
          </div>
          <div className={clsx(HeaderStyle.header, {
            [HeaderStyle.charactorColor]: true
          })}>
            <ul className={clsx(HeaderStyle.ha)}>
              <li>one</li>
              <li className='ha2'>two</li>
              <li className={clsx(HeaderStyle.ha1)}>three</li>
              </ul>
          </div>
        </Col>
      </Row>
    </>
  )
}
