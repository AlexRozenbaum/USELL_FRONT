import React from 'react'
import Layout from '../../../components/layout/layout'
import MyItemsForm from '../MyItemsForm/MyItemsForm'

export default function MyItemsPage() {
  return (
    <div>
        <div>{<Layout children={<MyItemsForm/>} />}</div>
    </div>
  )
}
