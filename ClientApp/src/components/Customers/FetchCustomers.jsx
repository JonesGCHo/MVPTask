import { useEffect, useState } from 'react';
import CreateCustomerModal from './CreateCustomerModal';
import DeleteCustomerModal from './DeleteCustomerModal';
import EditCustomerModal from './EditCustomerModal';
import { Table, Container } from 'semantic-ui-react';

function FetchCustomers() {
    const [customers, setCustomers] = useState([])
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    useEffect(() => {
        getCustomers();
    }, [])

    function getCustomers() {
        fetch('api/customers')
            .then(response => { return response.json() })
            .then(responseJson => {
                setCustomers(responseJson)
            })
    }

    return (
        <Container>
            <div class="ui grid">
                <div class="four wide column">
                    <CreateCustomerModal addCustomer={addCustomer} showCreateModal={showCreateModal} />
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
                            <Table.Cell><EditCustomerModal editCustomer={editCustomer} show={showEditModal} id={customer.id} /></Table.Cell>
                            <Table.Cell><DeleteCustomerModal deleteCustomer={deleteCustomer} show={showDeleteModal} id={customer.id} /></Table.Cell>
                            
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </Container>
    )

    function addCustomer(name, address) {
        fetch('api/customers', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json", "Accept": "application/json"
            },
            body: JSON.stringify({ name: name, address: address })
        }).then(() => {
            console.log('new customer added');
        })
    }

    function deleteCustomer(id) {

        fetch('api/customers/' + id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json", "Accept": "application/json"
            },
            body: JSON.stringify({ id: id})
         }).then(() => {
            console.log('customer deleted' + id);
        })
    }

    function editCustomer(id, name, address) {
        fetch('api/customers/' + id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json", "Accept": "application/json"
            },
            body: JSON.stringify({ id: id, name: name, address: address })
        }).then(() => {
            console.log('dept edited');
        })
    }
}
export default FetchCustomers;

