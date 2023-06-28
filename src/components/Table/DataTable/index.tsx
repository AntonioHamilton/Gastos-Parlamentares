import styles from './styles.module.scss'

type DataTableProps = {
  headers: string[],
  data: Record<string, string | number | null >[]
}

const DataTable = ({headers, data}: DataTableProps) => (
  <div className={styles["data-table-container"]}>
    <table>
      <thead>
        <tr>
          {headers.map((item) => (
            <th key={item}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {Object.values(item).map((itemValue, itemIndex) => (
                <td key={itemIndex}>{itemValue}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default DataTable