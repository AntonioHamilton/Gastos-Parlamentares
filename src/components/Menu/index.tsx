import { ReactNode } from 'react'
import styles from './styles.module.scss'
import { getInitialData } from '@/services/getInitialData'
import { totalBills } from '@/services/totalBills'
import { billsType } from '@/services/billsType'
import { mostBills } from '@/services/mostBills'
import { maxBillsTypeByCongressman } from '@/services/maxBillsTypeByCongressman'
import { minBillsTypeByCongressman } from '@/services/minBillsTypeByCongressman'
import { topSpendingStates } from '@/services/topSpendingStates'
import { topSpendingCongressmanState } from '@/services/topSpendingCongressmanState'
import { partySpendingByMonthByYear } from '@/services/partySpendingByMonthByYear'
import { airTicketByCongressman } from '@/services/airTicketByCongressman'
import { campaignByCongressman } from '@/services/campaignByCongressman'
import { useRouter } from 'next/router'

type MenuProps = {
  setMenuState: (name: string) => void
  menuState: string
}

type MenuPropertiesProps = {
  icon: ReactNode;
  function: Function;
  filters?: string[]
}

export const menuProperties: Record<string, MenuPropertiesProps> = {
  'Todos os dados': { icon: '', function: getInitialData, filters: ['size'] },
  'Gastos totais por partido': { icon: '', function: totalBills, filters: ['year', 'size']},
  'Tipos de Gastos dos parlamentares': { icon: '', function: billsType, filters: ['year', 'size', 'input']},
  'Parlamentares que mais gastam': { icon: '', function: mostBills, filters: ['year', 'size', 'input']},
  'Maiores gastos por parlamentar': { icon: '', function: maxBillsTypeByCongressman, filters: ['year', 'size', 'input']},
  'Menores gastos por parlamentar': { icon: '', function: minBillsTypeByCongressman, filters: ['year', 'size', 'input']},
  'Estados que mais gastam': { icon: '', function: topSpendingStates, filters:  ['year', 'size']},
  'Parlamentares que mais gastam por estado': { icon: '', function: topSpendingCongressmanState, filters: ['year', 'size', 'state']},
  'Partidos que mais gastam': { icon: '', function: partySpendingByMonthByYear, filters: ['year', 'size', 'month']},
  'Gastos com passagens aéreas': { icon: '', function: airTicketByCongressman, filters: ['year', 'size', 'month', 'input']},
  'Gastos com campanha': { icon: '', function: campaignByCongressman, filters: ['year', 'size', 'month', 'input']},
}

const Menu = ({setMenuState, menuState,}: MenuProps) => {
  const router = useRouter()

  const clickButton = (name: string) => {
    setMenuState(name)
  }

  const handleExit = () => {
    localStorage.setItem('token', '')
    router.push('/login')
  }

  return (
    <div className={styles["menu-container"]}>
      <h1>GP</h1>
      {Object.keys(menuProperties).map((item) => {
        const clicked = item === menuState
        return (
          <button
            className={styles[`menu-container__button${clicked ? '-active': ''}`]}
            onClick={() => clickButton(item)} 
            key={item}
          >
            {menuProperties[item].icon} {item}
          </button>
           
        )
      })}
      <button
        className={styles[`menu-container__button`]}
        onClick={handleExit} 
      >
        sair
      </button>
    </div>
  )
}

export default Menu