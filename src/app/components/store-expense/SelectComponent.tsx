'use client'

export default function SelectComponent({array, label}: any){

  return (
    <>
      <label htmlFor={label}>{label}</label>
      <select id={label} className="form-control" name={label}>
        <option>Selecione</option>
        {
          array ?
            array.map(item => {
              return <option key={item.id} value={item.id}>{item.name}</option>
            }) 
            : "carregando"
        }
      </select>
    </>
  )
}