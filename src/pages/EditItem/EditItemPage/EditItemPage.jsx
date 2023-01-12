import React from 'react'
import Layout from '../../../components/layout/layout'
import EditItemForm from '../EditItemForm/EditItemForm'

export default function EditItemPage() {
  return (
    <div><Layout children={<EditItemForm/>}/></div>
  )
}
