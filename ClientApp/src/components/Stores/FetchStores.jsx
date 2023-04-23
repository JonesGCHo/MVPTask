import { useEffect, useState } from 'react';
import CreateStoreModal from './CreateStoreModal';
import DeleteStoreModal from './DeleteStoreModal';
import EditStoreModal from './EditStoreModal';
import { Icon, Table, Button, Container } from 'semantic-ui-react';

function FetchStores() {
    const [stores, setStores] = useState([])
    const [modalCreate, setModalCreate] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)

    useEffect(() => {
        fetch('api/stores')
            .then(response => { return response.json() })
            .then(responseJson => {
                setStores(responseJson)
            })
    }, [])

    return (
        <Container>
            <div class="ui grid">
                <div class="four wide column">
                    <Button primary floated="left" onClick={() => setModalCreate(true)}>Create</Button>
                    
                </div>
            </div>
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell >Store ID</Table.HeaderCell>
                        <Table.HeaderCell >Name</Table.HeaderCell>
                        <Table.HeaderCell >Address</Table.HeaderCell>
                        <Table.HeaderCell >Action</Table.HeaderCell>
                        <Table.HeaderCell >Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {stores.map(store =>
                        <Table.Row key={store.id}>
                            <Table.Cell>{store.id}</Table.Cell>
                            <Table.Cell>{store.name}</Table.Cell>
                            <Table.Cell>{store.address}</Table.Cell>
                            <Table.Cell><Button color='yellow' onClick={() => setModalEdit(true)}><Icon name='external alternate' />Edit</Button></Table.Cell>
                            
                            <Table.Cell><Button color='red' onClick={() => setModalDelete(true)}><Icon name='trash' />Delete</Button></Table.Cell>
                            
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </Container>
    )
}
export default FetchStores;


/*<EditStoreModal open={modalEdit} onClose={() => setModalEdit(false)}></EditStoreModal>
<DeleteStoreModal open={modalDelete} onClose={() => setModalDelete(false)}></DeleteStoreModal>
<CreateStoreModal open={modalCreate} onClose={() => setModalCreate(false)}></CreateStoreModal>*/