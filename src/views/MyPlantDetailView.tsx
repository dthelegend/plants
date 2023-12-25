import { faArrowLeft, faPlantWilt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLiveQuery } from "dexie-react-hooks";
import { Container, Stack, Card, ButtonGroup, Button, DropdownButton, Dropdown } from "react-bootstrap";
import DecoratedPage from "../components/DecoratedPage";
import { db } from "../services/db";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons/faEllipsisVertical";

interface MyPlantDetailViewProps {
}

export async function loader({ params }) {
    return { plantid: +params.plantid };
}

function MyPlantDetailView(props: MyPlantDetailViewProps) : React.JSX.Element {
    const navigate = useNavigate();
    const { plantid } = useLoaderData();

    const plant = useLiveQuery(async () => {
        const plant = await db.plants
          .where('id')
          .equals(plantid)
          .first();
  
        // Return result
        return plant;
    });

    if (!plant) {
        return <></>
    }


    const days_to_next_water = Math.max(0, plant.water_schedule - Math.floor((new Date().getTime() - plant.last_watered.getTime()) / (24 * 60 * 60 * 1000)))

    const water_plant = async () => {
        plant.last_watered = new Date(Date.now())
        await db.plants.put(plant);
    }

    const delete_plant = async () => {
        await db.plants.delete(plant.id);
        navigate("/")
    }

    return <DecoratedPage>
        <Container className="h-100 pb-3">
            <Stack gap={3}>
                <Link to="/"><FontAwesomeIcon icon={faArrowLeft} /> back to plants list</Link>
                <Card>
                    <div className="d-flex flex-row align-items-center" style={{"minHeight": 100}}>
                        <p className="h1 text-center w-100"><FontAwesomeIcon icon={faPlantWilt} /></p>
                    </div>
                </Card>
                <h1>{plant.name}</h1>
                <p className="lead">Needs to be watered every {plant.water_schedule} days</p>
                <p>{days_to_next_water > 0
                    ? <>Will need to be watered in <span className="fw-bold">{days_to_next_water} days</span></>
                    : <>Will need to be watered <span className="fw-bold">today</span></>}
                </p>
                <p className="small">Last watered: {plant.last_watered.toLocaleDateString()}</p>
                <ButtonGroup className="w-100">
                    <Button onClick={water_plant}>Water this plant</Button>
                    <DropdownButton
                        as={ButtonGroup} title={undefined}              
                    >
                        <Dropdown.Item className="text-danger" onClick={delete_plant}>Delete this plant</Dropdown.Item>
                    </DropdownButton>
                </ButtonGroup>
            </Stack>
        </Container>
    </DecoratedPage>
}

export default MyPlantDetailView
export type {MyPlantDetailViewProps}