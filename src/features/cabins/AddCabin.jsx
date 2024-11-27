import Button from '../../ui/Button'
import CreateCabinForm from './CreateCabinForm'
import Modal from '../../ui/Modal'
import CabinTable from './CabinTable'

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm></CreateCabinForm>
        </Modal.Window>
      </Modal>
    </div>
  )
}



// function AddCabin() {
//   const [isOpenedModal, setIsOpenedModal] = useState(false)
//   return (
//     <div>
//       <Button onClick={() => setIsOpenedModal((show) => !show)}>
//         Add New Cabin
//       </Button>
//       {isOpenedModal && (
//         <Modal onClose={() => setIsOpenedModal(false)}>
//           <CreateCabinForm
//             onCloseModal={() => setIsOpenedModal(false)}
//           ></CreateCabinForm>
//         </Modal>
//       )}
//     </div>
//   )
// }

export default AddCabin
