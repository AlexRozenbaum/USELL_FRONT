import React from 'react'
import Layout from '../../../components/layout/layout'
import ChangePasswordForm from '../ChangePasswordForm/ChangePasswordForm'

export default function ChangePasswordPage() {
  return (
    <div>{<Layout children={<ChangePasswordForm/>} />}</div>
  )
}
