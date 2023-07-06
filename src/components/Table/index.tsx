import { useState } from "react";
import Pagination from "../Pagination";
import DataTable from "./DataTable";
import ReactLoading from 'react-loading'
import styles from './styles.module.scss'
import Filters from "../Filters";
import { useRouter } from "next/router";

type TableProps = {
  data: any
  loading: boolean
  totalDocuments: number
  page: number
  menuState: string
  setPage: (value: number) => void
}

const Table = ({data, loading, totalDocuments, menuState, page, setPage}: TableProps) => {
  const router = useRouter()

  const chooseFilters: Record<string, string[]> = {
    'Dados': ['size'],
    'Gastos totais': ['year', 'size'],
    'Tipos de Gastos': ['year', 'size', 'input'],
    'Parlamentares que mais gastam': ['year', 'size', 'input'],
  }

  return (
    <div className={styles["table-container"]}>
      <Filters filtersToShow={chooseFilters[menuState]}/>
      {data.length > 0 && !loading && <DataTable data={data} headers={Object.keys(data[0])}/>}
      {loading && 
        <div className={styles["load-container"]}>
          <ReactLoading width={200} height={200} type="spin" color="DodgerBlue" />
        </div>
      }
      {(router.query.size ? totalDocuments > Number(router.query.size) : totalDocuments > 10) && <Pagination page={page} setPage={setPage} resultsQTD={totalDocuments}/>}
    </div>
  )
}

export default Table;