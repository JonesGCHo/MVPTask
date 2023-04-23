import './../App.css';
import ReactDOM from 'react-dom';

function DeleteCustomerModal({ open, onClose }) {

    if (!open) return null

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
                            <button class="ui black button" floated="right" onClick={onClose}>Cancel</button>
                            <button class="ui red button" floated="right" onClick={() => deleteCustomer(0)}>Delete</button>
                        </tr>
                    </tfoot>
                </table>
            </div>

        </>,
        document.getElementById('portal')
    );

    function deleteCustomer(id) {
        return (
            fetch('api/depts/' + id, { method: 'delete' })
                .then((result) => {
                    result.json().then((resp) => {
                        console.warn(resp)
                    })
                })
        );
    }

}

export default DeleteCustomerModal;