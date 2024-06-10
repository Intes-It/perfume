import { Container } from "@components/container";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
const Success: React.FC = () => {
  const router = useRouter();
  // useEffect(() => {
  //
  //   GET(api.successOrder)
  //
  // }, []);
  // async function getSuccess(){
  //   await GET(api.successOrder)
  // }
  // const {data}=useQuery('get-success',getSuccess,{
  //   refetchOmount:true
  // })
  return (
    <Container>
      <div className="grid p-5 mx-auto ">
        <div className="mx-auto mb-5 w-[70px] h-[70px] flex justify-center items-center rounded-full border border-black bg-[#1f9163]">
          <FontAwesomeIcon color="white" fontSize={"1.5rem"} icon={faCheck} />
        </div>
        <span className="mb-1 text-center text-[22px]   ">Payment Done!</span>
        <span className="mb-1 text-center ">
          Thank you for completing your secure online payment
        </span>
        <span className="mb-1 text-center ">Have a great day!</span>
        <button
          className="p-2  rounded-md border border-black bg-[#1f9163]"
          onClick={() => router.push("/my-account?page=1")}
        >
          Go to My order
        </button>
      </div>
    </Container>
  );
};

export default Success;
