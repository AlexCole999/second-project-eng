import React from 'react'
import './Nav.scss'
import { AiFillAccountBook } from "react-icons/ai";

type Props = {}

export default function Nav({ }: Props) {
  return (
    <div className='Nav'>
      <div className="Nav__body">
        <div className="Nav__top">
          <div className="Nav__elem"><AiFillAccountBook size={50} title="1" /></div>
          <div className="Nav__elem"><AiFillAccountBook size={50} title="1" /></div>
          <div className="Nav__elem"><AiFillAccountBook size={50} title="1" /></div>
          <div className="Nav__elem"><AiFillAccountBook size={50} title="1" /></div>
        </div>
        <div className='Nav__bottom'>
          <div className="Nav__elem"><AiFillAccountBook size={50} title="1" /></div>
          <div>Nav</div>
        </div>
      </div>
    </div>
  )
}