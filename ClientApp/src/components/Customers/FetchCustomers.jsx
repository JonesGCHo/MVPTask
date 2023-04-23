import { useEffect, useState } from 'react';
import CreateCustomerModal from './CreateCustomerModal';
import DeleteCustomerModal from './DeleteCustomerModal';
import EditCustomerModal from './EditCustomerModal';
import { Icon, Table, Button, Container } from 'semantic-ui-react';

function FetchCustomers() {
    const [customers, setCustomers] = useState([])
    const [modalCreate, setModalCreate] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)

    useEffect(() => {
        fetch('api/customers')
            .then(response => { return response.json() })
            .then(responseJson => {
                setCustomers(responseJson)
            })
    }, [])

    return (
        <Container>
            <div class="ui grid">
                <div class="four wide column">
                    <Button primary floated="left" onClick={() => setModalCreate(true)}>Create</Button>
                    <CreateCustomerModal open={modalCreate} onClose={() => setModalCreate(false)}></CreateCustomerModal>
                </div>
            </div>
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell >Customer ID</Table.HeaderCell>
                        <Table.HeaderCell >Name</Table.HeaderCell>
                        <Table.HeaderCell >Address</Table.HeaderCell>
                        <Table.HeaderCell >Action</Table.HeaderCell>
                        <Table.HeaderCell >Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {customers.map(customer =>
                        <Table.Row key={customer.id}>
                            <Table.Cell>{customer.id}</Table.Cell>
                            <Table.Cell>{customer.name}</Table.Cell>
                            <Table.Cell>{customer.address}</Table.Cell>
                            <Table.Cell><Button color='yellow' onClick={() => setModalEdit(true)}><Icon name='external alternate' />Edit</Button></Table.Cell>
                            <EditCustomerModal open={modalEdit} onClose={() => setModalEdit(false)}></EditCustomerModal>
                            <Table.Cell><Button color='red' onClick={() => setModalDelete(true)}><Icon name='trash' />Delete</Button></Table.Cell>
                            <DeleteCustomerModal open={modalDelete} onClose={() => setModalDelete(false)}></DeleteCustomerModal>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </Container>
    )
}
export default FetchCustomers;

