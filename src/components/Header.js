import PropTypes from "prop-types";
import Button from "./Button";
const Header = ({title,onAdd,showAdd}) => {
const color=showAdd?"green":"red";
const text=showAdd?"Add":"Close";
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button color={color} text={text} onClick={onAdd}></Button>
    </header>
  );
};
Header.defaultProps = {
  title: "Task Tracker",
};

Header.propTypes = {
  title: PropTypes.string,
};
export default Header;
