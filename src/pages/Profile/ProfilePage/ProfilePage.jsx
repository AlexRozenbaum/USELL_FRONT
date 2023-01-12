import React from 'react'
import Layout from '../../../components/layout/layout'
import ProfileForm from '../ProfileForm/ProfileForm'

export default function ProfilePage() {
  return (
    <div><Layout children={<ProfileForm/>}/></div>
  )
}
