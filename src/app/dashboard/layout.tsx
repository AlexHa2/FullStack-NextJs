import HeaderDashBoard from '@/components/HeaderDashBoard/HeaderDashBoard'
import Sidebar from '@/components/Sidebar/Sidebar'
import Image from 'next/image'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'


import LogoWeb from "Img/4a2be73b1e2efb44355436c40bf496dd.jpg"
export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Container>
                <Row>
                    <Col xl={3}>
                        <div style={{marginLeft:"2rem"}}>
                            <Image src={LogoWeb} alt='logo web' width={150} quality={100}/>
                        </div>
                    </Col>
                    <Col xl={9} >
                        <HeaderDashBoard />
                    </Col>
                </Row>
                <Row >
                    <Col xl={3}  style={{paddingLeft:"0",paddingRight:"0"}}>
                        <Sidebar />
                    </Col>
                    <Col xl={9} style={{paddingRight:"0"}}>
                        <Col xl={12}>
                            {children}
                        </Col>
                    </Col>
                </Row>
                <Row style={{marginTop:'5px'}}>
                    <p style={{margin:"0",width:'100%',textAlign:"center",backgroundColor:"grey"}}>Copy right @2024</p>
                </Row>
            </Container>
        </>
    )
}
