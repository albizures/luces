import Head from 'next/head'

const Redirect = (props) => {
  return <Head>
    <meta httpEquiv='refresh' content={`0; URL=${props.redirectUrl}`} />
  </Head>
}

Redirect.getInitialProps = ({ query }) => {
  const { url } = query
  return {
    redirectUrl: url
  }
}

export default Redirect
