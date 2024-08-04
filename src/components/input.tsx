const Input = (
  { id, type, placeholder, required }:
  { id?: string, type?: string, placeholder?: string, required?: boolean }
) => {
  return (
    <input
      id={id}
      name={id}
      type={type}
      placeholder={placeholder}
      class='p-1 border-2 bg-seagull-200 border-seagull-200 hover:bg-seagull-100 text-seagull-800 font-bold hover:border-seagull-100 hover:cursor-pointer focus:cursor-text focus:bg-white focus:text-slate-950 focus:border-seagull-500 rounded outline-none transition-all'
      required={required}
    />
  )
}

export default Input