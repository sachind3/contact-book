import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const contacts = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(contacts);

  const deleteContact = (id) => {
    dispatch({ type: "DELETE_USER", payload: id });
    toast.success("Contact deleted successfully!");
  };
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-12 text-right">
          <Link to="/add" className="btn btn-outline-dark">
            Add Contact
          </Link>
        </div>
        <div className="col-md-10 mx-auto my-5">
          <table className="table table-hover">
            <thead className="text-white bg-dark text-left">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => {
                return (
                  <tr key={contact.id}>
                    <td>{index + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.mobile}</td>
                    <td>
                      <Link
                        to={`/edit/${contact.id}`}
                        className="btn btn-primary btn-sm "
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm mx-3"
                        onClick={() => deleteContact(contact.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
