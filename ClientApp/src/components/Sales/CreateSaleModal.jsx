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

    let handleStoreSelect = (e) => {
        setStoreId(e.target.value)
    }
    let handleProductSelect = (e) => {
        setProductId(e.target.value)
    }
    let handleCustomerSelect = (e) => {
        setCustomerId(e.target.value)
    }

    function handleSave() {
        props.addSale(productid, customerid, storeid, datesold);
    }

    if (!show) {
        return (<Button primary floated="left" onClick={handleOpen}>Create</Button>)
    }

    return ReactDOM.createPortal(
        <>
            <div className="modalOverlayStyle" />
            <div className="modalStyle">

                <div>
                    <h2>Create Sale</h2>
                    <br></br>
                </div>

                <form class="ui form">
                    <div class="field">
                        <label>Date Sold</label>
                        <input type="text" name="datesold" value={datesold} onChange={(e) => { setDateSold(e.target.value) }} placeholder="dd/mm/yyyy"/>
                    </div>
                    <div class="field">
                        <label>Customer</label>
                        <select value={customerid} onChange={handleCustomerSelect}>
                            <option disabled={true} value="">
                                --Choose a Customer--
                            </option>
                            {customer.map((item) => <option key={item.value} value={item.value}>{item.text}</option>)}
                        </select>
                    </div>
                    <div class="field">
                        <label>Product</label>
                        <select value={productid} onChange={handleProductSelect}>
                            <option disabled={true} value="">
                                --Choose a Product--
                            </option>
                            {product.map((item) => <option key={item.value} value={item.value}>{item.text}</option>)}
                        </select>
                    </div>
                    <div class="field">
                        <label>Store</label>
                        <select value={storeid} onChange={handleStoreSelect} >
                            <option disabled={true} value="">
                                --Choose a Store--
                            </option>
                            {store.map((item) => <option key={item.value} value={item.value}>{item.text}</option>)}
                        </select>
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