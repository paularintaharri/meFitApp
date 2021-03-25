import './ExercisePage.css';
import { useState, useEffect } from "react";
import { Button, Form, Container, ButtonGroup, Col } from "react-bootstrap";
import CreateExercise from '../components/Exercise/CreateExercise';
import ExerciseList from '../components/Exercise/ExerciseList';
import UpdateExercise from '../components/Exercise/UpdateExercise';
import { getAllExercises } from '../utils/exerciseAPI'

function ExercisePage() {
    const [modalExerciseCreate, setModalExerciseCreate] = useState(false);
    const [modalExerciseUpdate, setModalExerciseUpdate] = useState(false);
    const [exercises, setExercises] = useState([]);
    const [selectedexercise, setSelectedExercise] = useState();
    const [isLoading, setIsLoading] = useState(true);

    function handleChange(newValue) {
        setSelectedExercise(exercises[newValue])
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const item = await getAllExercises();
                return item;
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData().then(exercises => {
            setExercises(exercises);
            setIsLoading(false);
        })
    }, []);

    useEffect(() => {
        if (exercises) {
            setSelectedExercise(exercises[0])
        }
    }, [exercises])

    return (
        <Container className="bd-content ps-lg-4">
            {isLoading && <p>loading</p>}
            {exercises.length !== 0 && (
                <div>
                    <h1>Exercises</h1>
                    <ExerciseList exercises={exercises} />
                    <ButtonGroup className="mb-2 mr-2" aria-label="Update Exercise">
                        <Button
                            type="button"
                            className="btn btn-primary"
                            variant="primary"
                            onClick={() => setModalExerciseCreate(true)}>
                            Create New Exercise
                            </Button>
                        <CreateExercise
                            show={modalExerciseCreate}
                            onHide={() => setModalExerciseCreate(false)} />
                    </ButtonGroup>
                </div>
            )}
            { selectedexercise != null &&
                <div className="nav justify-content-center">
                    <Form.Row className="align-items-center">
                        <Col xs="auto" className="my-1">
                            <Form.Control
                                onChange={(e) => handleChange(e.target.value)}
                                as="select" className="mr-sm-2" custom>
                                {exercises.map((exercise, index) =>
                                    <option key={index} value={index}>
                                        {exercise.id}: {exercise.name}
                                    </option>)}
                            </Form.Control>
                        </Col>
                        <Col xs="auto" className="my-1">
                            <Button type="submit" onClick={() => setModalExerciseUpdate(true)}>Update Selected Exercise
                                </Button>
                            <UpdateExercise show={modalExerciseUpdate} onHide={() => setModalExerciseUpdate(false)}
                                selectedexercise={selectedexercise} />
                        </Col>
                    </Form.Row>
                </div>
            }
        </Container>
    );
};

export default ExercisePage;