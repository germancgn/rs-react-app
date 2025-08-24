import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { GenderFemale, GenderMale, MapPin, SignOut } from './Icon';
import { useTranslations } from 'next-intl';

type ProfileButtonProps = {
  profileData: {
    name: string;
    age: number;
    email: string;
    password: string;
    repeatPassword: string;
    gender: string;
    acceptTerms: boolean;
    picture: string;
    country: string;
  };
  onLogout: () => void;
};

export default function ProfileButton({
  profileData,
  onLogout,
}: ProfileButtonProps) {
  const t = useTranslations('Forms');
  const [showMenu, setShowMenu] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setShowMenu((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={buttonRef}>
      <button className="profile-button" onClick={toggleMenu}>
        <div>{profileData.name}</div>
        <div>
          <Image
            src={profileData.picture}
            width={24}
            height={24}
            alt="Profile picture"
            className="object-cover w-[24px] h-[24px] rounded-full"
          />
        </div>
      </button>
      <div
        className={`profile-menu ${
          showMenu
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="flex gap-4">
          <Image
            src={profileData.picture}
            alt="Profile picture"
            width={64}
            height={64}
            className="object-cover w-[64px] h-[64px] rounded-full"
          />

          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <div className="flex gap-1">
                <h3 className="font-semibold">{profileData.name}</h3>
                <div className="flex items-center gap-1 hover:bg-white/10 px-1 rounded cursor-pointer">
                  {profileData.gender === 'male' && (
                    <GenderMale
                      size={20}
                      className="fill-sky-400 hover:fill-sky-300 cursor-pointer"
                    />
                  )}
                  {profileData.gender === 'female' && (
                    <GenderFemale
                      size={20}
                      className="fill-pink-400 hover:fill-pink-300 cursor-pointer"
                    />
                  )}
                  <span className="block">{profileData.age}</span>
                </div>
              </div>
              <div className="text-sm text-gray-400">{profileData.email}</div>
            </div>
            <div className="flex items-center text-sm text-gray-400 gap-1">
              <MapPin size={20} /> {t(profileData.country)}
            </div>
          </div>
        </div>
        <div>
          <div className="text-gray-400 hover:text-gray-200 cursor-pointer py-1 px-2 bg-white/5 hover:bg-white/10 rounded select-none text-sm">
            <button
              className="flex items-center gap-2 cursor-pointer"
              onClick={onLogout}
            >
              <span>
                <SignOut />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
