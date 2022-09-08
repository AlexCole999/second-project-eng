import React from 'react'
import './Statistics.scss'
import BaseStatistics from './BaseStatistics/BaseStatistics';
import GamesStatistics from './GamesStatistics/GamesStatistics';

type Props = {}

export default function Statistics({ }: Props) {



  return (

    <div className='Statistics'>

      <BaseStatistics />

      <GamesStatistics />

    </div>

  )

}