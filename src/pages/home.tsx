import { NextSeo } from 'next-seo';
import Menu from '@/components/Menu';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import Table from '@/components/Table';
import { getInitialData } from '@/services/getInitialData';
import { totalBills } from '@/services/totalBills';
import { useRouter } from 'next/router';
import { billsType } from '@/services/billsType';

export default function Home() {
  const [menuState, setMenuState] = useState<string>('Dados')
  const [data, setData] = useState([])
  const [totalDocuments, setTotalDocuments] = useState(0)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false) 
  const router = useRouter()

  const chooseAPI: Record<string, Function> = {
    'Dados': getInitialData,
    'Gastos totais': totalBills,
    'Tipos de Gastos': billsType
  }


  const handleApi = async (params: any) => {
    setLoading(true)
    const {data, totalDocuments} = await chooseAPI[menuState](params)
    setData(data)
    setTotalDocuments(totalDocuments)
    setLoading(false)
  }

  useEffect(() => {
    router.push({query: { page: String(page + 1)}})
  }, [page])

  useEffect(() => {
    router.push({query: { page: String(1)}})
    setPage(0)
  }, [menuState])

  useEffect(() => {
    handleApi(router.query)
  }, [menuState, router.query.page])

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