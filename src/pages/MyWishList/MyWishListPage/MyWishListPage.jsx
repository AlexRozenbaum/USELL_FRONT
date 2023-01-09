import React from 'react'
import Layout from '../../../components/layout/layout'
import MyWishListForm from '../MyWishListForm/MyWishListForm'

export default function MyWishListPage() {
  return (
    <div>{<Layout children={<MyWishListForm />} />}</div>
  )
}
