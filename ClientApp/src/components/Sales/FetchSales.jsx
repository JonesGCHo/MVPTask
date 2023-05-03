import { useEffect, useState } from 'react';
import CreateSaleModal from './CreateSaleModal';
import DeleteSaleModal from './DeleteSaleModal';
import EditSaleModal from './EditSaleModal';
import { Table, Container } from 'semantic-ui-react';

function FetchSales() {
    const [sales, setSales] = useState([])
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const dateFormat = new Intl.DateTimeFormat("en-AU", {
        dateStyle: "medium",
    })


    useEffect(() => {
        getSales();
    }, [])

    function getSales() {
        fetch('api/sales')
            .then(response => { return response.json() })
            .then(responseJson => {
                setSales(responseJson)
            })
    }

    

    function sqlToJsDate(sqlDate) {
        //sqlDate in SQL DATETIME format ("yyyy-mm-dd hh:mm:ss.ms")
        var sqlDateArr0 = sqlDate.split("T");
        //sqlDate in SQL DATETIME format ("yyyy-mm-dd hh:mm:ss.ms")
        var firstpass = sqlDateArr0[0]
        var sqlDateArr1 = firstpass.split("-");
        //format of sqlDateArr1[] = ['yyyy','mm','dd hh:mm:ms']
        var sYear = sqlDateArr1[0];
        var sMonth = (Number(sqlDateArr1[1]) - 1).toString();
        var sqlDateArr2 = sqlDateArr1[2].split(" ");
        //format of sqlDateArr2[] = ['dd', 'hh:mm:ss.ms']
        var sDay = sqlDateArr2[0];

        const sDate = new Date(sYear, sMonth, sDay);
        return dateFormat.format(sDate)
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
                            <Table.Cell>{sale.productId}</Table.Cell>
                            <Table.Cell>{sale.storeId}</Table.Cell>
                            <Table.Cell>{sale.customerId}</Table.Cell>
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

    function addSale(productid, storeid, customerid, datesold) {
        fetch('api/sales', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json", "Accept": "application/json"
            },
            body: JSON.stringify({ productid: productid, storeid: storeid, customerid: customerid, datesold: datesold })
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
        fetch('api/sales/' + id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json", "Accept": "application/json"
            },
            body: JSON.stringify({ id: id, productId: productid, storeId: storeid, customerId: customerid, dateSold: datesold })
        }).then(() => {
            console.log('sale edited');
        })
    }
}
export default FetchSales;
