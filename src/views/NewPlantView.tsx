import { Button, Card, Container, Form, Stack } from "react-bootstrap"
import DecoratedPage from "../components/DecoratedPage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { faPlantWilt } from "@fortawesome/free-solid-svg-icons"
import { db } from "../services/db"
import { useNavigate } from "react-router-dom"

interface NewPlantViewProps {
}

function NewPlantView(props: NewPlantViewProps) : React.JSX.Element {
    const navigate = useNavigate()

    return <DecoratedPage>
        <Container className="h-100 pb-3">
            <Form onSubmit={async (event) => {
                event.preventDefault()
                
                const id = await db.plants.add({
                    name: event.target.name.value,
                    last_watered: new Date(Date.now()),
                    water_schedule: event.target.water_schedule.value
                });

                navigate(`/plant/${id}`)
            }}>
                <Stack gap={3}>
                    <Card>
                        <div className="d-flex flex-row align-items-center" style={{"minHeight": 100}}>
                            <p className="h1 text-center w-100"><FontAwesomeIcon icon={faPlantWilt} /></p>
                        </div>
                    </Card>
                    <Form.Group controlId="name">
                        <Form.Label>Plant Name</Form.Label>
                        <Form.Control type="text" placeholder="Hopper" />
                    </Form.Group>
                    <Form.Group controlId="water_schedule">
                        <Form.Label>Watering Cycle (days)</Form.Label>
                        <Form.Control type="number" placeholder="7" />
                    </Form.Group>
                    <Button type="submit">Create</Button>
                </Stack>
            </Form>
        </Container>
    </DecoratedPage>
}

export default NewPlantView
export type {NewPlantViewProps as MyPlantEditViewProps}