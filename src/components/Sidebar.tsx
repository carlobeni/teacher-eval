import { FaComment, FaTrophy, FaSearch, FaUser } from 'react-icons/fa';

type Props = {}

const Sidebar = (props: Props) => {
    return (
      <div className="bg-light p-3 vh-100">
        <ul className="list-unstyled">
          <li className="my-2 d-flex align-items-center">
            <FaComment className="me-2" /> Comentario Reciente
          </li>
          <li className="my-2 d-flex align-items-center">
            <FaTrophy className="me-2" /> Ranking
          </li>
          <li className="my-2 d-flex align-items-center">
            <FaSearch className="me-2" /> Buscar profe
          </li>
          <hr />
          <li className="my-2 d-flex align-items-center">
            <FaUser className="me-2" /> Cuenta
          </li>
        </ul>
      </div>
    );
  }

export default Sidebar
