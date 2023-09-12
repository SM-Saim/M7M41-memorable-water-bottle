import PropTypes from "prop-types";
import "./Bottle.css";
const Bottle = ({ bottle, handleBottle }) => {
  const { name, img, price } = bottle;
  return (
    <div className="bottleStyle">
      <h3>Name: {name}</h3>
      <img className="" src={img} alt="" />
      <p>Price: {price} </p>
      <button onClick={() => handleBottle(bottle)}>Purchase</button>
    </div>
  );
};
Bottle.propTypes = {
  bottle: PropTypes.object.isRequired,
  handleBottle: PropTypes.func.isRequired,
};

export default Bottle;
