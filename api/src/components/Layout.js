import '../config/axios'
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Layout, Menu } from 'antd'

const { Header, Content, Footer } = Layout
const { Item } = Menu

export default ({children}) => (
  <div>
    <Head>
      <link rel='stylesheet' href='https://unpkg.com/antd@3/dist/antd.min.css' />
    </Head>
    <Layout className='layout'>
      <Header>
        <div className='logo' />
        <Menu
          theme='dark'
          mode='horizontal'
          style={{ lineHeight: '64px' }}>
          <Item key='1'>
            <Link href='/categories'>
              <a>Categorias</a>
            </Link>
          </Item>
          <Item key='2'>nav 2</Item>
          <Item key='3'>nav 3</Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          {children}
        </div>
      </Content>
    </Layout>
    <Footer style={{ textAlign: 'center' }}>
      Ant Design ©2016 Created by Ant UED
    </Footer>
  </div>
)
