import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'string',
    }),
    defineField({
      name: 'username',
      title: 'Username',
      type: 'string',
    }),
    defineField({
      name: 'profileimage',
      title: 'Profile image',
      type: 'string',
    }),
    defineField({
      name: 'tweet',
      title: 'Reference the Tweet the comment is being made',
      type: 'reference',
      to:{
        type:'tweet'
      }
    }),
    ]})
