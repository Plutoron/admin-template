import React, { useState, useEffect } from 'react'
import Intro from './intro'
import Group from './group'

function About() {
  return (
    <>
      <div className="">
        <Intro />
        
        <Group />

        <div>
          <div>企业文化</div>
          <div></div>
        </div>
      </div>
    </>
  )
}

export default About