interface IMapper {
  links?: any
  meta?: any
  relationships?: any
  metaUserLogged?: any
}

export interface IDocument extends IMapper {
  type: string
  data: any
}

export interface ICollection extends IMapper {
  data: any[]
  meta: {
    total: number
    prev: number | boolean
    next: number | boolean
    pages: number
  }
}
