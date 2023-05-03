import { useEffect, useState } from 'react';
import CreateStoreModal from './CreateStoreModal';
import DeleteStoreModal from './DeleteStoreModal';
import EditStoreModal from './EditStoreModal';
import { Table, Container } from 'semantic-ui-react';

function FetchStores() {
    const [stores, setStores] = useState([])
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    useEffect(() => {
        getStores();
    }, [])

    function getStores() {
        fetch('api/stores')
            .then(response => { return response.json() })
            .then(responseJson => {
                setStores(responseJson)
            })
    }

    return (
        <Container>
            <div class="ui grid">
                <div class="four wide column">
                    <CreateStoreModal addStore={addStore} showCreateModal={showCreateModal} />
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
                            <Table.Cell><EditStoreModal editStore={editStore} show={showEditModal} id={store.id} /></Table.Cell>
                            <Table.Cell><DeleteStoreModal deleteStore={deleteStore} show={showDeleteModal} id={store.id} /></Table.Cell>

                        </Table.Row>
                    )}
                </Table.Body>
            </Table>

            <div class="right floated ui pagination menu">
                <a class="active item">
                    1
                </a>
            </div>
        </Container>
    )

    function addStore(name, address) {
        fetch('api/stores', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json", "Accept": "application/json"
            },
            body: JSON.stringify({ name: name, address: address })
        }).then(() => {
            console.log('new store added');
        })
    }

    function deleteStore(id) {

        fetch('api/stores/' + id, {
            method: 'DELETE'
        })
    }

    function editStore(id, name, address) {
        fetch('api/stores/' + id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json", "Accept": "application/json"
            },
            body: JSON.stringify({ id: id, name: name, address: address })
        }).then(() => {
            console.log('store edited');
        })
    }
}
export default FetchStores;

