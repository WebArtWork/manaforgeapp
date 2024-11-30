export const manaforgeFormComponents = {
	formId: 'manaforge',
	title: 'Manaforge',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill manaforge title',
				},
				{
					name: 'Label',
					value: 'Title',
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill manaforge description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
