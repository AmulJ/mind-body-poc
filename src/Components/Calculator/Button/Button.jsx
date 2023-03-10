import "./Button.css";

const Button = ({ text, resetClickHandler,  percentClickHandler, equalsClickHandler, signClickHandler, numClickHandler, dotClickHandler}) => {
  return (
    <button
      className="calculator-button"
      onClick={
        text === "C"
      ? resetClickHandler
      : text === "%"
      ? percentClickHandler
      : text === "="
      ? equalsClickHandler
      : text === "/" || text === "x" || text === "-" || text === "+"
      ? ()=>signClickHandler(text)
      : text === "."
      ? dotClickHandler
      : ()=>numClickHandler(text)
      }
    >
      {text}
    </button>
  );
};

export default Button;