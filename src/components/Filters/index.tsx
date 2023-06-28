import { useRouter } from 'next/router'
import styles from './styles.module.scss'

const Filters = () => {
  const router = useRouter()

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
        <label>O que você está procurando?</label>
        <input disabled={true} onChange={(e) => onChangeInput(e.target.value)} />
      </div>
      <div className={styles["filters-container__wrapper"]}>
        <div className={styles["filters-container__wrapper__filter"]}>
          <label>Tamanho</label>
          <select disabled={true} onChange={(e) => onSelectSize(e.target.value)}>
            <option value="10" selected>10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className={styles["filters-container__wrapper__filter"]}>
          <label>Ano</label>
          <select onChange={(e) => onSelectYear(e.target.value)}>
            <option value="2016" selected>2016</option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Filters