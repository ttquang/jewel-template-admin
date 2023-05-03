import {useParams} from "react-router-dom"

export function BookList() {
  const {id} = useParams()

  return (
    <h1>Book {id}</h1>
  )
}