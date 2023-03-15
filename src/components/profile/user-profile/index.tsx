import useUser from '@hooks/useUser';
import React from 'react';

const UserProfile = () => {
  const { user } = useUser();
  return (
    <div>
      <div className="text-[#603813]">Bonjour <span className='text-[#da2323]'>{user?.name}</span></div>
      <div className="text-[#603813]">
        À partir du tableau de bord de votre compte, vous pouvez visualiser vos commandes récentes,
        gérer vos adresses de livraison et de facturation ainsi que changer votre mot de passe et
        les détails de votre compte.
      </div>
    </div>
  );
};

export default UserProfile;
