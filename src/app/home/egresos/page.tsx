const is_valid_operators = ['+', '-', '*', '/']
export default function Egresos() {

  if (is_valid_operators) {
    throw new Error('Error, operation not allowed')
  }

  return (
    <div>
      Egresos
    </div>
  )
}