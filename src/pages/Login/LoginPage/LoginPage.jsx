import LoginForm from "../LoginForm/LoginForm";
import React from 'react'
import Layout from "../../../components/layout/layout";
export default function LoginPage() {
  return (
    <div> <Layout children={<LoginForm/>}/></div>
  )
}
