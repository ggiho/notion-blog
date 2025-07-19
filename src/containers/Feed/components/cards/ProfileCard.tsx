import CONFIG from "site.config"
import Image from "next/image"
import React from "react"

type Props = {
  className?: string
}

const ProfileCard: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <div className="mb-6">
        <h3 className="text-sm font-black uppercase tracking-wider text-neutral-500 dark:text-neutral-400">About Me</h3>
      </div>
      <div className="group relative w-full rounded-3xl bg-white dark:bg-neutral-900 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-amber-100/50 dark:hover:shadow-amber-900/20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-transparent to-orange-50/50 dark:from-amber-900/10 dark:to-orange-900/10" />
        
        <div className="relative p-6">
          {/* Profile Image */}
          <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-amber-100 dark:ring-amber-900/30 group-hover:ring-amber-200 dark:group-hover:ring-amber-800/50 transition-all duration-300">
            <Image 
              src={CONFIG.profile.image} 
              fill 
              alt={CONFIG.profile.name}
              className="object-cover"
            />
          </div>
          
          {/* Profile Info */}
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-black text-neutral-900 dark:text-neutral-100">
              {CONFIG.profile.name}
            </h2>
            <p className="text-sm font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              {CONFIG.profile.role}
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xs mx-auto">
              {CONFIG.profile.bio}
            </p>
          </div>
        </div>
        
        {/* Bottom accent */}
        <div className="h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400" />
      </div>
    </div>
  )
}

export default ProfileCard
