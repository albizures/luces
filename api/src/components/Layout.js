import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Layout, Menu } from 'antd'

const { Header, Content, Footer } = Layout
const { Item } = Menu

function logout ({ key }) {
  if (key !== '3') {
    return
  }
  document.cookie = 'id_token=; expires=Thu, 18 Dec 2020 12:00:00 UTC'
  document.location.pathname = '/login'
}

export default ({children, withoutMenus}) => (
  <div>
    <Head>
      <link rel='stylesheet' href='https://unpkg.com/antd@3/dist/antd.min.css' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
    </Head>
    <Layout className='layout'>
      <Header>
        <div className='logo' />
        {
          !withoutMenus && (
            <Menu
              theme='dark'
              mode='horizontal'
              onClick={logout}
              style={{ lineHeight: '64px' }}>
              <Item key='1'>
                <Link href='/'>
                  <a>Cursos</a>
                </Link>
              </Item>
              <Item key='2'>
                <Link href='/categories'>
                  <a>Categorias</a>
                </Link>
              </Item>
              <Item style={{float: 'right'}} key='3'>Salir</Item>
            </Menu>
          )
        }
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          {children}
        </div>
      </Content>
    </Layout>
    <Footer style={{ textAlign: 'center' }}>
      Luces Beautiful ©2018 Created by The Digital Catapult
    </Footer>
  </div>
)
