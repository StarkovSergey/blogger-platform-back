export type BlogViewModel = {
  id: string
  name: string
  description: string
  websiteUrl: string
}

export type BlogInputModel = Omit<BlogViewModel, 'id'>
