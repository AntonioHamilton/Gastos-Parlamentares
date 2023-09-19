import { useRouter } from 'next/router'
import styles from './styles.module.scss'
import { months, sizes, states, years } from '@/constants/filters'

type FiltersProps = {
  filtersToShow?: string[]
}

const Filters = ({filtersToShow}: FiltersProps) => {
  const router = useRouter()

  const handleShowFilter = (filter: string) => {
    if (filtersToShow) {
      return -1 !== filtersToShow.findIndex((item) => 
        filter === item
      )
    }
    return false
  }

  const onChangeInput = (text: string) => {
    router.push({ query: {...router.query, description: text} })
  }

  const onSelectSize = (text: string) => {
    router.push({ query: {...router.query, size: text} })
  }

  const onSelectYear = (text: string) => {
    router.push({ query: {...router.query, year: text} })
  }

  const onSelectState = (text: string) => {
    router.push({ query: {...router.query, state: text} })
  }

  const onSelectMonth = (text: string) => {
    router.push({ query: {...router.query, month: text} })
  }

  return (
    <div data-testid='filters' className={styles["filters-container"]}>
      <div className={styles["filters-container__wrapper__input"]}>
        <label>{handleShowFilter('input') ? 'O que você está procurando?' : 'Boa análise de dados'}</label>
        {handleShowFilter('input') && <input data-testid='input' disabled={false} onChange={(e) => onChangeInput(e.target.value)} />}
      </div>
      <div className={styles["filters-container__wrapper"]}>
      {handleShowFilter('size') && <div className={styles["filters-container__wrapper__filter"]}>
          <label data-testid='size'>Tamanho</label>
          <select data-testid='sizeSelect' defaultValue='10' onChange={(e) => onSelectSize(e.target.value)}>
            {sizes.map((size) => (
              <option key={size} value={size} selected={size === router.query.size}>{size}</option>
            ))}
          </select>
        </div>}
        {handleShowFilter('state') && <div className={styles["filters-container__wrapper__filter"]}>
          <label data-testid='state'>Estado</label>
          <select data-testid='stateSelect' defaultValue='SE' onChange={(e) => onSelectState(e.target.value)}>
            {states.map((state) => (
              <option key={state} value={state} selected={state === router.query.state}>{state}</option>
            ))}
          </select>
        </div>}
        {handleShowFilter('month') && <div className={styles["filters-container__wrapper__filter"]}>
          <label data-testid='month'>Mês</label>
          <select data-testid='monthSelect' defaultValue='1' onChange={(e) => onSelectMonth(e.target.value)}>
            {Object.keys(months).map((month) => (
              <option key={month} value={month} selected={month === router.query.month}>{months[month]}</option>
            ))}
          </select>
        </div>}
        {handleShowFilter('year') && <div className={styles["filters-container__wrapper__filter"]}>
          <label data-testid='year'>Ano</label>
          <select data-testid='yearSelect' defaultValue='2016' onChange={(e) => onSelectYear(e.target.value)}>
            {years.map((year) => (
              <option key={year} value={year} selected={year === router.query.year}>{year}</option>
            ))}
          </select>
        </div>}
      </div>
    </div>
  )
}

export default Filters