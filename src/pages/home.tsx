import { NextSeo } from 'next-seo';
import Menu from '@/components/Menu';
import Layout from '@/components/Layout';
import Table from '@/components/Table';
import Auth from '@/components/Auth';
import useHome from '@/hooks/useHome';
import { getLocation } from '@/services/location';
import Map from '@/components/Map';

const Home = () => {
  const {
    setMenuState, 
    setPage,
    myLocation, 
    permission,
    page, 
    data, 
    loading, 
    menuState,
    totalDocuments, 
    locations
  } = useHome()

  return (
    <>
      <NextSeo
        title="Gastos Parlamentares"
        description="Um site para analisar os gastos parlamentares"
      />
      <main>
        <Auth>
          <Layout>
            <Menu 
              setMenuState={setMenuState}
              menuState={menuState}
            />
            <Table
              menuState={menuState}
              page={page}
              setPage={setPage}
              data={data} 
              loading={loading} 
              totalDocuments={totalDocuments}
            >
              {permission && myLocation && locations && <Map userLocation={myLocation} locations={locations}/>}
            </Table>
          </Layout>
        </Auth>
      </main>
    </>
  );
}

export default Home