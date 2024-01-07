import FadeLoader from 'react-spinners/FadeLoader';

const Floader = ({ isLoading }) => {
  const override = {
    display: "block",
    margin: "0 auto",
    boderColor: "#f659dd",
    zIndex: "999"
  };

  const color = "#a87702";

  return (
    <div className="fixed top-[45%] left-[24%] w-full">
      <FadeLoader
        loading={isLoading}
        color={color}
        width="100%"
        speedMultiplier={1}
        height={8}
        cssOverride={override}
      />
    </div>
  );
};

export default Floader;