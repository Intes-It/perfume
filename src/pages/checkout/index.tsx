import BillingInfomation from "@components/checkout/BillingInfomation";
import { Container } from "@components/container";
import { faWindowMaximize } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StepTabs = [
    {
      id: "billing-infomation-tab",
      header: "Détails de Facturation",
      href: "#billing-infomation-tab",
    },
    {
      id: "shipping-details-tab",
      header: "Détails D’expédition",
      href: "#shipping-details-tab",
    },
    {
      id: "your-order-tab",
      header: "Votre Commande",
      href: "#your-order-tab",
    }
  ];

const Checkout: React.FC = () => {
  return (
    <Container>
      <div className="m-20 mt-2">
        <div className="border-t-[3px] border-[#603813] bg-[#F7F6F7] p-5">
          <FontAwesomeIcon
            className="mr-3"
            fontSize={"1.2rem"}
            icon={faWindowMaximize}
          />
          <span>
            Avez-vous un code promo ? Cliquez ici pour saisir votre code
          </span>
        </div>

        {/* tabs */}
        <div className="grid grid-cols-7 items-start mt-7">
          <ul
            className="mr-4 flex list-none flex-col flex-wrap pl-0 col-span-2"
            role="tablist"
            data-te-nav-ref
          >
            {
                StepTabs?.map((item, index)=>(
                <li role="presentation" key={index} className="flex-grow text-center">
                    <a
                        href={item?.href}
                        className="my-[1px] min-w-[100px] block border-x-0 font-semibold rounded-md border-t-0 border-b-2 border-transparent px-7 pt-4 pb-3.5 text-sm  uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent bg-[#B2B2B0] hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:bg-[#603813] data-[te-nav-active]:text-white "
                        data-te-toggle="pill"
                        data-te-target={item?.href}
                        data-te-nav-active={index === 0 ? true : undefined}
                        aria-controls={item?.href}
                        role="tab" 
                        aria-selected={index === 0}
                    >
                        {item?.header}
                    </a>
                </li>
                ))
            }
             
          </ul>
          <div className="my-2 w-full col-span-5">
            <div
              className="hidden opacity-0 opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
              id="billing-infomation-tab"
              role="tabpanel" 
              data-te-tab-active
            >
              <BillingInfomation/>
            </div>
            <div
              className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
              id="shipping-details-tab"
              role="tabpanel" 
            >
              Tab 2 content
            </div>
            <div
              className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
              id="your-order-tab"
              role="tabpanel" 
            >
              Tab 3 content
            </div> 
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Checkout;
