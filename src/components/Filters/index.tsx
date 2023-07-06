import { useRouter } from 'next/router'
import styles from './styles.module.scss'

type FiltersProps = {
  filtersToShow?: string[]
}

const Filters = ({filtersToShow}: FiltersProps) => {
  const router = useRouter()

  const years = ["2016", "2017", "2018", "2019", "2020"]
  const sizes = ['10', '20', '30', '40', '50']

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

  return (
    <div className={styles["filters-container"]}>
      <div className={styles["filters-container__wrapper__input"]}>
        <label>{handleShowFilter('input') ? 'O que você está procurando?' : 'Boa análise de dados'}</label>
        {handleShowFilter('input') && <input onChange={(e) => onChangeInput(e.target.value)} />}
      </div>
      <div className={styles["filters-container__wrapper"]}>
      {handleShowFilter('size') && <div className={styles["filters-container__wrapper__filter"]}>
          <label>Tamanho</label>
          <select onChange={(e) => onSelectSize(e.target.value)}>
            {sizes.map((size) => (
              <option key={size} value={size} selected={size === router.query.size}>{size}</option>
            ))}
          </select>
        </div>}
        {handleShowFilter('year') && <div className={styles["filters-container__wrapper__filter"]}>
          <label>Ano</label>
          <select onChange={(e) => onSelectYear(e.target.value)}>
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