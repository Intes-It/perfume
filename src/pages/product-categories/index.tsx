export default function index() {
    return null;
  }
  
  export const getServerSideProps = ({ resolvedUrl }: { resolvedUrl: string }) => {
    return {
      redirect: {
        destination: `${resolvedUrl}/cosmetics`,
        permanent: false,
      },
    };
  };
  