import React from 'react'
import Layout from '../../../components/layout/layout'
import MyLotListForm from '../MyLotListForm/MyLotListForm'


export default function MyLotListPage() {
  return (
    <div>{<Layout children={<MyLotListForm />} />}</div>
  )
}
