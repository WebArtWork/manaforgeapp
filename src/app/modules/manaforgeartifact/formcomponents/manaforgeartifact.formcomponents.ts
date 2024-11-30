export const manaforgeartifactFormComponents = {
	formId: 'manaforgeartifact',
	title: 'Manaforgeartifact',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill manaforgeartifact title',
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
					value: 'fill manaforgeartifact description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
