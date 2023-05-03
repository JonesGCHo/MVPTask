import './../App.css';
import ReactDOM from 'react-dom'
import { Button, Icon, Dropdown } from 'semantic-ui-react'
import { useState, useEffect } from 'react';

function CreateSaleModal(props) {
    const [customer, setCustomers] = useState([]);
    const [product, setProducts] = useState([]);
    const [store, setStores] = useState([]);
    const [productid, setProductId] = useState("");
    const [storeid, setStoreId] = useState("");
    const [customerid, setCustomerId] = useState("");
    const [datesold, setDateSold] = useState("");
    const [show, setShow] = useState(props.showCreateModal)

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    useEffect(() => {
        fetch('api/customers')
            .then((response) => response.json())
            .then((responseJson) =>
                setCustomers(responseJson.map((customer) => {
                    return { text: customer.name, value: customer.id }
                })
                )
            );
    }, [])
    useEffect(() => {
        fetch('api/products')
            .then((response) => response.json())
            .then((responseJson) =>
                setProducts(responseJson.map((product) => {
                    return { text: product.name, value: product.id }
                })
                )
            );
    }, [])
    useEffect(() => {
        fetch('api/stores')
            .then((response) => response.json())
            .then((responseJson) =>
                setStores(responseJson.map((store) => {
                    return { text: store.name, value: store.id }
                })
                )
            );
    }, [])

    function handleSave() {
        props.addSale(productid, storeid, customerid, datesold);
    }

    if (!show) {
        return (<Button primary floated="left" onClick={handleOpen}>Create</Button>)
    }

    return ReactDOM.createPortal(
        <>
            <div className="modalOverlayStyle" />
            <div className="modalStyle">

                <form class="ui form">
                    <div class="field">
                        <label>Date Sold</label>
                        <input type="text" name="datesold" value={datesold} onChange={(e) => { setDateSold(e.target.value) }} />
                    </div>
                    <div class="field">
                        <label>Customer</label>
                        <Dropdown
                            placeholder="Customer"
                            fluid
                            selection
                            options={customer}
                            onChange={(e) => setCustomerId(e.target.value)}
                        />
                    </div>
                    <div class="field">
                        <label>Product</label>
                        <Dropdown
                            placeholder="Product"
                            fluid
                            selection
                            options={product}
                            onChange={(e) => setProductId(e.target.value)}
                        />
                    </div>
                    <div class="field">
                        <label>Store</label>
                        <Dropdown
                            placeholder="Store"
                            fluid
                            selection
                            options={store}
                            onChange={(e) => setStoreId(e.target.value)}
                        />
                    </div>
                    <button class="right floated positive ui right labeled icon button" onClick={handleSave}><Icon name='check icon' />Create</button>
                    <button class="ui black right floated button" onClick={handleClose}>Close</button>
                </form>
            </div>

        </>,
        document.getElementById('portal')
    );
}

export default CreateSaleModal;