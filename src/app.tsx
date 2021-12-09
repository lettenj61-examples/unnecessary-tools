import Nano from "nano-jsx";

const Greet = (props: { name: string }): Element => <h1>Hello, {props.name}</h1>;

Nano.render(<Greet name="you" />, document.getElementById("app"));
