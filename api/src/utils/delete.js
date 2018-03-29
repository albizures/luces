import Modal from 'antd/lib/modal'

const confirm = Modal.confirm

export const showDeleteConfirm = () => new Promise((resolve) => {
  confirm({
    title: 'Are you sure delete this task?',
    content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk: () => {
      resolve()
    }
  })
})
