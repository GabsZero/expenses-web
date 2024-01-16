'use client'

export default function SelectComponent({array, label, inputName, required}: any){

  return (
    <>
      <label htmlFor={inputName}>{label}</label>
      <select required={required} id={inputName} className="form-control" name={inputName}>
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