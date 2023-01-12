import React from 'react'
import Layout from '../../../components/layout/layout'
import AddItemForm from '../AddItemForm/AddItemForm'

export default function AddItemPage() {
  return (
    <div><Layout children={<AddItemForm/>}/></div>
  )
}
