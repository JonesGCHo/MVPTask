import { useEffect, useState } from 'react';
import CreateProductModal from './CreateProductModal';
import DeleteProductModal from './DeleteProductModal';
import EditProductModal from './EditProductModal';
import { Icon, Table, Button, Container } from 'semantic-ui-react';

function FetchProducts() {
    const [products, setProducts] = useState([])
    const [modalCreate, setModalCreate] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)

    useEffect(() => {
        fetch('api/products')
            .then(response => { return response.json() })
            .then(responseJson => {
                setProducts(responseJson)
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
                        <Table.HeaderCell >Product ID</Table.HeaderCell>
                        <Table.HeaderCell >Name</Table.HeaderCell>
                        <Table.HeaderCell >Price</Table.HeaderCell>
                        <Table.HeaderCell >Action</Table.HeaderCell>
                        <Table.HeaderCell >Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {products.map(product =>
                        <Table.Row key={product.id}>
                            <Table.Cell>{product.id}</Table.Cell>
                            <Table.Cell>{product.name}</Table.Cell>
                            <Table.Cell>{product.price}</Table.Cell>
                            <Table.Cell><Button color='yellow' onClick={() => setModalEdit(true)}><Icon name='external alternate' />Edit</Button></Table.Cell>

                            <Table.Cell><Button color='red' onClick={() => setModalDelete(true)}><Icon name='trash' />Delete</Button></Table.Cell>

                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </Container>
    )
}
export default FetchProducts;


/*<EditProductModal open={modalEdit} onClose={() => setModalEdit(false)}></EditProductModal>
<DeleteProductModal open={modalDelete} onClose={() => setModalDelete(false)}></DeleteProductModal>
<CreateProductModal open={modalCreate} onClose={() => setModalCreate(false)}></CreateProductModal>*/