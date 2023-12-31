import NextIcon from '@/assets/NextIcon'
import BackIcon from '@/assets/BackIcon'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'

type PaginationProps = {
  resultsQTD: number,
  page: number,
  setPage: (page: number) => void
}

const Pagination = ({resultsQTD, page, setPage}: PaginationProps) => {
  const router = useRouter()

  const QTDItens = Number(router.query.size) || 10

  const pageButtonQTD = () => {
    return Math.floor(resultsQTD / QTDItens) + (resultsQTD % QTDItens >= 1 ? 1 : 0)
  }

  const pageArray = Array.from({ length: pageButtonQTD() })
  
  const handleShowButton = (index: number) => {
    if (page + 1 === 1 && page === index || page + 1 === index) {
      return true
    }
    else if (page - 1 === index || page === index || page + 1 === index) {
      return true
    }
    else if (page + 1 === pageButtonQTD() && (page - 2 === index || page - 1 === index || page === index)) {
      return true
    }
    else return false
  }

  return (
    <div data-testid='pagination' className={styles['pagination-container']}>
      <>
        <button
          data-testid='back'
          className={styles["pagination-container__button-next"]}
          onClick={() => {if (page >= 1) setPage(page - 1)}}
        >
          <BackIcon/>
        </button>
      </>
      {page > 1 &&
        <>
          <button
            className={styles['pagination-container__button']}
            onClick={() => setPage(0)}
          >
            {1}
          </button>
          ...
        </>
      }
      { pageButtonQTD() > 1 &&
        pageArray.map((_, index) => {
          return (
            handleShowButton(index) && <div key={index}>
            <button
              className={styles[`pagination-container__button${index === page ? '-active' : ''}`]}
              onClick={() => setPage(index)}
            >
              {index + 1}
            </button>
          </div>
        )})
      }
      {page < pageButtonQTD() - 2 && <>
        ...
        <button
          className={styles[`pagination-container__button`]}
          onClick={() => setPage(pageButtonQTD() - 1)}
        >
          {pageButtonQTD()}
        </button>
      </>}
      <button
        data-testid='next'
        className={styles["pagination-container__button-next"]}
        onClick={() => {if (page + 1 !== pageButtonQTD()) setPage(page + 1)}}
      >
        <NextIcon/>
      </button>
    </div>
  )
}

export default Pagination