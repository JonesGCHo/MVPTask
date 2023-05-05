import './../App.css';
import ReactDOM from 'react-dom'
import { Button, Icon } from 'semantic-ui-react'
import { useState } from 'react';

function CreateProductModal(props) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [show, setShow] = useState(props.showCreateModal)

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    function handleSave() {
        props.addProduct(name, price);
    }

    if (!show) {
        return (<Button primary floated="left" onClick={handleOpen}>Create</Button>)
    }

    return ReactDOM.createPortal(
        <>
            <div className="modalOverlayStyle" />
            <div className="modalStyle">
                <div>
                    <h2>Create Product</h2>
                    <br></br>
                </div>

                <form class="ui form">
                    <div class="field">
                        <label>NAME</label>
                        <input type="text" name="name" value={name} onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div class="field">
                        <label>PRICE</label>
                        <input type="text" name="price" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                    </div>
                    <button class="right floated positive ui right labeled icon button" onClick={handleSave}><Icon name='check icon' />Create</button>
                    <button class="ui black right floated button" onClick={handleClose}>Close</button>
                </form>
            </div>

        </>,
        document.getElementById('portal')
    );
}

export default CreateProductModal;