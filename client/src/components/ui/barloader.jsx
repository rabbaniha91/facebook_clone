import BarLoader from "react-spinners/BarLoader";

const BLoader = ({ isLoading }) => {
  const override = {
    display: "block",
    margin: "0 auto",
    boderColor: "#0652dd",
  };

  const color = "#1877f2";

  return (
    <div className="fixed top-0 left-0 z-50 w-full">
      <BarLoader
        loading={isLoading}
        color={color}
        width="100%"
        speedMultiplier={1.3}
        height={8}
        cssOverride={override}
      />
    </div>
  );
};

export default BLoader;
