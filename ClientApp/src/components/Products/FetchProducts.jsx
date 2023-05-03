import { useEffect, useState } from 'react';
import CreateProductModal from './CreateProductModal';
import DeleteProductModal from './DeleteProductModal';
import EditProductModal from './EditProductModal';
import { Table, Container } from 'semantic-ui-react';

function FetchProducts() {
    const [products, setProducts] = useState([])
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    useEffect(() => {
        getProducts();
    }, [])

    function getProducts() {
        fetch('api/products')
            .then(response => { return response.json() })
            .then(responseJson => {
                setProducts(responseJson)
            })
    }

    return (
        <Container>
            <div class="ui grid">
                <div class="four wide column">
                    <CreateProductModal addProduct={addProduct} showCreateModal={showCreateModal} />
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
                            <Table.Cell><EditProductModal editProduct={editProduct} show={showEditModal} id={product.id} /></Table.Cell>
                            <Table.Cell><DeleteProductModal deleteProduct={deleteProduct} show={showDeleteModal} id={product.id} /></Table.Cell>

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

    function addProduct(name, price) {
        fetch('api/products', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json", "Accept": "application/json"
            },
            body: JSON.stringify({ name: name, price: price })
        }).then(() => {
            console.log('new product added');
        })
    }

    function deleteProduct(id) {

        fetch('api/products/' + id, {
            method: 'DELETE'
        })
    }

    function editProduct(id, name, price) {
        fetch('api/products/' + id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json", "Accept": "application/json"
            },
            body: JSON.stringify({ id: id, name: name, price: price })
        }).then(() => {
            console.log('product edited');
        })
    }
}
export default FetchProducts;

