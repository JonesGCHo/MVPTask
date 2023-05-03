import './../App.css';
import ReactDOM from 'react-dom'
import { Button, Icon } from 'semantic-ui-react'
import { useState } from 'react';

function EditProductModal(props) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [show, setShow] = useState(props.showEditModal)

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    function handleSave() {
        props.editProduct(props.id, name, price);

    }

    if (!show) return (<Button color='yellow' onClick={handleOpen}><Icon name='external alternate' />Edit</Button>)

    return ReactDOM.createPortal(
        <>
            <div className="modalOverlayStyle" />
            <div className="modalStyle">

                <div>
                    <h2>Edit Product</h2>
                    <br></br>
                </div>

                <form class="ui form">
                    <div class="field">
                        <label>NAME</label>
                        <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div class="field">
                        <label>PRICE</label>
                        <input type="text" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                    </div>
                    <button class="right floated positive ui right labeled icon button" onClick={handleSave}>Edit<Icon name='check icon' /></button>
                    <button class="ui black right floated button" onClick={handleClose}>Cancel</button>
                </form>
            </div>

        </>,
        document.getElementById('portal')
    );


}
export default EditProductModal;
