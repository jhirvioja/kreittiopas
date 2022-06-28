import Head from 'next/head'
import dynamic from 'next/dynamic'
import ClientOnly from '../components/ClientOnly'

const Nav = dynamic(() => import('../components/Nav'))
const Feed = dynamic(() => import('../components/Feed'), { ssr: false })
const Pagination = dynamic(() => import('../components/Pagination'), {
  ssr: false,
})
const Footer = dynamic(() => import('../components/Footer'))

export default function ClientSide() {
  return (
    <div>
      <Head>
        <title>Kreittiopas.fi | Webzine</title>
      </Head>
      <Nav />
      <main>
        <div className="cumulative-wrapper">
          <ClientOnly>
            <Feed />
            <div className="paginationwrapper">
              <Pagination />
            </div>
          </ClientOnly>
        </div>
      </main>
      <Footer />
    </div>
  )
}
