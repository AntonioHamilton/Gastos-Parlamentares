import styles from './styles.module.scss'

type MenuProps = {
  setMenuState: (name: string) => void
  menuState: string
}

const menuProperties = [
  {name: 'Dados', icon: ''},
  {name: 'Gastos totais', icon: ''},
  {name: 'Tipos de Gastos', icon: ''},
  {name: 'Parlamentares que mais gastam', icon: ''},

]

const Menu = ({setMenuState, menuState,}: MenuProps) => {

  const clickButton = (name: string) => {
    setMenuState(name)
  }

  return (
    <div className={styles["menu-container"]}>
      <h1>GP</h1>
      {menuProperties.map((item) => {
        const clicked = item.name === menuState
        return (
          <button
            className={styles[`menu-container__button${clicked ? '-active': ''}`]}
            onClick={() => clickButton(item.name)} 
            key={item.name}
          >
            {item.icon} {item.name}
          </button>
        )
      })}
    </div>
  )
}

export default Menu