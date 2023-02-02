import {  Modal } from 'antd'
import FormResetPassword from '../forms/formPassword/FormResetPassword'

const ModalComp = ({ isModalOpen, setIsModalOpen, title, formReset }) => {
	const handleCancel = () => {
		setIsModalOpen(false)
	}
	return (
			<Modal
				title={title}
				open={isModalOpen}
				onCancel={handleCancel}
				footer={null}
			>
				{
					formReset ?
						<FormResetPassword handleCancel={handleCancel} />
						:
						<p></p>
				}

			</Modal>
	)
}
export default ModalComp