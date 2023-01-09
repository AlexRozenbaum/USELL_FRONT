
import React from 'react'
import Layout from '../../../components/layout/layout'
import  RegistrationForm from '../RegistrationForm/RegistrationForm'

export default function RegistrationPage() {
  return (
    <div>{<Layout children={<RegistrationForm />} />}</div>
  )
}
