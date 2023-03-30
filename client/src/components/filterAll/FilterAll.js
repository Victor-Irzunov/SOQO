import { Collapse } from 'antd'
import React from 'react'
import FormPrice from '../forms/formFilter/FormPrice'
const { Panel } = Collapse


const FilterAll = (
	{ inputValueFrom, setInputValueFrom,
		inputValueBefore, setInputValueBefore,
		sendFormFilter, resetFilter,  onClose
	}
) => {
	return (
		<Collapse defaultActiveKey={['4']}
			ghost
			expandIconPosition='start'
			style={{ paddingLeft: 0 }}
		>
			<Panel header="Цена" key="4">
				<FormPrice
					sendFormFilter={sendFormFilter}
					inputValueFrom={inputValueFrom}
					inputValueBefore={inputValueBefore}
					setInputValueFrom={setInputValueFrom}
					setInputValueBefore={setInputValueBefore}
					resetFilter={resetFilter}
					onClose={onClose}
				/>
			</Panel>
		</Collapse>
	)
}
export default FilterAll