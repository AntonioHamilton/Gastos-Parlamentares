import { ReactNode, useState } from "react";
import Pagination from "../Pagination";
import DataTable from "./DataTable";
import ReactLoading from 'react-loading'
import styles from './styles.module.scss'
import Filters from "../Filters";
import { useRouter } from "next/router";
import { menuProperties } from "../Menu";

type TableProps = {
  data: any
  loading: boolean
  totalDocuments: number
  page: number
  menuState: string
  children: ReactNode
  setPage: (value: number) => void
}

const Table = ({data, loading, totalDocuments, menuState, page, children, setPage}: TableProps) => {
  const router = useRouter()

  return (
    <div data-testid='data-table'  className={styles["table-container"]}>
      <Filters filtersToShow={menuProperties[menuState].filters}/>
      {data.length > 0 && !loading && <DataTable data={data} headers={Object.keys(data[0])}/>}
      {loading && 
        <div data-testid='loading-spinner' className={styles["load-container"]}>
          <ReactLoading width={200} height={200} type="spin" color="DodgerBlue" />
        </div>
      }
      {(router.query.size ? totalDocuments > Number(router.query.size) : totalDocuments > 10) && <Pagination page={page} setPage={setPage} resultsQTD={totalDocuments} />}
      {children}
    </div>
  )
}

export default Table;