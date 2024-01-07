import React from 'react'
import { Link } from 'react-router-dom'

const ProfileMenu = () => {
  return (
    <div className=' flex justify-center overflow-hidden'>
        <div className=' flex justify-start md:text-lg text-[13px] space-x-1 md:space-x-3 
        text-gray-600 font-semibold pt-3'>
            <Link className='p-1 text-blue-600 border-b-blue-700 border-b-2' to="/posts" >Posts</Link>
            <Link className='p-1' to="/about" >About</Link>
            <Link className='p-1' to="/friends" >Friends</Link>
            <Link className='p-1' to="/photos" >Photos</Link>
            <Link className='p-1' to="/videos" >Videos</Link>
            <Link className='p-1' to="/check-Ins" >Check-Ins</Link>
            <Link className='p-1' to="/more" >More</Link>
        </div>
    </div>
  )
}

export default ProfileMenu