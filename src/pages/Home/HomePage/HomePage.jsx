import React from 'react'
import Layout from '../../../components/layout/layout'
import HomeForm from '../HomeForm/HomeForm'

export default function HomePage() {
  return (
    <div>{<Layout children={<HomeForm />} />}</div>
  )
}
