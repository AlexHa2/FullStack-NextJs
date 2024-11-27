import { SearchOutlined } from '@ant-design/icons'
import Image from 'next/image'
import React from 'react'
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import Headerdashboard from "./HeaderDashBoard.module.scss"
import clsx from 'clsx';


import ImageUser from "Img/UserImage.jpg"

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'bla'
  },
  {
    key: '2',
    label: 'bla'
  },
  {
    key: '3',
    label: 'bla'
  },
];

export default function HeaderDashBoard() {
  return (
    <div className={clsx(Headerdashboard.header)}>
      <div className={clsx(Headerdashboard.search)}>
        <div className={Headerdashboard.input}><input type='search' placeholder='find something' /></div>
        <p><SearchOutlined /></p>
      </div>
      <div className={clsx(Headerdashboard.user_container)}>
        <div>
          <Image src={ImageUser} width={45} alt='image user' quality={100} />
        </div>
        <div className={clsx(Headerdashboard.userConvinient)}>
          <Space direction="vertical">
            <Space wrap>
              <Dropdown menu={{ items }} placement="bottomLeft">
                <Button>User</Button>
              </Dropdown>
            </Space>
          </Space>
        </div>
      </div>
    </div>
  )
}
