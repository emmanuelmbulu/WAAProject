import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CountDown from "./countDown";

function ContainerExample() {
  return (
    <Card style={{ width: "100%", height: "70px" }}>
      <Card.Img
        variant="top"
        src={props.picture ? props.picture : "noImage.jpg"}
      />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          <CountDown time={props.currentDateTime} />
        </Card.Text>
        <Button variant="primary" size="sm" style={{ width: "100%" }}>
          Bid
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ContainerExample;
