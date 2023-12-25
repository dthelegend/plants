import { Button, Card, Container, Stack } from "react-bootstrap"
import DecoratedPage from "../components/DecoratedPage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlantWilt, faPlus } from "@fortawesome/free-solid-svg-icons"
import { Link, useLoaderData, useNavigate } from "react-router-dom"
import { db } from "../services/db"
import { useLiveQuery } from "dexie-react-hooks"
import React from "react"

interface MyPlantsViewProps {
}

function MyPlantsView(props: MyPlantsViewProps) : React.JSX.Element {
    const plant_list = useLiveQuery(async () => {
        const plants = await db.plants
          .toArray();
  
        // Return result
        return plants;
    });

    const navigate = useNavigate()

    return <DecoratedPage>
        <Container className="h-100 pb-3">
            <Stack gap={3} className="d-flex flex-column h-100">
                <Stack gap={3} className="overflow-scroll flex-grow-1 overflow-scroll">
                    {plant_list?.map(plant =>
                        <React.Fragment key={plant.id}>
                            <Link to={`/plant/${plant.id}`}>
                                <Card>
                                    <div className="d-flex flex-row align-items-center" style={{"minHeight": 100}}>
                                        <p className="h1 text-center w-100"><FontAwesomeIcon icon={faPlantWilt} /></p>
                                    </div>
                                    <Card.Footer>
                                        {plant.name}
                                    </Card.Footer>
                                </Card>
                            </Link>
                        </React.Fragment>)}
                </Stack>
                <Button onClick={() => navigate("/plant/new")}><FontAwesomeIcon icon={faPlus} /> Add new plant</Button>
            </Stack>
        </Container>
    </DecoratedPage>
}

export default MyPlantsView
export type {MyPlantsViewProps as MyPlantsProps}