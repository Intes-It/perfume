import useUser from "@hooks/useUser";

const UserProfile = ({ setTabs }: { setTabs: (value: number) => void }) => {
  const { user } = useUser();
  return (
    <div>
      <div className="text-[#603813]">
        Bonjour <span className="text-[#da2323] font-bold">{user?.name}</span>
      </div>
      <div className="text-[#603813]">
        À partir du tableau de bord de votre compte, vous pouvez visualiser vos
        <span
          className="text-[#da2323] cursor-pointer"
          onClick={() => setTabs(1)}
        >
          {" "}
          commandes récentes
        </span>
        , gérer vos{" "}
        <span
          className="text-[#da2323] cursor-pointer"
          onClick={() => setTabs(3)}
        >
          {" "}
          adresses de livraison et de facturation
        </span>{" "}
        ainsi que{" "}
        <span
          className="text-[#da2323] cursor-pointer"
          onClick={() => setTabs(5)}
        >
          changer votre mot de passe et les détails de votre compte.
        </span>
      </div>
    </div>
  );
};

export default UserProfile;
