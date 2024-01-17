'use client'

export default function InputAuth({
  fieldValue,
  setFieldValue,
  fieldName,
  label,
}: {
  fieldValue: string
  setFieldValue: (value: string) => void
  fieldName: string,
  label: string,
}) {
  return (
    <div className='flex flex-col gap-y-2'>
      <label className='text-black font-medium' htmlFor={fieldName}>{label}</label>
      <input className='text-black border-black w-full border rounded-md py-2 px-2 caret-black' id={fieldName} type={fieldName} name={fieldName} value={fieldValue} onChange={(e) => setFieldValue(e.target.value)} />
    </div>
  )
}
