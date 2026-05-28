import {EnvelopeIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export const linkEmail = defineField({
  title: 'Email Link',
  name: 'linkEmail',
  type: 'object',
  icon: EnvelopeIcon,
  components: {
    annotation: (props) => (
      <span>
        <EnvelopeIcon
          style={{
            marginLeft: '0.05em',
            marginRight: '0.1em',
            width: '0.75em',
          }}
        />
        {props.renderDefault(props)}
      </span>
    ),
  },
  fields: [
    defineField({
      name: 'label',
      type: 'string',
    }),
    defineField({
      name: 'url',
      type: 'email',
    }),
  ],
  preview: {
    select: {
      title: 'email',
    },
  },
})
