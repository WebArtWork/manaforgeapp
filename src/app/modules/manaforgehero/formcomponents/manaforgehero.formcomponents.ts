export const manaforgeheroFormComponents = {
	formId: 'manaforgehero',
	title: 'Manaforgehero',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill hero title'
				},
				{
					name: 'Label',
					value: 'Title'
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill hero description'
				},
				{
					name: 'Label',
					value: 'Description'
				}
			]
		},
		{
			name: 'Photo',
			key: 'thumb',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill hero thumb'
				},
				{
					name: 'Label',
					value: 'Thumb'
				}
			]
		}
	]
};
