import useLocale from "@hooks/useLocale";
import useUser from "@hooks/useUser";

const UserProfile = ({ setTabs }: { setTabs: (value: number) => void }) => {
  const { user } = useUser();
  const text = useLocale();
  return (
    <div>
      <div className="text-[#603813]">
        {text.accountScreen.bonjour}{" "}
        <span className="font-bold text-black">{user?.username}</span>
      </div>
      <div className="text-[#603813]">
        {text.accountScreen.aPartir[0]}
        <span
          className="text-[#da2323] cursor-pointer"
          onClick={() => setTabs(1)}
        >
          {" "}
          {text.accountScreen.aPartir[1]}
        </span>
        {text.accountScreen.aPartir[2]}{" "}
        <span
          className="text-[#da2323] cursor-pointer"
          onClick={() => setTabs(3)}
        >
          {" "}
          {text.accountScreen.aPartir[3]}
        </span>{" "}
        {text.accountScreen.aPartir[4]}{" "}
        <span
          className="text-[#da2323] cursor-pointer"
          onClick={() => setTabs(5)}
        >
          {text.accountScreen.aPartir[5]}
        </span>
      </div>
    </div>
  );
};

export default UserProfile;
