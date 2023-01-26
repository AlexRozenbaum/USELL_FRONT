import React from 'react'
import Layout from '../../../components/layout/layout'
import SingleItemForm from '../SingleItemForm/SingleItemForm'
export default function SingleItemPage() {
  return (
    <div><Layout children={<SingleItemForm/>}/></div>
  )
}
