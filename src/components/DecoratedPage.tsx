import { Container, Navbar } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeaf } from '@fortawesome/free-solid-svg-icons'

interface DecoratedPageProps {
    children: React.JSX.Element | React.JSX.Element[]
}

function DecoratedPage(props: DecoratedPageProps) : React.JSX.Element {
    return <div className="h-100 d-flex flex-column flex-nowrap align-items-stretch">
        <Navbar>
            <Container>
                <Navbar.Brand href="/">
                <FontAwesomeIcon icon={faLeaf} /> Mama's Plants
                </Navbar.Brand>
            </Container>
        </Navbar>
        <div className="flex-grow-1">
            {props.children}
        </div>
    </div>
}

export default DecoratedPage
export type {DecoratedPageProps}