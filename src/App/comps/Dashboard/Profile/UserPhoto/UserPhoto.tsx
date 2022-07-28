import React from 'react'
import './UserPhoto.scss'
import { FiUserX } from 'react-icons/fi';
import { useSelector } from 'react-redux';
type Props = {}

export default function UserPhoto({ }: Props) {

  const userdata = useSelector(state => state.user?.data)

  return (

    <div>
      {
        userdata?.photoURL
          ? <img src={userdata?.photoURL}></img>
          : <FiUserX className='Profile__userNoPhotoIcon' size={215} />
      }
    </div>

  )

}