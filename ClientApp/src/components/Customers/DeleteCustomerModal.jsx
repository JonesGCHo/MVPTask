import './../App.css';
import ReactDOM from 'react-dom'
import { useState } from 'react';
import { Icon, Button} from 'semantic-ui-react'

function DeleteCustomerModal(props) {
    const [show, setShow] = useState(props.showDeleteModal)

    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);

    function handleDelete() {
        props.deleteCustomer(props.id)
        handleClose();
        window.location = "/FetchCustomers";
    }
    if (!show) return <Button color='red' onClick={handleOpen}><Icon name='trash' />Delete</Button>

    return ReactDOM.createPortal(
        <>
            <div className="modalOverlayStyle" />
            <div className="modalStyle">
                <table class="ui celled padded table">
                    <tbody>
                        <tr>
                            <td>
                                <h2>Delete Customer</h2>
                                <h4>Are you sure?</h4>
                            </td>

                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <button class="right floated ui red right labeled icon button" onClick={handleDelete}><Icon name='x icon' />Delete</button>
                            <button class="ui black right floated button" onClick={handleClose}>Cancel</button>
                        </tr>
                    </tfoot>
                </table>
            </div>

        </>,
        document.getElementById('portal')
    );
}

export default DeleteCustomerModal;