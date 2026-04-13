import React from 'react'
import { Link } from 'react-router-dom'
import { 
  FacebookLogo, 
  TwitterLogo, 
  LinkedinLogo, 
  GithubLogo, 
  GitBranch, 
  WhatsappLogo 
} from 'phosphor-react'

const SocialIcons = () => {
  return (
    <div className='flex items-center gap-3 mt-5 ml-1 mb-2 max-md:mt-4'>
      <Link 
        target='_blank' 
        to='https://www.facebook.com/profile.php?id=61577638139845'
        className="group transition transform hover:scale-110 text-[#0b16f1] hover:text-blue-500"
      >
        <FacebookLogo size={34} weight="fill" className="transition-colors duration-300" />
      </Link>
      
      <Link 
        target='_blank' 
        to='https://www.linkedin.com/in/shahariar-dev'
        className="group transition transform hover:scale-110 text-[#1e17ea] hover:text-blue-600"
      >
        <LinkedinLogo size={34} weight="fill" className="transition-colors duration-300" />
      </Link>
      <Link 
        target='_blank' 
        to='https://github.com/shahariarshawon'
        className="group transition transform hover:scale-110 text-[#c2baba] hover:text-gray-500"
      >
        <GithubLogo size={34} weight="fill" className="transition-colors duration-300" />
      </Link>
      
      <Link 
        target='_blank' 
        to='https://wa.me/+8801518935876'
        className="group transition transform hover:scale-110 text-[#0fc865] hover:text-green-500"
      >
        <WhatsappLogo size={34} weight="fill" className="transition-colors duration-300" />
      </Link>
    </div>
  )
}

export default SocialIcons
