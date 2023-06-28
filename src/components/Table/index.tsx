import { useState } from "react";
import Pagination from "../Pagination";
import DataTable from "./DataTable";
import ReactLoading from 'react-loading'
import styles from './styles.module.scss'
import Filters from "../Filters";

type TableProps = {
  data: any
  loading: boolean
  totalDocuments: number
  page: number
  setPage: (value: number) => void
}

const Table = ({data, loading, totalDocuments, page, setPage}: TableProps) => {
  return (
    <div className={styles["table-container"]}>
      <Filters />
      {data.length > 0 && !loading && <DataTable data={data} headers={Object.keys(data[0])}/>}
      {loading && 
        <div className={styles["load-container"]}>
          <ReactLoading width={200} height={200} type="spin" color="DodgerBlue" />
        </div>
      }
      {totalDocuments > 10 && <Pagination page={page} setPage={setPage} resultsQTD={totalDocuments}/>}
    </div>
  )
}

export default Table;