import { NextSeo } from 'next-seo';
import Menu, { menuProperties } from '@/components/Menu';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import Table from '@/components/Table';
import { useRouter } from 'next/router';

export default function Home() {
  const [menuState, setMenuState] = useState<string>('Todos os dados')
  const [data, setData] = useState([])
  const [totalDocuments, setTotalDocuments] = useState(0)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false) 
  const router = useRouter()

  const handleApi = async (params: any) => {
    setLoading(true)
    const {data, totalDocuments} = await menuProperties[menuState].function(params)
    setData(data)
    setTotalDocuments(totalDocuments)
    setLoading(false)
  }

  useEffect(() => {
    router.push({query: {...router.query, page: String(page + 1)}})
  }, [page])

  useEffect(() => {
    router.push({query: {...router.query, page: String(1)}})
    setPage(0)
  }, [menuState])

  useEffect(() => {
    handleApi(router.query)
  }, [menuState, router.query.page, router.query.year, router.query.size, router.query.state, router.query.month])

  return (
    <>
      <NextSeo
        title="Gastos Parlamentares"
        description="Um site para analisar os gastos parlamentares"
      />
      <main>
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
          />
        </Layout>
      </main>
    </>
  );
}