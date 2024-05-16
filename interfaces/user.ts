
export interface typeUser {
    _id: any
    firstName: String,
    lastName: String,
    userName: String,
    email: Number,
    password: String,
    userImage?: String
    role?: "admin"|'superAdmin'
  }
  