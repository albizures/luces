import Modal from 'antd/lib/modal'

const confirm = Modal.confirm

export const showDeleteConfirm = () => new Promise((resolve) => {
  confirm({
    title: 'Estas seguro que quieres eliminar esto?',
    content: 'Some descriptions',
    okText: 'Si',
    okType: 'danger',
    cancelText: 'No',
    onOk: () => {
      resolve(true)
    },
    onCancel: () => {
      resolve(false)
    }
  })
})
