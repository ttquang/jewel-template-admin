import {useParams} from "react-router-dom"

export function Home() {
  const {id} = useParams()

  return (
    <h1>Book {id}</h1>
  )
}