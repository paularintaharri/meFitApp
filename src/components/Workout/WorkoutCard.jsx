import { Button, Card, Row, Col, ButtonGroup, Accordion } from "react-bootstrap";
import WorkoutDetail from "./WorkoutDetail";

function WorkoutCard() {

    const type = "Cardio";
    const name = "15 min Beginner Cardio";

    return (

        <Accordion defaultActiveKey="0">
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                    <Row>
                        <Col>
                            <p>Workout: {name}</p>
                        </Col>
                        <Col>
                            <p>Type: {type}</p>
                        </Col>
                        <Col>
                            <ButtonGroup className="mb-2 mr-2" aria-label="Show details">
                                <Button type="button" >Show details</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                    <WorkoutDetail />
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
};

export default WorkoutCard;