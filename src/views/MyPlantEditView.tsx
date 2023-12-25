import { useState } from "react"
import { Plant } from "../services/db"
import { Card, Container, Stack } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlantWilt } from "@fortawesome/free-solid-svg-icons"
import DecoratedPage from "../components/DecoratedPage"

interface MyPlantEditViewProps {
}

function MyPlantEditView(props: MyPlantEditViewProps) : React.JSX.Element {
    const [getPlant, setPlant] = useState({id: 0, name: "", last_watered: new Date(Date.now()), water_schedule: 7} as Plant)

    return <DecoratedPage>
        <Container className="h-100 pb-3">
            <Stack gap={3}>
                <Card>
                    <div className="d-flex flex-column align-items-center">
                        <FontAwesomeIcon icon={faPlantWilt} />
                    </div>
                </Card>
                <Card>
                    
                </Card>
            </Stack>
        </Container>
    </DecoratedPage>
}

export default MyPlantEditView
export type {MyPlantEditViewProps}