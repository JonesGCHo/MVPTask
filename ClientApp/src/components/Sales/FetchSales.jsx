import { useEffect, useState } from 'react';
import CreateSaleModal from './CreateSaleModal';
import DeleteSaleModal from './DeleteSaleModal';
import EditSaleModal from './EditSaleModal';
import { Table, Container } from 'semantic-ui-react';

function FetchSales() {
    const [sales, setSales] = useState([])
    const [stores, setStores] = useState([])
    const [products, setProducts] = useState([])
    const [customers, setCustomers] = useState([])
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const dateFormat = new Intl.DateTimeFormat("en-AU", {
        dateStyle: "medium",
    })


    useEffect(() => {
        getSales();
        getStores();
        getCustomers();
        getProducts();
    }, [])

    function getSales() {
        fetch('api/sales')
            .then(response => { return response.json() })
            .then(responseJson => {
                setSales(responseJson)
            })
    }

    function getStores() {
        fetch('api/stores')
            .then(response => { return response.json() })
            .then(responseJson => {
                setStores(responseJson)
            })
    }

    function getCustomers() {
        fetch('api/customers')
            .then(response => { return response.json() })
            .then(responseJson => {
                setCustomers(responseJson)
            })
    }

    function getProducts() {
        fetch('api/products')
            .then(response => { return response.json() })
            .then(responseJson => {
                setProducts(responseJson)
            })
    }

    function sqlToJsDate(sqlDate) {
        var sqlDateArr0 = sqlDate.split("T");
        var firstpass = sqlDateArr0[0]
        var sqlDateArr1 = firstpass.split("-");
        var sYear = sqlDateArr1[0];
        var sMonth = (Number(sqlDateArr1[1]) - 1).toString();
        var sqlDateArr2 = sqlDateArr1[2].split(" ");
        var sDay = sqlDateArr2[0];
        const sDate = new Date(sYear, sMonth, sDay);
        return dateFormat.format(sDate)
    }

    function inputToSql(date) {
        console.log(date)
        var dateArr = date.split("/");
        var day = dateArr[0]
        var month = dateArr[1]
        var year = dateArr[2]
        var dateString = year + "-" + month + "-" + day
        console.log(dateString)
        return (dateString)
    }

    return (
        <Container>
            <div class="ui grid">
                <div class="four wide column">
                    <CreateSaleModal addSale={addSale} showCreateModal={showCreateModal} />
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
                            <Table.Cell>{getName("customers", sale.customerId)}</Table.Cell>
                            <Table.Cell>{getName("products", sale.productId)}</Table.Cell>
                            <Table.Cell>{getName("stores", sale.storeId)}</Table.Cell>                        
                            <Table.Cell>{sqlToJsDate(sale.dateSold)}</Table.Cell>
                            <Table.Cell><EditSaleModal editSale={editSale} show={showEditModal} id={sale.id} /></Table.Cell>
                            <Table.Cell><DeleteSaleModal deleteSale={deleteSale} show={showDeleteModal} id={sale.id} /></Table.Cell> 
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

    function addSale(productid, customerid, storeid, datesold) {
        var date = inputToSql(datesold)
        fetch('api/sales', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json", "Accept": "application/json"
            },
            body: JSON.stringify({ productId: productid, customerId: customerid, storeId: storeid, dateSold: date })
        }).then(() => {
            console.log('new sale added');
        })
    }

    function deleteSale(id) {

        fetch('api/sales/' + id, {
            method: 'DELETE'
        })
    }

    function editSale(id, productid, storeid, customerid, datesold) {
        var date = inputToSql(datesold)
        fetch('api/sales/' + id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json", "Accept": "application/json"
            },
            body: JSON.stringify({ id: id, productId: productid, storeId: storeid, customerId: customerid, dateSold: date })
        }).then(() => {
            console.log('sale edited');
        })
    }

    function getName(listName, id) {
        let object = null;
        if (id != null) {
            if (listName == "customers") {
                object = customers.find(object => object.id === id);
            }
            else if (listName == "products") {
                object = products.find(object => object.id === id);
            }
            else {
                object = stores.find(object => object.id === id);
            }
        }
        if (object != null) {
            return object.name;
        }
        else {
            return "";
        }
    }
}
export default FetchSales;
