import { useEffect, useState } from 'react';
import CreateSaleModal from './CreateSaleModal';
import DeleteSaleModal from './DeleteSaleModal';
import EditSaleModal from './EditSaleModal';
import { Icon, Table, Button, Container } from 'semantic-ui-react';

function FetchSales() {
    const [sales, setSales] = useState([])
    const [modalCreate, setModalCreate] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)

    useEffect(() => {
        fetch('api/stores')
            .then(response => { return response.json() })
            .then(responseJson => {
                setSales(responseJson)
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
                        <Table.HeaderCell >Customer</Table.HeaderCell>
                        <Table.HeaderCell >Product</Table.HeaderCell>
                        <Table.HeaderCell >Store</Table.HeaderCell>
                        <Table.HeaderCell >Date Sold</Table.HeaderCell>
                        <Table.HeaderCell >Action</Table.HeaderCell>
                        <Table.HeaderCell >Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {sales.map(sale =>
                        <Table.Row key={sale.id}>
                            <Table.Cell>{sale.productid}</Table.Cell>
                            <Table.Cell>{sale.storeid}</Table.Cell>
                            <Table.Cell>{sale.customerid}</Table.Cell>
                            <Table.Cell>{sale.datesold}</Table.Cell>
                            <Table.Cell><Button color='yellow' onClick={() => setModalEdit(true)}><Icon name='external alternate' />Edit</Button></Table.Cell>

                            <Table.Cell><Button color='red' onClick={() => setModalDelete(true)}><Icon name='trash' />Delete</Button></Table.Cell>

                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </Container>
    )
}
export default FetchSales;


/*<EditSaleModal open={modalEdit} onClose={() => setModalEdit(false)}></EditSaleModal>
<DeleteSaleModal open={modalDelete} onClose={() => setModalDelete(false)}></DeleteSaleModal>
<CreateSaleModal open={modalCreate} onClose={() => setModalCreate(false)}></CreateSaleModal>*/