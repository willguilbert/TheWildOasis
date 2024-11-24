import Button from '../../ui/Button'
import CreateCabinForm from './CreateCabinForm'
import { useState } from 'react'
import Modal from '../../ui/Modal'

function AddCabin() {
  const [isOpenedModal, setIsOpenedModal] = useState(false)
  return (
    <div>
      <Button onClick={() => setIsOpenedModal((show) => !show)}>
        Add New Cabin
      </Button>
      {isOpenedModal && (
        <Modal onClose={() => setIsOpenedModal(false)}>
          <CreateCabinForm
            onCloseModal={() => setIsOpenedModal(false)}
          ></CreateCabinForm>
        </Modal>
      )}
    </div>
  )
}

export default AddCabin
